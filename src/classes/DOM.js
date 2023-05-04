const tables = document.querySelectorAll(".bigger-table > div > div");

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

	// Add an event to start the game
	button.addEventListener("click", (e) => {
		e.preventDefault();
		startGame();

		e.target.disabled = true;
	});
};

const prepareShips = (arr) => {
	// Get info from the array then display it to
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
export { initialize, prepareShips };
