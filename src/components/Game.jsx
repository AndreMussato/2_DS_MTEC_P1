//Importa o React e os Hooks:
// useState = permite criar e alterar estados
// useRef = permite criar uma referência direta para um elemento HTML
import React, { useState, useRef } from 'react'

//Importa o arquivo CSS específico do componente Game
import './Game.css'

//Cria o componente Game (Jogo)
//O componente recebe várias propriedades (props) vindas do App.jsx
function Game({
    verifyLetter, //verifyLetter = verifica letra
    pickedWord, //pickedWord = palavra escolhida/sorteada
    pickedCategory, //pickedCategory = categoria escolhida/sorteada
    letters, //letters = letras da palavra
    guessedLetters, //guessedLetters = letras advinhadas/corretas
    wrongLetters, //wrongLetters = letras erradas
    guesses, //guesses = tentativas
    score, //score = pontuação
}) {

    //Cria um estado que armazena a letra digitada pelo usuário
    //letter = letra
    //setLetter = função utilizada para alterar a letra
    const [letter, setLetter] = useState("");

    //Cria uma referência para o campo input
    //letterInputRef = referência do input da letra
    //Essa referência será utilizada posteriormente para
    //colocar o foco novamente no input
    const letterInputRef = useRef(null);

    return (
        <>
        </>
    )
}

export default Game