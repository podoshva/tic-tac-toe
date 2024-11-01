'use strict';
const gameFieldHtml = document.getElementById('game-field');
const activeActionHtml = document.getElementById('active-action');
const resetButtonHtml = document.getElementById('reset-button');
const gameFieldMatrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

const init = () => {
	let activeAction = 'x'; // initial value
	activeActionHtml.innerText = activeAction;
	gameFieldMatrix.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			const fieldCell = document.createElement('div');
			fieldCell.className = 'field-cell';
			fieldCell.id = column;

			fieldCell.addEventListener('mousedown', () => {
				if (column != 'o' && column != 'x') {
					column = activeAction;
					console.log(`coordinates: ${rowIndex} ${columnIndex}`);
					if (
						(rowIndex + columnIndex) % 2 == 0 ||
						rowIndex + columnIndex == 0
					) {
						console.log('можно провести диагональ');
					} else {
						console.log('диагональ провести нельзя');
					}
					row[columnIndex] = activeAction;
					const actionImg = document.createElement('img');
					actionImg.className = 'action';
					if (activeAction == 'x') {
						actionImg.src = './images/cross.svg';
						activeAction = 'o';
					} else {
						actionImg.src = './images/zero.svg';
						activeAction = 'x';
					}
					activeActionHtml.innerText = activeAction;
					fieldCell.appendChild(actionImg);
				}
				console.log(gameFieldMatrix);
				return;
			});
			gameFieldHtml.appendChild(fieldCell);
		});
	});
};

const reset = () => {
	let counter = 1;
	for (let i = 0; i < gameFieldMatrix.length; i++) {
		for (let j = 0; j < gameFieldMatrix[i].length; j++) {
			const actionImg = document.getElementById(counter);
			actionImg.remove();
			gameFieldMatrix[i][j] = counter;
			counter++;
		}
	}
	init();
};

init();

resetButtonHtml.addEventListener('click', () => {
	reset();
});
