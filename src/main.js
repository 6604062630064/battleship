import "./style.css";
import * as DOM from "./classes/DOM.js";
import Player from "./classes/player.js";
const player = new Player("A");
const bot = new Player("B");

player.addShip({ length: 4, cord: [0, 5], position: "vertical" });

player.addShip({ length: 3, cord: [0, 0], position: "vertical" });
player.addShip({ length: 3, cord: [2, 0], position: "horizontal" });

player.addShip({ length: 2, cord: [6, 0], position: "horizontal" });
player.addShip({ length: 2, cord: [6, 6], position: "vertical" });
player.addShip({ length: 2, cord: [7, 8], position: "vertical" });

player.addShip({ length: 1, cord: [4, 5], position: "horizontal" });
player.addShip({ length: 1, cord: [3, 4], position: "vertical" });

bot.addShip({ length: 1, cord: [0, 0], position: "horizontal" });
DOM.initialize();

const button = document.querySelector("button");
button.addEventListener("click", (e) => {
	DOM.startGame(player, bot);
});

DOM.prepareShips(player.getBoard());
