class Gameboard {
	constructor() {
		// Make 10x10 2d array
		this.playingField = [...Array(10)].map((e) =>
			Array(10).fill({ ship: null, isHit: false })
		);
	}

	getTileAt(i, j) {
		return this.playingField[i][j];
	}
}

export default Gameboard;
