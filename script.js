// Das Array, das den Zustand des Spielfelds enthält
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];

let currentPlayer = 'circle';
let AUDIO_GAME_WIN = new Audio('sound/success.mp3');
let AUDIO_GAME_FINISHED = new Audio('sound/error.mp3');

function init() {
    render();
}

function render() {

    const container = document.getElementById('content');

    let html = '<table class="border-none">';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let cellContent = '';
            if (fields[index] === 'circle') {
                cellContent = generateAnimatedCircleSVG();
            } else if (fields[index] === 'cross') {
                cellContent = generateAnimatedXSVG();
            }
            html += `<td class="cell-content" onclick="handleClick(this, ${index})">${cellContent}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    container.innerHTML = html;
}

function generateAnimatedCircleSVG() {
    const circleHTML = `
        <svg width="70" height="70">
            <circle cx="35" cy="35" r="0" fill="none" stroke="#00B0EF" stroke-width="9">
                <animate attributeName="r" from="0" to="30" dur="200ms" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;
    return circleHTML;
}

function generateAnimatedXSVG() {
    const xHTML = `
        <svg width="70" height="70">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FCC000" stroke-width="9">
                <animate attributeName="x2" from="10" to="60" dur="200ms" begin="0s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FCC000" stroke-width="9">
                <animate attributeName="x2" from="60" to="10" dur="200ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;
    return xHTML;
}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedXSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        if (isGameFinishedByWin()) {
            gameIsFinishedByWin();
        }
        else if (isGameFinished()) {
            AUDIO_GAME_FINISHED.play();
            document.getElementById('restart-btn').classList.remove('d-none');
        }

    }
}

function gameIsFinishedByWin() {
    const winCombination = getWinningCombination();
    drawWinningLine(winCombination);
    AUDIO_GAME_WIN.play();
    document.getElementById('restart-btn').classList.remove('d-none');

    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.removeAttribute('onclick');
    });
}

function isGameFinished() {
    return fields.every((field) => field !== null);
}

function isGameFinishedByWin() {
    return getWinningCombination() !== null;
}

function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];

        }
    }
    return null;
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2),
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2} px`;
    line.style.left = `${startRect.left + startRect.width / 2} px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];

    document.getElementById('restart-btn').classList.add('d-none');
    render();
}