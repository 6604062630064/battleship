const tables = document.querySelectorAll(".bigger-table > div > div");

const startGame = (player, bot) => {
	const updatePlayerBoard = (cord, result) => {
		const cell = document.querySelector(
			`.player [row="${cord[0]}"][column="${cord[1]}"]`
		);

		if (result === true) {
			cell.classList.add("sunk");
			return;
		}

		if (result === "No ship detected!") {
			cell.classList.add("missed");
			return;
		}
	};

	const attackPhase = (e) => {
		e.preventDefault();
		// Check if target is the cell itself
		if (e.target.classList.contains("opponent")) {
			return;
		}

		const targetCell = e.target;
		const row = parseInt(e.target.getAttribute("row"));
		const column = parseInt(e.target.getAttribute("column"));

		const response = bot.attack(row, column);

		if (response === "Already hit!") {
			return;
		}

		if (response === "No ship detected!") {
			targetCell.classList.add("missed");
		}

		if (response === true) {
			targetCell.classList.add("sunk");
		}

		if (bot.isLost()) {
			console.log(bot.isLost());
			title.textContent = "You win!";
			cells.forEach((e) => {
				e.classList.remove("hoverable");
			});

			opponent.removeEventListener("click", attackPhase);
			return;
		}

		const result = player.randomAttack();
		updatePlayerBoard(result.cord, result.result);
	};
	const title = document.querySelector("h1");
	title.textContent = "Game begins!";

	const cells = document.querySelectorAll(".opponent .cell");
	const opponent = document.querySelector(".opponent");
	cells.forEach((e) => {
		e.classList.add("hoverable");
	});

	opponent.addEventListener("click", attackPhase);
};

const initialize = () => {
	// Add starting cells in both tables
	tables.forEach((e) => {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const div = document.createElement("div");
				div.setAttribute("row", i);
				div.setAttribute("column", j);

				div.classList.add("cell");
				e.appendChild(div);
			}
		}
	});

	const button = document.querySelector("button");
};
const prepareShips = (arr) => {
	// Get info from the array then display it to the table
	arr.forEach((e, i) => {
		e.forEach((child, j) => {
			if (child.ship !== null) {
				const cell = document.querySelector(
					`.player [row="${i}"][column="${j}"]`
				);

				cell.classList.add("occupied");
			}
		});
	});
};
export { initialize, prepareShips, startGame };
