import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

class Player {
	constructor(name) {
		this.board = new Gameboard(10);
		this.name = name;
	}

	addShip(obj) {
		this.board.add({
			ship: new Ship(obj.length),
			cord: obj.cord,
			position: obj.position,
		});
	}

	getTileAt(i, j) {
		return this.board.getTileAt(i, j);
	}

	attack(i, j) {
		const response = this.board.attack(i, j);
		return response;
	}
}

export default Player;
