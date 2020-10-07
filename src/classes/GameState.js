
const rowsCount = 4;
const colsCount = 4;
const tilesTotal = rowsCount * colsCount;
const emptyTileIndex = tilesTotal - 1;
const shuffleMovesRange = [100, 180];
const directions = ['up', 'down', 'left', 'right'];

export class GameState {
    constructor () {
        this.startNewGame();
    }

    startNewGame () {
        this.moves = 0;
        this.board = GameState.getNewBoard();
        this.stack = [];
        this.timer = 0;
        this.shuffleBoard();
    }

    rand (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    shuffleBoard () {
        this.shuffling = true;
        let shuffleMoves = this.rand(...shuffleMovesRange);
        while (shuffleMoves --> 0) {
            this.moveInDirection (directions[this.rand(0,3)]);
        }
        this.shuffling = false;
    }

    // Using this class as a Singleton - using it once if doesn't exist yet
    static instance = null;

    static getInstance () {
        if (!GameState.instance) GameState.instance = new GameState();
        return GameState.instance;
    }

    static getNewBoard () {
        return Array(tilesTotal).fill(0).map((x, index) => [
            Math.floor(index / rowsCount),
            index % colsCount,
            index
        ]);
    }

    static solvedBoard = GameState.getNewBoard();

     getState () {
        // inside the object, "this" refer to it, not to the current GameState instance.
        // thus, the use of "self" (or, use the GameState.instance instead of "self")
        const self = this;
         return {
            board: self.board,
            moves: self.moves,
            solved: self.isPuzzleSolved(),
            epos: self.board[emptyTileIndex]
        };
    }

    isTileMovable (index) {

        // get the current position of the tile and the empty tile
        const tilePos = this.board[index];
        const emptyPos = this.board[emptyTileIndex];

        // if they are in the same row, their column indices difference should be 1
        if (tilePos[0] === emptyPos[0])
            return Math.abs(tilePos[1] - emptyPos[1]) === 1;

        // if they are in the same row, their row indices difference should be 1
        else if (tilePos[1] === emptyPos[1])
            return Math.abs(tilePos[0] - emptyPos[0]) === 1;

        // otherwise, they are'nt adjacent and cannot be moved
        else return false;
    }

    moveTile (index) {
        if (!this.shuffling && this.isPuzzleSolved()) return false;

        if (!this.isTileMovable(index)) return false;

        // current tile and empty tile
        const emptyPosition = [...this.board[emptyTileIndex]];
        const tilePosition = [...this.board[index]];

        // copy current board and swap their positions
        let boardAfterMove = [...this.board];
        boardAfterMove[emptyTileIndex] = tilePosition;
        boardAfterMove[index] = emptyPosition;

        if (!this.shuffling) this.stack.push(this.board);
        this.board = boardAfterMove;
        if (!this.shuffling) this.moves += 1;
        this.epos = boardAfterMove[emptyTileIndex];

        return true;
    }

    isPuzzleSolved () {
        for (let i=0; i<tilesTotal; i++) {
            if(this.board[i]){
                if (this.board[i][0] !== GameState.solvedBoard[i][0]
                    || this.board[i][1] !== GameState.solvedBoard[i][1])
                    return false;
            }
        }
        return true;
    }


    moveInDirection (dir) {
        const epos = this.board[emptyTileIndex];

        const posToMove = dir === 'up' ? [epos[0]+1, epos[1]]
            : dir === 'down' ? [epos[0]-1, epos[1]]
                : dir === 'left' ? [epos[0], epos[1]+1]
                    : dir === 'right' ? [epos[0], epos[1]-1]
                        : epos;

        // find the index of the tile currently in posToMove
        let tileToMove = emptyTileIndex;
        for (let i=0; i<tilesTotal; i++) {
            if (this.board[i][0] === posToMove[0] && this.board[i][1] === posToMove[1]) {
                tileToMove = i;
                break;
            }
        }

        this.moveTile(tileToMove);
    }

    undo () {
        if (this.stack.length === 0) return false;
        this.board = this.stack.pop();
        this.moves -= 1;
    }
}