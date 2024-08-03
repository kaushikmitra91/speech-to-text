import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import Charts from "./charts";
import Outlook from "./outlook";
import { ChartIcon, Microphone, Calendar, MicrophoneOff } from "./svg/index";
import Slider from './carousel'

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  const footerMenuState = {
    microphone: true,
    chart: false,
    outlook: false,
  };

  const [visibility, setVisibility] = useState(footerMenuState);

  const [isListening, setIsListening] = useState(false);
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

  const buttonHandler = () => {
    if (!isListening) {
      startListeningHandler();
    } else {
      stopListeningHandler();
    }
    setIsListening(!isListening);
  };

  const onMenuClickHandler = (menu) => {
    const temp = { ...footerMenuState };
    for (const options in temp) {
      if (options === menu) {
        temp[options] = true;
      } else {
        temp[options] = false;
      }
    }
    setVisibility(temp);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="applicationWrapper">
      <header></header>
      <main>
        {visibility?.microphone && (<div className="microphoneWrapper">
        <Slider />
          <div className="container">
            <p>Microphone: {listening ? "on" : "off"}</p>
            {/* <button onClick={resetTranscript}>Reset</button> */}
            <div>
              <div>{transcript}</div>
              <div onClick={buttonHandler}>
                {listening ? <Microphone /> : <MicrophoneOff />}
              </div>
            </div>
          </div>
          </div>
        )}
        {visibility?.chart && <Charts />}
        {visibility?.outlook && <Outlook />}
      </main>
      <footer className="footerHolder">
        <div className="footer">
          <div
            className="option"
            onClick={() => onMenuClickHandler("microphone")}
          >
            <Microphone />
          </div>
          <div className="option" onClick={() => onMenuClickHandler("chart")}>
            <ChartIcon />
          </div>
          <div className="option" onClick={() => onMenuClickHandler("outlook")}>
            <Calendar />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
