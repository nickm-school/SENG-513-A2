import './index.css';
import history from './history.svg';
import React, { useState } from 'react';

const BOARD_SIZE = 4
const NUM_BOXES = 9

var player_1 = {
    color: "red",
}
var player_2 = {
    color: "blue",
}
var player_3 = {
    color: "green",
}

var current_player = player_1
let cols = Array(BOARD_SIZE - 1).fill().map(() => Array(BOARD_SIZE).fill(false));
let rows = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE - 1).fill(false));

function Game() {
    const [player_1_score, player_1_score_set] = useState(0);
    const [player_2_score, player_2_score_set] = useState(0);
    const [player_3_score, player_3_score_set] = useState(0);
    const [boxes_left, boxes_left_set] = useState(NUM_BOXES);
    const [popup_enabled, popup_enabled_set] = useState(true);

    return (
        <div className="Game">
            <h1>DOTS & BOXES</h1>
            <div class="game-content">
                <div class="score-board">
                    <div class="scores">
                        <h2>Score:</h2>
                        <h3>Player 1: {player_1_score}</h3>
                        <h3>Player 2: {player_2_score}</h3>
                        <h3>Player 3: {player_3_score}</h3>
                    </div>
                    <button class="mobile-new-game" onClick={() => newGame()}><img src={history} className="restart" /></button>
                </div>
                <div class="board">
                    {row(0)}
                    {row(1)}
                    {row(2)}
                    {finalRow()}
                </div>
                <div class="new-game">
                    <button onClick={() => newGame()}><img src={history} className="restart" /></button>
                </div>
            </div>
            {boxes_left <= 0 &&
                popup_enabled &&
                game_over_popup()
            }
        </div>
    );

    function newGame() {
        current_player = player_1
        cols = Array(BOARD_SIZE - 1).fill().map(() => Array(BOARD_SIZE).fill(false));
        rows = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE - 1).fill(false));
        player_1_score_set(0)
        player_2_score_set(0)
        player_3_score_set(0)
        boxes_left_set(NUM_BOXES)
        popup_enabled_set(true)

        const lines = document.getElementsByClassName("line");
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.backgroundColor = "lightgray"
            lines[i].disabled = false
        }
    }

    function row(index_i) {
        return (
            <div class="row">
                {vl(index_i, 0)}
                {horizontalLine(index_i, 0)}
                {vl(index_i, 1)}
                {horizontalLine(index_i, 1)}
                {vl(index_i, 2)}
                {horizontalLine(index_i, 2)}
                {vl(index_i, 3)}
            </div>
        );
    }

    function finalRow() {
        return (
            <div class="row">
                {dot()}
                {horizontalLine(3, 0)}
                {dot()}
                {horizontalLine(3, 1)}
                {dot()}
                {horizontalLine(3, 2)}
                {dot()}
            </div>
        )
    }

    function vl(index_i, index_j) {
        return (
            <div class="vl">
                {dot()}
                {verticalLine(index_i, index_j)}
            </div>
        )
    }

    function horizontalLine(index_i, index_j) {
        return (
            <button class="horizontal line" id={`hl ${index_i} ${index_j}`} onClick={() => handleLineClick("hl", index_i, index_j)}></button>
        )
    }

    function verticalLine(index_i, index_j) {
        return (
            <button class="vertical line" id={`vl ${index_i} ${index_j}`} onClick={() => handleLineClick("vl", index_i, index_j)}></button>
        )
    }

    function dot() {
        return (
            <svg width="15px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill='navy' stroke="black" strokeWidth="5" />
            </svg>
        )
    }

    function game_over_popup() {
        return (
            <div id="popup">
                <button class="close-popup" onClick={() => popup_enabled_set(false)}>X</button>
                <h3>{getWinner()}</h3>
                <h4>Player 1: {player_1_score} boxes</h4>
                <h4>Player 2: {player_2_score} boxes</h4>
                <h4>Player 3: {player_3_score} boxes</h4>
                <button class="popup-new-game" onClick={() => newGame()}>New Game</button>
            </div >
        )
    }

    function getWinner() {
        var winner = "Player 1"
        var score = player_1_score
        if (score < player_2_score) {
            winner = "Player 2"
            score = player_2_score
        }
        else if (score == player_2_score) {
            winner = winner + ", Player 2"
        }
        if (score < player_3_score) {
            winner = "Player 3"
            score = player_3_score
        }
        else if (score == player_3_score) {
            winner = winner + ", Player 3"
        }

        return winner + " wins!"
    }

    function handleLineClick(lineType, index_i, index_j) {
        if (lineNotFilled(lineType, index_i, index_j)) {
            var switch_player = true
            const id = lineType + " " + index_i + " " + index_j
            document.getElementById(id).style.backgroundColor = current_player.color;
            document.getElementById(id).disabled = true
            if (lineType == "hl") {
                rows[index_i][index_j] = true
                switch_player = !isBoxComplete(lineType, index_i, index_j)
            }
            else {
                cols[index_i][index_j] = true
                switch_player = !isBoxComplete(lineType, index_i, index_j)
            }
            if (switch_player)
                switchToNextPlayer()
        }
    }

    function lineNotFilled(lineType, index_i, index_j) {
        if (lineType == "hl")
            return !rows[index_i][index_j]
        else
            return !cols[index_i][index_j]
    }

    function isBoxComplete(lineType, index_i, index_j) {
        var count = 0
        if (lineType == "hl") {
            if (index_i == 0) {
                if (cols[0][index_j] && cols[0][index_j + 1] && rows[1][index_j])
                    count++
            }
            else if (index_i == 3) {
                if (cols[2][index_j] && cols[2][index_j + 1] && rows[2][index_j])
                    count++
            }
            else {
                if (cols[index_i - 1][index_j] && cols[index_i - 1][index_j + 1] && rows[index_i - 1][index_j])
                    count++
                if (cols[index_i][index_j] && cols[index_i][index_j + 1] && rows[index_i + 1][index_j])
                    count++
            }
        }
        else {
            if (index_j == 0) {
                if (rows[index_i][0] && rows[index_i + 1][0] && cols[index_i][1])
                    count++
            }
            else if (index_j == 3) {
                if (rows[index_i][2] && rows[index_i + 1][2] && cols[index_i][2])
                    count++
            }
            else {
                if (rows[index_i][index_j - 1] && rows[index_i + 1][index_j - 1] && cols[index_i][index_j - 1])
                    count++
                if (rows[index_i][index_j] && rows[index_i + 1][index_j] && cols[index_i][index_j + 1])
                    count++
            }
        }
        if (count > 0) {
            addToScore(count)
            return true
        }
        else
            return false
    }

    function switchToNextPlayer() {
        if (current_player == player_1)
            current_player = player_2
        else if (current_player == player_2)
            current_player = player_3
        else
            current_player = player_1
    }

    function addToScore(amount) {
        if (current_player == player_1)
            player_1_score_set(player_1_score + amount)
        else if (current_player == player_2)
            player_2_score_set(player_2_score + amount)
        else
            player_3_score_set(player_3_score + amount)
        boxes_left_set(boxes_left - amount)
    }
}

export default Game;