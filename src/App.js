import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.scss";
import Charts from "./charts";
import Outlook from "./outlook";
import Profile from "./profile";
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
    profile: false
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
      <header>
      <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            <ul id="menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Info</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
           </div>
          </nav>
      </header>
      <main>
        {visibility?.microphone && (<div className="microphoneWrapper">
       
          <div className="container">
            <h1 className="pageTitle">Speech to Text</h1>
          <Slider />
            <div className="mic-wrapper">
           
            {/* <button onClick={resetTranscript}>Reset</button> */}
            <div className="micField">
             
              <div className="icon" onClick={buttonHandler}>
                {listening ? <Microphone /> : <MicrophoneOff />}
              </div>
              <div className="transcript">{transcript}</div>
            </div>
            <p>Microphone: {listening ? "on" : "off"}</p>

            </div>
          </div>
          </div>
        )}
        {visibility?.chart && <Charts />}
        {visibility?.outlook && <Outlook />}
        {visibility?.profile && <Profile />}
      </main>
      <footer className="footer">
        {/* <div className="footer">
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
        </div> */}
         <div className="tabs">
          <div className="tablist" >
            <button className="tab" role="tab" aria-selected={visibility?.microphone} onClick={() => onMenuClickHandler("microphone")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="mic"><g><path d="M16,22a6,6,0,0,0,6-6V8A6,6,0,0,0,10,8v8A6,6,0,0,0,16,22Z"/><path d="M25,13a1,1,0,0,0-1,1v2A8,8,0,0,1,8,16V14a1,1,0,0,0-2,0v2a10,10,0,0,0,9,9.95V28H11a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2H17V25.95A10,10,0,0,0,26,16V14A1,1,0,0,0,25,13Z"/></g></svg>
              <span></span>
              </button>

            <button className="tab" role="tab"  aria-selected={visibility?.chart} onClick={() => onMenuClickHandler("chart")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="chart"><path fill="#200E32" d="M14.6694,0.0004 C18.0704,0.0004 19.9904,1.9294 20.0004,5.3304 L20.0004,5.3304 L20.0004,14.6704 C20.0004,18.0704 18.0704,20.0004 14.6694,20.0004 L14.6694,20.0004 L5.3304,20.0004 C1.9294,20.0004 0.0004,18.0704 0.0004,14.6704 L0.0004,14.6704 L0.0004,5.3304 C0.0004,1.9294 1.9294,0.0004 5.3304,0.0004 L5.3304,0.0004 Z M10.5004,4.1304 C10.2194,3.9604 9.8794,3.9604 9.6104,4.1304 C9.3394,4.2994 9.1904,4.6104 9.2194,4.9204 L9.2194,4.9204 L9.2194,15.1104 C9.2704,15.5404 9.6294,15.8604 10.0494,15.8604 C10.4804,15.8604 10.8394,15.5404 10.8794,15.1104 L10.8794,15.1104 L10.8794,4.9204 C10.9194,4.6104 10.7704,4.2994 10.5004,4.1304 Z M5.8304,7.4104 C5.5604,7.2404 5.2194,7.2404 4.9504,7.4104 C4.6794,7.5804 4.5304,7.8894 4.5604,8.2004 L4.5604,8.2004 L4.5604,15.1104 C4.5994,15.5404 4.9594,15.8604 5.3894,15.8604 C5.8204,15.8604 6.1794,15.5404 6.2194,15.1104 L6.2194,15.1104 L6.2194,8.2004 C6.2504,7.8894 6.0994,7.5804 5.8304,7.4104 Z M15.0894,11.0404 C14.8204,10.8704 14.4804,10.8704 14.2004,11.0404 C13.9294,11.2104 13.7804,11.5094 13.8204,11.8304 L13.8204,11.8304 L13.8204,15.1104 C13.8604,15.5404 14.2194,15.8604 14.6504,15.8604 C15.0704,15.8604 15.4294,15.5404 15.4804,15.1104 L15.4804,15.1104 L15.4804,11.8304 C15.5094,11.5094 15.3604,11.2104 15.0894,11.0404 Z" transform="translate(2 2)"/></svg>
            <span></span>
            </button>

            <button className="tab" role="tab"  aria-selected={visibility?.outlook} onClick={() => onMenuClickHandler("outlook")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 468 468" id="outlook"><path d="M270.714 121.597V223.05l25.236 21.481 144.429-122.934zM439.717 346.245l-107.909-90.058-25.449 21.661c-5.923 5.042-14.891 5.045-20.818 0l-14.827-12.621v81.017h169.003zM356.625 235.064l111.3 92.889.075-187.689zM119.683 189.649c-23.855 0-34.533 22.401-34.533 44.601 0 25.544 14.307 44.084 34.018 44.084 19.713 0 34.02-18.756 34.02-44.599.001-15.248-7.002-44.086-33.505-44.086z"/><path d="M238.595 36.708.002 71.098 0 396.872l238.598 34.417v-.001l.029.003-.032-394.583zM118.142 302.876c-37.345 0-63.427-27.903-63.427-67.855 0-41.165 26.927-69.914 65.483-69.914 37.495 0 63.683 27.902 63.683 67.855 0 48.035-34.077 69.914-65.739 69.914z"/></svg>  
            <span></span>
           </button>
            <button className="tab"  role="tab" aria-selected={visibility?.profile} onClick={() => onMenuClickHandler("profile")}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C12 6.06087 11.5786 7.07828 10.8284 7.82843C10.0783 8.57857 9.06087 9 8 9C6.93913 9 5.92172 8.57857 5.17157 7.82843C4.42143 7.07828 4 6.06087 4 5C4 3.93913 4.42143 2.92172 5.17157 2.17157C5.92172 1.42143 6.93913 1 8 1C9.06087 1 10.0783 1.42143 10.8284 2.17157C11.5786 2.92172 12 3.93913 12 5V5ZM8 12C6.14348 12 4.36301 12.7375 3.05025 14.0503C1.7375 15.363 1 17.1435 1 19H15C15 17.1435 14.2625 15.363 12.9497 14.0503C11.637 12.7375 9.85652 12 8 12V12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <span></span>
              </svg>
                 
            </button>
           </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
