import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <main className='home-container'>
      <h1>¡Bienvenido al juego de preguntas!</h1>
      <p>Pon a prueba tus conocimientos y tu nivel de inglés</p>
      <button className='start-button' onClick={handleStart}>
        Comenzar
      </button>
    </main>
  );
};

export default Home;
