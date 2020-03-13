import React, { useState, useEffect } from 'react';
import { utils, colors } from './Utils'

const GameNumber = props => (
    <button className="number" style={{ backgroundColor: colors[props.status] }} onClick={() => props.onClick(props.number, props.status)}>
        {props.number}
    </button>
);

const StarsBoard = props => (
    <>
        {utils.range(1, props.count).map(starId => <div key={starId} className="star" />)}
    </>
);

const PlayAgain = props => (
    <div className="game-done">
        <div className="message" style={{ color: props.status === 'lost' ? 'red' : 'green' }}>
            {props.status === 'lost' ? 'Game over' : 'You won!'}
        </div>
        <button onClick={props.onClick}>Play again</button>
    </div>
);

const Game = (props) => {
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

    const candidatesAreWrong = utils.sum(candidateNumbers) > stars;

    const gameStatus = availableNumbers.length === 0 ? 'won' :
        secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }
        if (candidateNumbers.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClicked = (number, status) => {
        if (status === 'used' || gameStatus !== 'active') {
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
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus !== 'active' ? (
                            <PlayAgain onClick={props.startNewGame} status={gameStatus} />
                        ) : (
                                <StarsBoard count={stars} />
                            )
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(buttonId => <GameNumber key={buttonId} status={numberStatus(buttonId)} number={buttonId} onClick={onNumberClicked} />)}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const StarMatch = () => {
    const [gameId, setGameId] = useState(0);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default StarMatch;