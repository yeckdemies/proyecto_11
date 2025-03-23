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
    <div className='result-container'>
      <h1>¡Fin de Juego!</h1>
      <p>
        Tu puntuación es: <strong>{score}</strong>
      </p>

      <div className='result-buttons'>
        <button onClick={handlePlayAgain}>Volver a jugar</button>
        <button onClick={handleGoToHistory}>Ver historial</button>
      </div>
    </div>
  );
};

export default Result;
