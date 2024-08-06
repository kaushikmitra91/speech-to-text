import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import Charts from "./charts";
import Outlook from "./outlook";
import { ChartIcon, Microphone, Calendar, MicrophoneOff } from "./svg/index";
import Slider from "./carousel";
import { SpeechRecognition as MobileSpeechRecognition } from "@capacitor-community/speech-recognition";
import { isMobile } from "react-device-detect";

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
  const [text, setText]=useState(''); 

  const mobileSpeechStart = async () => {
    // const {available} = await MobileSpeechRecognition.available();
    // if (available) {
    //   MobileSpeechRecognition.start({
    //     language: "en-US",
    //     partialResults: true,
    //     popup: false,
    //   });
    //   MobileSpeechRecognition.addListener('partialResults',(data)=>{
    //     if(data?.matches?.length){
    //       setText(data.matches[0])
    //     }
    //   })
    // }
  };

  const mobileSpeechStop = async () => {
    //await MobileSpeechRecognition.stop();
  };

  const stopListeningHandler = () => {
    if (browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: false });
    }
    SpeechRecognition.stopListening();
  };

  const startListeningHandler = () => {
      if (browserSupportsContinuousListening) {
        SpeechRecognition.startListening({ continuous: true });
      }else{
        SpeechRecognition.startListening();
      }
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

  // useEffect(() => {
  //   if(isMobile)
  //   MobileSpeechRecognition.requestPermissions(); 
  // }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="applicationWrapper">
      <header></header>
      <main>
        {visibility?.microphone && (
          <div className="microphoneWrapper">
            <Slider />
            <div className="container">
              <p>Microphone: {listening ? "on" : "off"}</p>
              {/* <button onClick={resetTranscript}>Reset</button> */}
              <div>
                <div>{transcript}</div>
                {/* {text && <div>{text}</div>} */}
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
