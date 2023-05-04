const initialize = () => {
	// Add starting cells in both tables
	const tables = document.querySelectorAll(".bigger-table > div > div");
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
};

export default initialize;
