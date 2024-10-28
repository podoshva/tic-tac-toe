const gameFieldHtml = document.getElementById('game-field');
const gameFieldMatrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
let activeAction = 'x'; // initial value

// generate html field
for (let i = 1; i < 10; i++) {
	const fieldCell = document.createElement('div');
	fieldCell.className = 'field-cell';
	fieldCell.id = i;

	fieldCell.addEventListener('click', () => {
		// find element by index and replace it after click
		gameFieldMatrix.forEach(row => {
			const index = row.indexOf(i);
			if (index != -1) {
				row[index] = activeAction;
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
			return;
		});
		console.log(gameFieldMatrix);
	});

	gameFieldHtml.appendChild(fieldCell);
}
