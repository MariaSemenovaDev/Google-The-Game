import {GameStatuses} from "../constants/game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS

    #settings = {
        gridSize: {
            columnsCount: 4,
            rowsCount: 4
        },
        googleJumpInterval: 1000
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error('Game must be in Settings before Start')
        }
        this.#status = GameStatuses.IN_PROGRESS
    }

    getStatus () {
         return this.#status;
    }
}

