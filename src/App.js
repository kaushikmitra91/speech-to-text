import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import microphone from "./microphone.svg";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const stopListeningHandler = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: false });
    }
    SpeechRecognition.stopListening();
  };

  const startListeningHandler = () => {
      if (browserSupportsContinuousListening) {
        SpeechRecognition.startListening({ continuous: true });
      }
      SpeechRecognition.startListening();
  };

  const buttonHandler = ()=>{
    if(!isListening){
      startListeningHandler();
    }else{
      stopListeningHandler();
    }
    setIsListening(!isListening);
  }
  
  return (
    <div className="App">
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={buttonHandler}>
          <img width={50} height={50} src={microphone} alt="microphone" />
        </button>

        {/* <button onClick={resetTranscript}>Reset</button> */}
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
