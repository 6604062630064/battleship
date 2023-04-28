class Gameboard {
	constructor(size) {
		// Make 10x10 2d array
		this.size = size;
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
			return;
		}

		if (pos === "horizontal") {
			checkIfEmpty("horizontal");

			for (let j = 0; j <= ship.length; j++) {
				const currentPos = this.getTileAt(column + j, row);

				currentPos.ship = ship;
			}
			return;
		}
	}
}

export default Gameboard;
