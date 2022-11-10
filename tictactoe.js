// TicTacToe - No Interface by Victor DANE

window.addEventListener('DOMContentLoaded', () => {
    //We get the element that we are going to interact with

    const case_ = Array.from(document.querySelectorAll('.case'))
    const current_player_front = document.querySelector('.current_player')
    const reset_button = document.querySelector('#reset')
    const ending_screen = document.querySelector('.ending')
    const style_button = document.querySelector('#change')

    let output_array = ['', '', '', '', '', '', '', '', '']
    let current_player = 'X'
    let playing = true
    let current_font = 'font1'

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const legalMove = (case_) => {
        if (case_.innerText === 'X' || case_.innerText === 'O') {
            return false
        }
        return true
    }

    const updateOutput = (index) => {
        output_array[index] = current_player
    }

    const updatePlayer = () => {
        current_player_front.classList.remove(`player_${current_player}`)
        current_player = current_player === 'X' ? 'O' : 'X'
        current_player_front.innerText = current_player
        current_player_front.classList.add(`player_${current_player}`)
    }

    const ending = (type) => {
        switch (type) {
            case 1:
                ending_screen.innerHTML = `Player <div class="${current_font} space"><span class="player_X">X</span></div> Won.`
                break;
            case 2:
                ending_screen.innerHTML = `Player <div class="${current_font} space"><span class="player_O">O</span></div>  Won.`
                break;
            case 3:
                ending_screen.innerHTML = 'It is a tie.'
                break;
        }
        ending_screen.classList.remove('hide')
    }

    const updateBgWin = (index1, index2, index3) => {
        case_.forEach( (cell, index) =>{
            if (index === index1 || index === index2 || index === index3){
                cell.classList.add('bg_winner')
            }
        })
    }

    function handleResultValidation() {
        let roundWon = false
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i]
            const a = output_array[winCondition[0]]
            const b = output_array[winCondition[1]]
            const c = output_array[winCondition[2]]
            if (a === "" || b === "" || c === "") {
                continue
            }
            if (a === b && b === c) {
                roundWon = true
                updateBgWin(winCondition[0], winCondition[1], winCondition[2])
                break;
            }
        }
      
        if (roundWon) {
            ending(current_player === "X" ? 1 : 2)
            playing = false
            return
        }
      
        if (!output_array.includes("")) { ending(3) }
    }

    const playerAction = (case_, index) => {
        if (legalMove(case_) && playing) {
            case_.innerText = current_player;
            case_.classList.add(`player_${current_player}`);
            updateOutput(index);
            handleResultValidation();
            updatePlayer();
        }
    }

    case_.forEach( (cell, index) =>{
        cell.addEventListener('click', () => playerAction(cell, index))
    })

    const resetOutput = () => {
        output_array = ['', '', '', '', '', '', '', '', '']
        playing = true
        ending_screen.innerText = ""
        ending_screen.classList.add('hide')

        if (current_player === 'O') {
            updatePlayer()
        }

        case_.forEach(cell => {
            cell.innerText = ''
            cell.classList.remove('player_X')
            cell.classList.remove('player_O')
            cell.classList.remove('bg_winner')
        })
    }

    reset_button.addEventListener('click', resetOutput)

    const changeStyle = () => {
        let all_font = document.querySelectorAll(`.${current_font}`)
        let old_font = current_font
        current_font = current_font === 'font1' ? 'font2' : 'font1'
        all_font.forEach(elem => {
            elem.classList.remove(old_font)
            elem.classList.add(current_font)
        })
    }

    style_button.addEventListener('click', changeStyle)
});
