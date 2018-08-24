
angular
    .module('app', [])
    .controller('gameController', function gameController($scope) {
        getBoard($scope)

        $scope.reset = function () {
            $scope.currentPlayer = 'X';
            $scope.winner = false;
            $scope.draw = false;
            getBoard($scope)
        };
        $scope.reset();

        $scope.isTaken = function (cell) {
            return cell.value !== '-';
        };

        function getBoard($scope) {
            $scope.board = [];
            for (var i = 0; i < 3; i++) {
                var row = [];
                for (var j = 0; j < 3; j++) {
                    row.push({ value: '-' });
                }
                $scope.board.push(row);
            }
        };

        $scope.isBoardFull = function () {
            for (var row = 0; row <= 2; row++) {
                for (var col = 0; col <= 2; col++) {
                    if ($scope.board[row][col].value === '-') {
                        return false;
                    }
                }
            }
            return true;
        }

        var checkMatchingCells = function (cell1, cell2, cell3) {
            
            if (cell1.value === cell2.value && cell1.value === cell3.value && cell1.value !== '-') {
                displayWinner(cell1, cell2, cell3);
            }

            return cell1.value === cell2.value &&
                cell1.value === cell3.value &&
                cell1.value !== '-';
        };

        var displayWinner = function (cell1, cell2, cell3) {
            cell1.color = 'red';
            cell2.color = 'red';
            cell3.color = 'red';
        }

        $scope.checkGameStatus = function () {
            var rowMatch = checkMatchingCells($scope.board[0][0], $scope.board[0][1], $scope.board[0][2]) ||
                checkMatchingCells($scope.board[1][0], $scope.board[1][1], $scope.board[1][2]) ||
                checkMatchingCells($scope.board[2][0], $scope.board[2][1], $scope.board[2][2]);

            var columnMatch = checkMatchingCells($scope.board[0][0], $scope.board[1][0], $scope.board[2][0]) ||
                checkMatchingCells($scope.board[0][1], $scope.board[1][1], $scope.board[2][1]) ||
                checkMatchingCells($scope.board[0][2], $scope.board[1][2], $scope.board[2][2]);

            var diagonalMatch = checkMatchingCells($scope.board[0][0], $scope.board[1][1], $scope.board[2][2]) ||
                checkMatchingCells($scope.board[2][0], $scope.board[1][1], $scope.board[0][2]);

            $scope.winner = rowMatch || columnMatch || diagonalMatch;
            $scope.draw = $scope.winner === false && $scope.isBoardFull();

            return $scope.winner || $scope.draw;
        };

        $scope.move = function (cell) {
            $scope.message = false
            if ($scope.isTaken(cell) === true) {
                $scope.message = true
                return $scope.currentPlayer;
            }
            cell.value = $scope.currentPlayer;
            if ($scope.checkGameStatus() === false) {
                $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
            }
        };

    })




