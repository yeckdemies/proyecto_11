import { useEffect, useState } from 'react';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('trivia-history')) || [];
    setHistory(stored.reverse());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('trivia-history');
    setHistory([]);
  };

  return (
    <main className='history-container'>
      <h1>Histórico de puntuaciones</h1>

      {history.length === 0 ? (
        <p>No hay partidas guardadas.</p>
      ) : (
        <section>
          <ul className='history-list'>
            {history.map((entry, index) => (
              <li key={index}>
                <time className='history-date'>{entry.date}</time>
                <span className='history-score'>Puntuación: {entry.score}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {history.length > 0 && (
        <button className='clear-button' onClick={clearHistory}>
          Borrar historial
        </button>
      )}
    </main>
  );
};

export default History;
