import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [joke, setJoke] = useState('');
  const [jokesHistory, setJokesHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [quote, setQuote] = useState('');

  
  const quotes = [
    "Chuck Norris não faz flexões. Ele empurra a Terra para baixo. -",
    "Chuck Norris já contou até o infinito. . . duas vezes.-",
    "Chuck Norris pode dividir por zero. -",
    "Chuck Norris perdeu a virgindade antes do pai.. -",
    "Não existe teoria da evolução. Apenas uma lista de criaturas que Chuck Norris permitiu viver. -",
    "Chuck Norris não dorme; ele espera. -",
    "Chuck Norris pode fechar uma porta giratória. -",
    "Chuck Norris pode desfazer um ovo. -",
    "Se Chuck Norris se atrasar, é melhor o tempo andar mais devagar.. -",
    "Chuck Norris pode matar duas pedras com um pássaro. -"
  ];

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      const newJoke = response.data.value;

      if (!jokesHistory.includes(newJoke)) {
        setJoke(newJoke);
        setJokesHistory([...jokesHistory, newJoke]);
        setModalOpen(true);
      } else {
        fetchJoke();
      }
    } catch (error) {
      console.error('Erro ao buscar piada:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Muda a frase a cada 5 segundos
    const interval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }, 5000);

    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>Piadas do Chuck Norris</h1>
      <button onClick={fetchJoke} className="joke-button">
        Outra Piada
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{joke}</p>
          </div>
        </div>
      )}

      <div className="chuck-norris">
        <img src="https://cdn.leonardo.ai/users/03a4e8e9-4f81-40cc-83c2-c5c4475136fe/generations/708afe44-996f-46e0-b990-e4e9159fc537/Leonardo_Phoenix_A_portrait_of_Chuck_Norris_a_legendary_martia_2.jpg" alt="Chuck Norris" className="chuck-image" />
      </div>

      {/* Balão de conversa com a frase icônica */}
      <div className="speech-bubble">
        <p>{quote}Feitos de Chuck Norris-</p>
      </div>
    {/* Balão de conversa com a mensagem */}
    <div className="speech-bubble">
        <p>Para melhorar sua experiência, use o tradutor do navegador. Boas risadas!</p>
      </div>
    </div>
  );
}

export default App;
