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
            <div className='game'>
                {/* Exibe a pontuação atual do jogador */}
                <p className='points'>
                    <span>Pontuação: {score}</span>
                </p>

                <h1>Advinhe a palavra:</h1>

                {/* Exibe a qauntidade de tentativas restantes */}
                <p>Você ainda tem {guesses} tentativa(s).</p>

                {/* Container responsável por exibir as letras da palavra */}
                <div className='wordContainer'>
                    {/* Percorre todas as letras da palavra utilizando map()
                letter = letra atual
                i = índice/posição da letra */}
                    {letters.map((letter, i) =>
                        //Verifica se a letra atual está dentro do array de letras
                        //já acertadas
                        guessedLetters.includes(letter) ? (
                            //Se a letra já foi acertada, exibe a própria letra
                            <span key={i} className='letter'>
                                {letter}
                            </span>
                        ) : (
                            //Caso a letra ainda não tenha sido acertada, exibe um quadro vazio
                            <span key={i} className='blankSquare'></span>
                        )
                    )}
                </div>

                {/* Área onde o jogador digita uma letra */}
                <div className='letterContainer'>
                    <p>Tente advinhar uma letra da palavra: </p>
                    {/* Quando o formulário for enviado, executa a função handleSubmit */}
                    <form onSubmit={handleSubmit}>

                        <input
                            type='text'
                            name='letter'
                            //Permite digitar apenas um caractere
                            maxLength={1}
                            //Torna o preenchimento obrigatório
                            required
                            //Sempre que o usuário digitar algo, atualiza o estado letter
                            onChange={(e) => setLetter(e.target.value)}
                            //O valor do input será o estado letter
                            value={letter}
                            //Associa o input à referência criada com useRed
                            ref={letterInputRef}
                        />

                        {/* Envia o formulário */}
                        <button>Jogar!</button>
                    </form>

                    {/* Área que mostra as letras erradas já utilizadas */}
                    <div className='wordLettersContainer'>

                        <p>Letras já utilizadas:</p>

                        {/* Percorre o array de letras erradas
                        wrongLetters = letras erradas
                        letter = cada letra errada
                        i = índice/posição */}
                        {wrongLetters.map((letter, i) => (
                            //Exibe cada letra errada
                            <span key={i}>{letter}, </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Game