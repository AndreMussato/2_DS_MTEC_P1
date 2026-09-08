import React from "react";

import './App.css'

//Importa Hooks do React:
// useState = cria estados que podem ser alterados
// useEffect = executa uma ação quando determinados estados mudam
// useCallback = memoriza uma função para evitar que ela seja recriada
//desnecessariamente a cada renderização
import { useCallback, useEffect, useState } from "react";

//Importa a lista de palavras utilizadas no jogo
import { wordsList } from "./data/words";

//Importa os componentes utilizados na aplicação
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

//Define as etapas do jogo:
//start = inicio
//game = jogo
//end = fim
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

//Quantidade inicial de tentativas
//guessesQty = quantidade de tentativas
const guessesQty = 5;


function App() {
  /* gameStage = etapa atual do jogo
  setGameStage = altera a etapa atual
  O jogo começa na etapa "start". */
  const [ gameStage, setGameStage ] = useState(stages[0].name);

  
  return (
    <>
    </>
  )
}

export default App