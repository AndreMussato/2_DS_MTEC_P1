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
  const [gameStage, setGameStage] = useState(stages[0].name);

  /* words = palavras disponíveis no jogo
  Recebe inicialmente o conteúdo de wordsList. */
  const [words] = useState(wordsList);

  /* pickedWord = palavra sorteada
  setPickedWord = altera a palavra sorteada */
  const [pickedWord, setPickedWord] = useState("");

  /* pickedCategory = categoria sorteada
  setPickedCategory = altera a categoria */
  const [pickedCategory, setPickedCategory] = useState("");

  /* letters = array contendo cada letra da palavra sorteada
  setLetters = altera esse array */
  const [letters, setLetters] = useState([]);

  /* guessedLetters = letras corretas já advinhadas
  wrongLetters = letras erradas já digitadas */
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  /* guesses = quantidade de tentativas restantes
  Começa com o valor definido em guessesQty */
  const [guesses, setGuesses] = useState(guessesQty);

  /* score = pontuação atual do jogador */
  const [score, setScore] = useState(0);

  /* pickWordAndCategory = escolher palavra e categoria
  useCallback memoriza a função e só cria uma nova
  versão caso o valor de "words" seja alterado. */
  const pickWordAndCategory = useCallback(() => {

    /* Object.keys() retorna um array contendo
    todas as chaves do objeto words.
    Exemplo:
     {
      carro: [...],
      fruta: [...]
    }
      será transformado em:
      ["carro", "fruta"] */
    const categories = Object.keys(words);

    /* Math.random() gera um número aleatório entre 0 e 1.
    Math.floor() remove as casas decimais.
    Dessa forma, uma posição aleatória do array
    de categorias é escolhida. */
    const category =
      categories[
      Math.floor(
        Math.random() * Object.keys(categories).length
      )
      ];

    console.log(category);

    /* Escolhe uma palavra aleatória dentro
    da categoria selecionada. */
    const word =
      words[category][
      Math.floor(
        Math.random() * words[category].length
      )
      ]

      console.log(word);

      //Retorna a palavra e a categoria escolhidas
      return { word, category }
  }, [words]);

  /* startGame = iniciar jogo
  useCallback evita que a função seja recriada
  desnecessariamente a cada renderização. */
  const startGame = useCallback(() => {

    //Limpa as letras utilizadas na rodada anterior
    clearLetterStates();

    //Recebe a palavra e a categoria sorteadas
    const { word, category } = pickWordAndCategory();

    /* split("") transforma uma palavra em um array.
    Exemplo:
    "React"
    vira:
    ["R", "e", "a", "c", "t"] */
    let wordLetters = word.split("");

    /* map() percorre cada letra do array.
    toLowerCase() transforma todas as letras
    em minúsculas para facilitar as comparações. */
    wordLetters = wordLetters.map(
      (l) => l.toLowerCase()
    );

    console.log(word, category);
    console.log(wordLetters);

    //Preenche os estados com os dados sorteados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //Altera a etapa do jogo para "game"
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  /* verifyLetter = verificar letra
  Recebe a letra digitada pelo usuário. */
  const verifyLetter = (letter) => {
    
    /* normalizedLetter = letra normalizada converte a letra
    digitada para maiúscula para evitar diferenças entre, por
    exemplo: "A" e "a" */
    const normalizedLetter = letter.toLowerCase();

    /* includes() verifica se determinado valor já existe
    dentro de um array.
    Se a letra já foi utilizada, a função é interrompida
    pelo return. */
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    /* Verifica se a letra digitada existe dentro da palavra sorteada */
    if(letters.includes(normalizedLetter)) {
      /* Atualiza o array de letras acertadas.
      ...actualGuessedLetters utiliza o Spread Operator para copiar
      os valores que já estavam dentro do array.
      Depois adiciona a nova letra. */
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      /* Caso a letra não exista na palavra, ela é adicionada ao array de letras 
      erradas. */
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      /* Diminui uma tentativa.
      actualGuesses representa o valor atual do estado guesses. */
      setGuesses(
        (actualGuesses) => actualGuesses - 1
      );
    }
  };

  /* clearLetterStates = limpar estados das letras
  Limpa tanto as letras corretas quanto as letras
  erradas da rodada. */
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  /* useEffect observa o valor de guesses. Sempre que guesses mudar,
  esse código será executado. */
  useEffect(() => {
    
    // Verifica se as tentativas acabaram
    if(guesses <= 0) {
      //Limpa as letras utilizadas
      clearLetterStates();

      //Altera a etapa do jogo para "end"
      setGameStage(stages[2].name)
    }
  }, [guesses]);

  /* useEffect responsável por verificar se o jogador acertou a palavra.
  Ele será executado quando algum valor listado no array de dependências mudar */
  useEffect(() => {
    /* Set elemina valores repetidos.
    Exemplo:
    ["a", "r", "a", "r", "a"]
    vira:
    ["a", "r"]
    O operador ... transforma novamente o Set em um array. */
    const uniqueLetters = [...new Set(letters)];

    /* Condição de vitória:
    Se a quantidade de letras acertadas for igual à quantidade de letras únicas
    da palavra, significa que o jogador acertou todas as letras necessárias. */
    if (
      guessedLetters.length === uniqueLetters.length
    ) {
      /* Adiciona 100 pontos.
      actualScore = pontuação atual. */
      setScore(
        (actualScore) => actualScore += 100
      );

      //Inicia uma nova rodada com outra palavra
      setGame();
    }
  }, [guessedLetters, letters, startGame]);

  /* retry = tentar novamente / reiniciar jogo */
  const retry = () => {
    CONTINUAR DAQUI ;)
  }

  return (
    <>
    </>
  )
}

export default App