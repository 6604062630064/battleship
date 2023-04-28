class Gameboard {
	constructor(size) {
		this.currentShip = [];
		this.size = size;
		// Make 10x10 2d array
		this.playingField = (function () {
			let arr = [];
			for (let i = 0; i < size; i++) {
				arr.push([]);

				for (let j = 0; j < size; j++) {
					arr[i].push({ ship: null, isHit: false });
				}
			}

			return arr;
		})(); // IIFE function
	}

	getTileAt(i, j) {
		if (i < this.size && j < this.size) {
			// Check whether inputs received are out of bound
			return this.playingField[i][j];
		} else {
			throw new Error("Out of bound!");
		}
	}

	add(obj) {
		const column = obj.cord[0];
		const row = obj.cord[1];
		const ship = obj.ship;
		const pos = obj.position;

		const checkIfEmpty = (position) => {
			// a function for checking if another ship exists or shis are out of bound
			const getTile = (i) => {
				return position === "vertical"
					? this.getTileAt(column, row + i)
					: this.getTileAt(column + i, row);
			};

			for (let i = 0; i <= ship.length; i++) {
				const currentPos = getTile(i);

				if (currentPos.ship !== null) {
					throw new Error("Cannot place in an occupied position!");
				}
			}
		};

		if (pos === "vertical") {
			checkIfEmpty("vertical");

			for (let i = 0; i <= ship.length; i++) {
				// a fucntion for placing ships
				const currentPos = this.getTileAt(column, row + i);

				currentPos.ship = ship;
			}
			this.currentShip.push(ship);
			return;
		}

		if (pos === "horizontal") {
			checkIfEmpty("horizontal");

			for (let j = 0; j <= ship.length; j++) {
				const currentPos = this.getTileAt(column + j, row);

				currentPos.ship = ship;
			}
			this.currentShip.push(ship);
			return;
		}
	}

	attack(i, j) {
		const targetTile = this.getTileAt(i, j);

		targetTile.isHit = true;
		if (targetTile.ship === null) {
			return "No ship detected!";
		} else {
			targetTile.ship.hit();
		}
	}
}

export default Gameboard;
