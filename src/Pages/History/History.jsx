import { useEffect, useState } from 'react';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('trivia-history')) || [];
    setHistory(stored.reverse()); // Lo más reciente primero
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('trivia-history');
    setHistory([]);
  };

  return (
    <div className='history-container'>
      <h1>Histórico de puntuaciones</h1>

      {history.length === 0 ? (
        <p>No hay partidas guardadas.</p>
      ) : (
        <ul className='history-list'>
          {history.map((entry, index) => (
            <li key={index}>
              <span className='history-date'>{entry.date}</span>
              <span className='history-score'>Puntuación: {entry.score}</span>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <button className='clear-button' onClick={clearHistory}>
          Borrar historial
        </button>
      )}
    </div>
  );
};

export default History;
