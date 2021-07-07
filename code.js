let boardModel = [
    ['0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0']
]

let moves = 0
let currentPlayer = 1
let table = document.querySelector('tbody')
let displayMessage = document.getElementById("message")
let button = document.getElementById("reset-game")

button.addEventListener("click", resetGame)
table.addEventListener('click', insertToken)

function insertToken(event) {
    if (event.path.length === 10) { //avoids null return value when clicking anywhere else in the table
        let parentRow = document.getElementById(`${event.target.parentElement.id}`).id
        let column = boardModel[parentRow].indexOf('0')
        if (column > -1) { //checks if there are any more 0 left in the array. won't add if array is filled for the column
            moves++
            boardModel[parentRow][column] = `${currentPlayer}`
            checkBoard()
            renderBoard(parentRow, column)
            changePlayer()

        }

    }
}

function renderBoard(row, column) {
    let getRow = parseInt(row) + 1
    let rowToGet = document.querySelector(`tbody tr:nth-of-type(${getRow})`)
    let columnToGet = rowToGet.children[column]
    if (currentPlayer === 1) {
        columnToGet.classList.add('red-chip');
    } else if (currentPlayer === 2) {
        columnToGet.classList.add('black-chip');
    }
}

function changePlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2
    } else {
        currentPlayer = 1
    }
}

function checkDiagonalRight(board, r, c) {

    let row = r
    let col = c
    let str = ''
    while (row < board.length && col < board[0].length) {
        str += board[row][col]
        row++
        col++
    }
    if (str.includes("1111") || str.includes('2222')) {
        return true
    } else {
        return false
    }
}

function checkDiagonalLeft(board, r, c) {
    let row = r
    let col = c
    let str = ''
    while (row < board.length && col > -1) {
        str += board[row][col]
        row++
        col--
    }
    if (str.includes("1111") || str.includes('2222')) {
        return true
    } else {
        return false
    }
}

function checkHorizontal(board, r, c) {
    let row = r
    let col = c
    let str = ''
    while (row < board.length && col < board.length) {
        str += board[row][col]
        col++
    }
    if (str.includes("1111") || str.includes('2222')) {
        return true
    } else {
        return false
    }
}

function checkVertical(board, r, c) {
    let row = r
    let col = c
    let str = ''
    while (row < board.length && col < board.length) {
        str += board[row][col]
        row++
    }
    if (str.includes("1111") || str.includes('2222')) {
        return true
    } else {
        return false
    }
}

function gameOver() {
    table.removeEventListener('click', insertToken)
    if (currentPlayer === 1) {
        displayMessage.innerText = "Player 1 Wins!"
    } else if (currentPlayer === 2) {
        displayMessage.innerText = "Player 2 Wins!"
    }
}

function checkForTie() {
    if (moves === 42) {
        return true
    } else {
        return false
    }
}

function checkForWinner(boardModel, i, j) {
    if (checkHorizontal(boardModel, i, j) ||
        checkVertical(boardModel, i, j) ||
        checkDiagonalRight(boardModel, i, j) ||
        checkDiagonalLeft(boardModel, i, j)) {
        return true
    }
}

function checkBoard() {
    for (let i = 0; i < boardModel.length; i++) {
        for (let j = 0; j < boardModel[0].length; j++) {
            if (checkForTie()) {
                displayMessage.innerText = "No more moves. Play again?"
                table.removeEventListener('click', insertToken)
            } else if (checkForWinner(boardModel, i, j)) {
                gameOver()
            }
        }
    }
}


function resetGame() {
    location.reload();
}
