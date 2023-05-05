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

	getBoard() {
		return this.board.playingField;
	}

	randomAttack() {
		const row = Math.floor(Math.random() * 10);
		const column = Math.floor(Math.random() * 10);

		const currentCell = this.getTileAt(row, column);

		if (currentCell.isHit === false) {
			currentCell.isHit = true;
			currentCell.ship.hit();

			console.log("a");
		} else {
			this.randomAttack();
		}
	}
}

export default Player;
