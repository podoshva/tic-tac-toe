'use strict';
const gameFieldHtml = document.getElementById('game-field');
const gameFieldMatrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
let activeAction = 'x'; // initial value

gameFieldMatrix.forEach((row, rowIndex) => {
	row.forEach((column, columnIndex) => {
		const fieldCell = document.createElement('div');
		fieldCell.className = 'field-cell';
		fieldCell.id = column;

		fieldCell.addEventListener('click', () => {
			if (column != 'o' && column != 'x') {
				column = activeAction;
				console.log(`coordinates: ${rowIndex} ${columnIndex}`);
				if ((rowIndex + columnIndex) % 2 == 0 || rowIndex + columnIndex == 0) {
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
				fieldCell.appendChild(actionImg);
			}
			console.log(gameFieldMatrix);
			return;
		});
		gameFieldHtml.appendChild(fieldCell);
	});
});

const Cell = initialValue => {
	this.initialValue = initialValue;
	this.value = initialValue;
};
