class Ship {
	constructor(length) {
		this.length = length;
		this.hitTimes = 0;
	}

	hit() {
		this.hitTimes += 1;
	}

	isSunk() {
		return this.hitTimes >= this.length ? true : false;
	}
}
