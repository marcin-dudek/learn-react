import React, { useState, useEffect } from 'react';
import utils from '../Utils'
import StarsBoard from './StarsBoard'
import PlayAgain from './PlayAgain'
import GameNumber from './GameNumber'

const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNumbers.length > 0) {
            const timerId = setTimeout(() => { setSecondsLeft(secondsLeft - 1); }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (number, status) => {
        if (status === 'used' || gameStatus() !== 'active') {
            return;
        }

        const newCandidateNumbers = status === 'available' ?
            candidateNumbers.concat(number) :
            candidateNumbers.filter(cn => cn !== number);

        if (utils.sum(newCandidateNumbers) !== stars) {
            setCandidateNumbers(newCandidateNumbers);
        } else {
            const newAvailableNumbers = availableNumbers.filter(n => !newCandidateNumbers.includes(n));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([]);
            setStars(utils.randomSumIn(newAvailableNumbers, 9));
        }
    }

    const numberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }
        if (candidateNumbers.includes(number)) {
            return utils.sum(candidateNumbers) > stars ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const gameStatus = () => {
        return availableNumbers.length === 0 ? 'won' :
        secondsLeft === 0 ? 'lost' : 'active';}

    return { stars, secondsLeft, numberStatus, gameStatus, setGameState };
};

const Game = (props) => {
    const { stars, secondsLeft, numberStatus, gameStatus, setGameState } = useGameState();

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus() !== 'active' ? (
                            <PlayAgain onClick={props.startNewGame} status={gameStatus()} />
                        ) : (
                            <StarsBoard count={stars} />
                        )
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(buttonId => <GameNumber key={buttonId} status={numberStatus(buttonId)} number={buttonId} onClick={setGameState} />)}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default Game;