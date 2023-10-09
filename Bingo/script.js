const playerCardTable = document.querySelector('.player-card table');
const opponentCardTable = document.querySelector('.opponent-card table');
const currentBall = document.getElementById('current-ball');
const drawButton = document.getElementById('draw-button');
const newGameButton = document.getElementById('new-game-button');


// Función para generar una tarjeta de bingo con filas y columnas
function generateBingoCard(table) {
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Generar tarjetas de jugador y oponente
generateBingoCard(playerCardTable);
generateBingoCard(opponentCardTable);

// Función para llenar la cuadrícula con números aleatorios (1-75)
function fillBingoCard(table) {
    const usedNumbers = new Set();
    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 75) + 1;
        } while (usedNumbers.has(randomNumber));
        
        usedNumbers.add(randomNumber);
        cell.textContent = randomNumber;
    });
}

// Llenar las tarjetas del jugador y de la máquina con números aleatorios
fillBingoCard(playerCardTable);
fillBingoCard(opponentCardTable);


const drawnNumbers = new Set(); // Mantén un registro de los números ya sacados

// Función para sacar una bola de bingo sin repetir números
// Función para sacar una bola de bingo
function drawBall() {
    if (drawnNumbers.size === 75) {
        alert('Todos los números han sido llamados.');
        return;
    }

    let drawnNumber;
    do {
        drawnNumber = Math.floor(Math.random() * 75) + 1;
    } while (drawnNumbers.has(drawnNumber));

    drawnNumbers.add(drawnNumber);
    currentBall.textContent = drawnNumber;
    
    markNumberInTable(playerCardTable, drawnNumber);
    markNumberInTable(opponentCardTable, drawnNumber);
    
    checkWinner(drawnNumber);
}



// Función para verificar si hay un ganador (todos los números marcados)
function checkWinner(drawnNumber) {
    const playerCells = playerCardTable.querySelectorAll('td');
    const opponentCells = opponentCardTable.querySelectorAll('td');
    let allMarked = true;

    // Verificar la tarjeta del jugador
    playerCells.forEach(cell => {
        if (cell.textContent === drawnNumber.toString()) {
            cell.classList.add('marked'); // Marca el número en la tabla
        }
    });

    // Verificar la tarjeta de la máquina (oponente)
    opponentCells.forEach(cell => {
        if (cell.textContent === drawnNumber.toString()) {
            cell.classList.add('marked'); // Marca el número en la tabla
        }
    });

    // Verificar si todos los números han sido marcados
    playerCells.forEach(cell => {
        if (!cell.classList.contains('marked')) {
            allMarked = false;
            return;
        }
    });

    if (allMarked) {
        alert('¡Has ganado! Todos los números han sido marcados.');
        return;
    }

    // Verificar si la máquina ha ganado
    opponentCells.forEach(cell => {
        if (!cell.classList.contains('marked')) {
            allMarked = false;
            return;
        }
    });

    if (allMarked) {
        alert('La máquina ha ganado. Todos los números han sido marcados.');
        return;
    }
}





drawButton.addEventListener('click', drawBall);

newGameButton.addEventListener('click', () => {
    currentBall.textContent = '-';
    clearTables();
    fillBingoCard(playerCardTable);
    fillBingoCard(opponentCardTable);
    drawnNumbers.clear(); // Reinicia el registro de números sacados
    

});


// Función para verificar si un número está en una tabla y resaltarlo
function markNumberInTable(table, number) {
    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
        if (cell.textContent === number.toString()) {
            cell.classList.add('matched');
        }
    });
}

// Función para quitar el resaltado de los números en una tabla
function unmarkTable(table) {
    const cells = table.querySelectorAll('td');
    cells.forEach(cell => {
        cell.classList.remove('matched');
    });
}

// Función para sacar una bola de bingo
function drawBall() {
    const drawnNumber = Math.floor(Math.random() * 75) + 1;
    currentBall.textContent = drawnNumber;
    checkWinner(drawnNumber);
    markNumberInTable(playerCardTable, drawnNumber);
    markNumberInTable(opponentCardTable, drawnNumber);
}


// Limpia el resaltado de las tablas al iniciar un nuevo juego
function clearTables() {
    unmarkTable(playerCardTable);
    unmarkTable(opponentCardTable);
}

drawButton.addEventListener('click', drawBall);
newGameButton.addEventListener('click', () => {
    // Reiniciar el juego aquí
    playerCardTable.innerHTML = '';
    opponentCardTable.innerHTML = '';
    currentBall.textContent = '-';
    generateBingoCard(playerCardTable);
    generateBingoCard(opponentCardTable);
    clearTables(); // Limpia el resaltado al iniciar un nuevo juego
});
