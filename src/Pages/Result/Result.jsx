import { useParams, useNavigate } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const { score } = useParams();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/quiz');
  };

  const handleGoToHistory = () => {
    navigate('/history');
  };

  return (
    <main className='result-container'>
      <section>
        <h1>¡Fin de Juego!</h1>
        <p>
          Tu puntuación es: <strong>{score}</strong>
        </p>
      </section>
      <section className='result-buttons'>
        <button onClick={handlePlayAgain}>Volver a jugar</button>
        <button onClick={handleGoToHistory}>Ver historial</button>
      </section>
    </main>
  );
};

export default Result;
