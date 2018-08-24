describe('gameController', function () {
    beforeEach(module('app'));
    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.board', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('gameController', { $scope: $scope });
        });

        describe("Given a board with empty cells", function () {
            it('should set all the values of the cells to -', (function () {
                $scope.board = [
                    [{ value: '-' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }]];

                expect($scope.board).toEqual([
                    [{ value: '-' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }]])
            }));
        });
    });

    describe('$scope.move', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('gameController', { $scope: $scope });
        });

        describe("Given a board with empty cells", function () {
            it('should change current player to next player', (function () {
                $scope.move($scope.board[0][0]);
                expect($scope.currentPlayer).toEqual('O')
            }));
        });

        describe("When trying to play on already marked cell", function () {
            it('should return true if cell is already taken', (function () {
                $scope.board = [
                    [{ value: 'X' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }]];

                var cell = $scope.board[0][0]
                expect($scope.isTaken(cell)).toBe(true);
                expect($scope.currentPlayer).toEqual('X')
            }));

            it('should return message if cell is already taken', (function () {
                $scope.board = [
                    [{ value: 'X' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }],
                    [{ value: '-' }, { value: '-' }, { value: '-' }]];

                $scope.move($scope.board[0][0]);
                expect($scope.message).toEqual(true)
            }));
        });
    });

    describe('$scope.checkGameStatus', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('gameController', { $scope: $scope });
        });

        describe("When there are no three matching horizontal or vertical or diagonal cells and all cells are occupied", function () {
            it('should return false for winner and true for draw', (function () {
                $scope.board = [
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }],
                    [{ value: 'O' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }]];

                $scope.checkGameStatus();
                expect($scope.winner).toEqual(false);
                expect($scope.draw).toEqual(true);
            }));
        });

        describe("When there are no three matching horizontal or vertical or diagonal cells and all cells are occupied", function () {
            it('should assign X to currentPlayer return false for winner and true for draw', (function () {
                $scope.board = [
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }],
                    [{ value: 'O' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }]];

                $scope.checkGameStatus();
                expect($scope.winner).toEqual(false);
                expect($scope.draw).toEqual(true);
                expect($scope.currentPlayer).toEqual('X');
            }));
        });

        describe("When there are three matching horizontal or vertical or diagonal cells", function () {
            it('should return true if three horizontal cell are matching', (function () {
                $scope.board = [
                    [{ value: 'X' }, { value: 'X' }, { value: 'X' }],
                    [{ value: 'O' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }]];

                $scope.checkGameStatus()
                expect($scope.winner).toEqual(true);
            }));

            it('should return true if three vertical cell are matching', (function () {
                $scope.board = [
                    [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }]];

                $scope.checkGameStatus()
                expect($scope.winner).toEqual(true);
            }));

            it('should return true if three diagonal cell are matching', (function () {
                $scope.board = [
                    [{ value: 'O' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'O' }, { value: 'O' }, { value: 'X' }],
                    [{ value: 'X' }, { value: 'X' }, { value: 'O' }]];

                $scope.checkGameStatus();
                expect($scope.winner).toEqual(true);
            }));
        });
    });
});