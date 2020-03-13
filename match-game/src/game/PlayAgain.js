import React from 'react';

const PlayAgain = props => (
    <div className="game-done">
        <div className="message" style={{ color: props.status === 'lost' ? 'red' : 'green' }}>
            {props.status === 'lost' ? 'Game over' : 'You won!'}
        </div>
        <button onClick={props.onClick}>Play</button>
    </div>
);

export default PlayAgain;