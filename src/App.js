import './App.css';
import React, { useEffect, useState } from 'react'
import jsonWords from './words.json'


import keyAudio from "./assests/sounds/key.mp3"
import breakAudio from "./assests/sounds/break.mp3"
import finishAudio from "./assests/sounds/finish.mp3"
import errorAudio from "./assests/sounds/error.mp3"

let words = [...jsonWords];

const keySound = new Audio(keyAudio);
const breakSound = new Audio(breakAudio);
const finishSound = new Audio(finishAudio);
const errorSound = new Audio(errorAudio);




function App() {
  

  function aparecer(){
    let palabra = document.getElementById("word");
    let pos = 130;
    
    let moviendo = setInterval(movimiento,0.1);
    function movimiento(){
      if(pos>0){
        pos = pos-2;
        palabra.style.paddingLeft = pos+"vw";
      }
      else{
        clearInterval(moviendo);
      }
    }
  }
  

  console.log(jsonWords)
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [word, setWord] = useState(" ");
  const [placeholder, setPlaceholder] = useState("Presiona espacio para iniciar");
  const [playing, setPlaying] = useState(false);
  const [finish, setFinish] = useState(false);
  const [timerWidth, setTimerWidth] = useState(0.0);
  const [timerSpeed, setTimerSpeed] = useState(10);
  const [timerIncrement, setTimerIncrement] = useState(0.1);
  let timerStyle = {
    "width" : `${timerWidth}vw`
  }
  console.log(finish)
  useEffect(() => {
    if(playing){
      if(timerWidth<100){
        const interval = setInterval(() => {
          if(timerWidth<100){
            setTimerWidth(timerWidth+timerIncrement)
          }
          else{

            
          }
          
        }, timerSpeed);
        return () => clearInterval(interval);
      }
    }
  });

  if(timerWidth>=100){
    setFinish(true);
    setPlaying(false);
    setTimerWidth(0.0);
    setTimerSpeed(10);
    setTimerIncrement(0.1);
    finished();
  }

  function setNewWord(){
    aparecer();
    let index = Math.floor(Math.random()*words.length);
    setWord(words[index]["word"].toUpperCase());
    words.splice(index,1);
  }

  function reset(){
    words=[...jsonWords];
    setPlaceholder("Presiona espacio para comenzar");
    setFinish(false);
    setScore(0);
    setPlaying(false);
    setUserInput("");
    setWord(" ")
  }


  function finished(){
    setFinish(true);
    setPlaying(false);
    keySound.pause();
    keySound.currentTime = 0;
    breakSound.pause();
    breakSound.currentTime = 0;
    finishSound.play();
    words=[...jsonWords];
  }

  function handleInputChange(event){

        
        if(event.target.value.toUpperCase()[event.target.value.length-1]==word[event.target.value.length-1]){
          if(userInput.length == word.length-1){
            if(event.target.value.toUpperCase()[event.target.value.length-1]==word[event.target.value.length-1]){
              setUserInput("");
              setPlaceholder("??Escribe!");
              setPlaying(true);
              breakSound.pause();
              breakSound.currentTime = 0;
              breakSound.play();
              setScore(score+1);
              setNewWord();
              setTimerWidth(0.0);
              setTimerSpeed(timerSpeed*0.9)
              setTimerIncrement(timerIncrement*1.03)

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
          errorSound.pause()
          errorSound.currentTime = 0;
          errorSound.play();
          setUserInput("");
        }

  }

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key === " ") {
        if(finish){
          reset();
        }
        else{
          let userInput = document.getElementById("userInput");
          userInput.focus();

        }
    }
  };

  if(!finish){
    return (
      <div className="mainContainer">
        <div className="subContiner">    
  
          <div id="wordContainer" className="wordContainer w3-animate-right">
            <input id="word" className="word" disabled value={word}></input>
          </div>
  
          <div className="inputContainer">
            <input className="userInput" id="userInput" autoComplete="off" id="userInput" value={userInput} onChange={handleInputChange} placeholder={placeholder}></input>
          </div>
          <div className="timerBox">
            <div className="timer" style={timerStyle}></div>
          </div>
          
        </div>
      </div>
    )
  }
  else{
    return(
      <div className="mainContainer">
        <div className="subContainer">
          <div>
            <h1 className="title">??Tiempo!</h1>
          </div>
          <div className="puntuacionContainer">
            <div>
              <h1 className="puntuacionTitle">Puntuacion Final:</h1>
            </div>
            <div>
              <h1 className="score">{score}</h1>
            </div>
          </div>
          <div className="resetBtnContainer">
            <button className="resetBtn" onClick={reset}>JUGAR DE NUEVO</button>
          </div>
          <div className="contactContainer">
            <div className="nameContainer">
              <a target="_blank" href="https://nahuelfedyszyn.github.io/Portafolio/"  className="nahuel">Nahuel Fedyszyn</a>
            </div>
            <div className="linkContainer">
              <a target="_blank" href="https://www.linkedin.com/in/nahuel-fedyszyn-a95764186/" className="link"><i class="bi bi-linkedin"></i></a>
              <a target="_blank" href="https://github.com/NahuelFedyszyn/react-mecanografiaApp" className="link"><i class="bi bi-github"></i></a>
              <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=nahuelfedyszyn@gmail.com"  className="link"><i class="bi bi-google"></i></a>
              <a target="_blank" href="https://api.whatsapp.com/send?phone=5493874117921"  className="link"><i class="bi bi-whatsapp"></i></a>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default App

