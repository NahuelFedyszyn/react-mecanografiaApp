import './App.css';
import React, { useEffect, useState } from 'react'
import jsonWords from './words.json'

import keyAudio from "./assests/sounds/key.mp3"
import breakAudio from "./assests/sounds/break.mp3"
import finishAudio from "./assests/sounds/finish.mp3"




let words = jsonWords;

const keySound = new Audio(keyAudio);
const breakSound = new Audio(breakAudio);
const finishSound = new Audio(finishAudio);

console.log(words[Math.floor(Math.random()*words.length)]["word"].toUpperCase())
console.log(words)
function App() {
  
  
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [word, setWord] = useState(" ");
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Presiona espacio para iniciar")
  const [timerWidt, setTimerWidth] = useState(0.0);
  const [playing, setPlaying] = useState(false);
  const [finish, setFinish] = useState(false);

  function setNewWord(){
    let index = Math.floor(Math.random()*words.length);
    setWord(words[index]["word"].toUpperCase());
    words.splice(index,1);
  }

  function finished(){
    keySound.pause();
    keySound.currentTime = 0;
    breakSound.pause();
    breakSound.currentTime = 0;
    finishSound.play();
    alert(`¡Ganaste! Puntuacion: ${score}`);
    setDisabled(true);
    setWord("¡Ganaste!");
    setPlaceholder("Presiona F5 para volver a jugar")
  }

  function handleInputChange(event){

  
        if(event.target.value.toUpperCase()[event.target.value.length-1]==word[event.target.value.length-1]){
          if(userInput.length == word.length-1){
            if(event.target.value.toUpperCase()[event.target.value.length-1]==word[event.target.value.length-1]){
              setUserInput("");
              setPlaceholder("¡Escribe!");
              setPlaying(true);
              breakSound.pause();
              breakSound.currentTime = 0;
              breakSound.play();
              setScore(score+1);
              setNewWord();

              if(words.length == 0){
                
                finished();
                
              }
            }
          }
          else{
            keySound.pause();
            keySound.currentTime = 0;
            keySound.play();
            setUserInput(event.target.value.toUpperCase());
            
          }
        }
        else{
          setUserInput("");
        }

  }

  return (
    <div className="mainContainer">
      <div className="subContiner">    

        <div className="wordContainer">
          <input className="word" disabled value={word}></input>
        </div>

        <div className="inputContainer">
          <input className="userInput" disabled={disabled} id="userInput" value={userInput} onChange={handleInputChange} placeholder={placeholder}></input>
        </div>
        
      </div>
      <div className="timerBox">
        <div className="timer"></div>
      </div>
    </div>
  )
}

export default App

