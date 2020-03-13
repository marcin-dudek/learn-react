import React, { useState } from 'react';
import Game from './Game'

const StarMatch = () => {
    const [gameId, setGameId] = useState(0);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default StarMatch;