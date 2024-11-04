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
		// condition works only for a 3x3 field
		if ((rowIndex + columnIndex) % 2 == 0) {
			for (let i = 0; i < gameFieldMatrix.length; i++) {
				const abs = Math.abs(i - gameFieldMatrix.length + 1);
				if (
					gameFieldMatrix[i][i] != activeAction &&
					gameFieldMatrix[i][abs] != activeAction
				)
					return false;
			}
			return true;
		}
		return false;
	};

	gameFieldMatrix.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			const fieldCell = document.createElement('div');
			fieldCell.className = 'field-cell';
			fieldCell.id = column;

			fieldCell.addEventListener('mousedown', () => {
				if (column != 'o' && column != 'x') {
					console.log(`coordinates: ${rowIndex} ${columnIndex}`);
					row[columnIndex] = activeAction;
					column = activeAction;

					if (
						checkVerticalWin(columnIndex) ||
						checkHorizontalWin(rowIndex) ||
						checkDiagonalWin(rowIndex, columnIndex) // bug
					) {
						console.log(`${activeAction} won`);
					}

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
