import Player from "./player.js";
import Ship from "./ship.js";

let playerA = new Player("A");
let playerB = new Player("B");

describe("Player class", () => {
	beforeEach(() => {
		playerA = new Player("A");
		playerB = new Player("B");
	});

	it("should be able to add a ship inside player board", () => {
		playerA.addShip({ length: 3, cord: [0, 0], position: "vertical" });
		const ship1 = new Ship(3);
		expect(playerA.getTileAt(0, 0)).toStrictEqual({
			ship: ship1,
			isHit: false,
		});
	});

	describe("Attack Functionality", () => {
		it("should able to attack", () => {
			playerA.addShip({ length: 3, cord: [0, 0], position: "vertical" });
			expect(playerA.attack(0, 0)).toBe(true);
		});

		it("should be able to attack ships and decrease its health", () => {
			playerA.addShip({ length: 3, cord: [0, 0], position: "vertical" });
			const ship1 = new Ship(3);
			ship1.hit();

			playerA.attack(0, 0);

			expect(playerA.getTileAt(0, 0)).toStrictEqual({
				ship: ship1,
				isHit: true,
			});
		});

		it("cannot attack the same position twice", () => {
			playerA.addShip({ length: 3, cord: [0, 0], position: "vertical" });
			const ship1 = new Ship(3);
			ship1.hit();

			playerA.attack(0, 0);

			expect(playerA.attack(0, 0)).toBe("Already hit!");
		});
	});
});
