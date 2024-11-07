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
		for (let i = 0; i < gameFieldMatrix.length; i++) {
			if (gameFieldMatrix[i][columnIndex] != activeAction) return false;
		}
		return true;
	};

	const checkHorizontalWin = rowIndex => {
		for (let i = 0; i < gameFieldMatrix[rowIndex].length; i++) {
			if (gameFieldMatrix[rowIndex][i] != activeAction) return false;
		}
		return true;
	};

	const checkDiagonalWin = (rowIndex, columnIndex) => {
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
				const abs = Math.abs(i - gameFieldMatrix.length + 1);
				if (gameFieldMatrix[i][abs] != activeAction) {
					isWin2 = false;
				}
			}
			return isWin1 || isWin2;
		}
		return false;
	};

	gameFieldMatrix.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
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
	let counter = 1;
	isGameRunning = true;
	activeActionHtml.style.color = '#000000';
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
