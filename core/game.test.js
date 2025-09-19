import {Game} from "./game";
import {GameStatuses} from "../constants/game-statuses";

describe('game', () => {
    it('game should be created and return status', () => {
        const game = new Game()
        expect(game.getStatus()).toBe(GameStatuses.SETTINGS);
    })

    it('game should be created and return status', async () => {
        const game = new Game()
        await game.start();
        expect(game.getStatus()).toBe(GameStatuses.IN_PROGRESS);
    })

    it('goblin should be in the Grid after start', async () => {
        const game = new Game();
        expect(game.goblinPosition).toBeNull();
        await game.start();
        expect(game.goblinPosition.x).toBeLessThan(game.gridSize.columnsCount);
        expect(game.goblinPosition.x).toBeGreaterThanOrEqual(0);
        expect(game.goblinPosition.y).toBeLessThan(game.gridSize.rowsCount);
        expect(game.goblinPosition.y).toBeGreaterThanOrEqual(0);
    });
})