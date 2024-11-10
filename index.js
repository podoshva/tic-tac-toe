'use strict';
const gameFieldHtml = document.getElementById('game-field');
const activeActionHtml = document.getElementById('active-action');
const resetButtonHtml = document.getElementById('reset-button');
const gameFieldMatrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
let isGameRunning = true;

const init = () => {
	let activeAction = 'x';
	activeActionHtml.innerText = activeAction;

	const checkVerticalWin = columnIndex => {
		// this algorithm works on all sizes of fields
		for (let i = 0; i < gameFieldMatrix.length; i++) {
			if (gameFieldMatrix[i][columnIndex] != activeAction) return false;
		}
		return true;
	};

	const checkHorizontalWin = rowIndex => {
		// this algorithm works on all sizes of fields
		for (let i = 0; i < gameFieldMatrix[rowIndex].length; i++) {
			if (gameFieldMatrix[rowIndex][i] != activeAction) return false;
		}
		return true;
	};

	const checkDiagonalWin = (rowIndex, columnIndex) => {
		// and this algorithm also works on all sizes of fields :)
		const coordinatesSum = rowIndex + columnIndex;
		if (
			coordinatesSum % 2 == 0 ||
			coordinatesSum == gameFieldMatrix.length - 1
		) {
			let isWin1 = true;
			let isWin2 = true;

			for (let i = 0; i < gameFieldMatrix.length; i++) {
				if (gameFieldMatrix[i][i] != activeAction) {
					isWin1 = false;
				}
				const absColumnIndex = Math.abs(i - gameFieldMatrix.length + 1);
				if (gameFieldMatrix[i][absColumnIndex] != activeAction) {
					isWin2 = false;
				}
			}
			return isWin1 || isWin2;
		}
		return false;
	};

	gameFieldMatrix.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			// creating fieldCell elements
			const fieldCell = document.createElement('div');
			fieldCell.className = 'field-cell';
			fieldCell.id = column;

			fieldCell.addEventListener('mousedown', () => {
				if (isGameRunning) {
					if (column != 'o' && column != 'x') {
						row[columnIndex] = activeAction;
						column = activeAction;
						const actionImg = document.createElement('img');
						actionImg.className = 'action';
						if (activeAction == 'x') {
							actionImg.src = './images/cross.svg';
						} else {
							actionImg.src = './images/zero.svg';
						}
						// checking of win
						if (
							checkVerticalWin(columnIndex) ||
							checkHorizontalWin(rowIndex) ||
							checkDiagonalWin(rowIndex, columnIndex)
						) {
							activeActionHtml.innerText = `${activeAction} won`;
							activeActionHtml.style.color = '#cd5c5c';

							isGameRunning = false;
						} else {
							if (activeAction == 'x') {
								activeAction = 'o';
							} else {
								activeAction = 'x';
							}
							activeActionHtml.innerText = activeAction;
						}
						fieldCell.appendChild(actionImg);
					}
				}
			});
			gameFieldHtml.appendChild(fieldCell);
		});
	});
};

const reset = () => {
	// reset all game values
	let counter = 1;
	isGameRunning = true;
	activeActionHtml.style.color = '#000000';
	for (let i = 0; i < gameFieldMatrix.length; i++) {
		// deleting fieldCell elements
		for (let j = 0; j < gameFieldMatrix[i].length; j++) {
			const fieldCell = document.getElementById(counter);
			fieldCell.remove();
			gameFieldMatrix[i][j] = counter;
			counter++;
		}
	}
};

init();

resetButtonHtml.addEventListener('click', () => {
	reset();
});

// thanks for reading
