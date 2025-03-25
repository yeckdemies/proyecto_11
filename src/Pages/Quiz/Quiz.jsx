import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const navigate = useNavigate();

  const fetchQuestions = async (retries = 3, delay = 500) => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&type=multiple'
      );

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
        setLoading(false);
      } else {
        throw new Error('No se obtuvieron preguntas.');
      }
    } catch (err) {
      if (retries > 0) {
        setTimeout(() => fetchQuestions(retries - 1, delay), delay);
      } else {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const q = questions[current];
      const answers = [...q.incorrect_answers, q.correct_answer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [questions, current]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[current].correct_answer;
    if (isCorrect) setScore((prev) => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      const history = JSON.parse(localStorage.getItem('trivia-history')) || [];
      const newEntry = {
        date: new Date().toLocaleString(),
        score: `${score + (isCorrect ? 1 : 0)}/${questions.length}`
      };
      localStorage.setItem(
        'trivia-history',
        JSON.stringify([...history, newEntry])
      );
      navigate(`/result/${score + (isCorrect ? 1 : 0)}`);
    }
  };

  if (loading) return <p className='loading'>Cargando preguntas...</p>;
  if (error)
    return (
      <p className='loading error'>
        Ooops! Ha ocurrido un error, recarga la página. Detalle: {error}.
      </p>
    );
  if (!questions[current]) return <p>No hay preguntas disponibles</p>;

  const q = questions[current];

  return (
    <div className='quiz-container'>
      <h2>
        Pregunta {current + 1} de {questions.length}
      </h2>
      <p
        className='question'
        dangerouslySetInnerHTML={{ __html: q.question }}
      />
      <ul className='answers'>
        {shuffledAnswers.map((ans, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswer(ans)}
              dangerouslySetInnerHTML={{ __html: ans }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
