import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const SIZE = 10;
describe("Gameboard functionality", () => {
	describe("Gameboard creating a blank field correctly", () => {
		it("should create a blank field correctly", () => {
			const board = new Gameboard(SIZE);

			expect(board.getTileAt(0, 0)).toStrictEqual({ ship: null, isHit: false });
			expect(board.getTileAt(4, 0)).toStrictEqual({ ship: null, isHit: false });
		});
	});

	describe("Placing ships", () => {
		it("should be able to place ships vertically", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);
			board.add({ ship: ship1, cord: [0, 0], position: "vertical" });

			expect(board.getTileAt(0, 3)).toStrictEqual({
				ship: ship1,
				isHit: false,
			});

			expect(board.getTileAt(0, 9)).not.toStrictEqual({
				ship: ship1,
				isHit: false,
			});
		});

		it("should be able to place ships horizontally", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);
			board.add({ ship: ship1, cord: [0, 0], position: "horizontal" });

			expect(board.getTileAt(0, 0)).toStrictEqual({
				ship: ship1,
				isHit: false,
			});
			expect(board.getTileAt(3, 0)).toStrictEqual({
				ship: ship1,
				isHit: false,
			});
		});

		it("should not let ships get overlapped", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);
			board.add({ ship: ship1, cord: [0, 0], position: "vertical" });

			expect(() =>
				board.add({ ship: ship1, cord: [0, 3], position: "horizontal" })
			).toThrow(Error("Cannot place in an occupied position!"));
		});

		it("should be able to detect ships getting out of bounds vertically", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);
			const ship2 = new Ship(2);

			expect(() =>
				board.add({ ship: ship1, cord: [0, 9], position: "vertical" })
			).toThrow(Error("Out of bound!"));

			expect(() =>
				board.add({ ship: ship2, cord: [3, 8], position: "vertical" })
			).not.toThrow(Error("Out of bound!"));
		});

		it("should be able to detect ships getting out of bounds horizontally", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);

			expect(() =>
				board.add({ ship: ship1, cord: [9, 0], position: "horizontal" })
			).toThrow(Error("Out of bound!"));
		});
	});

	describe("Attacking ships", () => {
		it("should be able to receive attacks when there is a ship", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(3);
			board.add({ ship: ship1, cord: [0, 0], position: "vertical" });

			board.attack(0, 2);
			expect(board.getTileAt(0, 2)).toStrictEqual({
				ship: ship1,
				isHit: true,
			});

			board.attack(0, 0);
			expect(board.getTileAt(0, 0)).toStrictEqual({
				ship: ship1,
				isHit: true,
			});

			board.attack(0, 1);
			expect(board.getTileAt(0, 1)).toStrictEqual({
				ship: ship1,
				isHit: true,
			});
		});

		it("should not be able to receive attacks when there is nothing", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);
			board.add({ ship: ship1, cord: [0, 0], position: "vertical" });

			expect(board.attack(0, 9)).toBe("No ship detected!");
		});
	});

	describe("Checking win conditions", () => {
		it("Checking whether if all ships have sunk", () => {
			const board = new Gameboard(SIZE);
			const ship1 = new Ship(4);
			const ship2 = new Ship(4);
			board.add({ ship: ship1, cord: [0, 0], position: "vertical" });
			board.add({ ship: ship2, cord: [3, 0], position: "horizontal" });

			board.attack(0, 0);
			board.attack(0, 1);
			board.attack(0, 2);
			board.attack(0, 3);

			expect(board.isLost()).toBe(false);

			board.attack(3, 0);
			board.attack(4, 0);
			board.attack(5, 0);
			board.attack(6, 0);

			expect(board.isLost()).toBe(true);
		});
	});
});
