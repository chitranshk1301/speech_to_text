import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css';

function App() {

  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');


  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript()
    },
    {
      command: 'shut up',
      callback: () => setMessage('I wasn\'t talking.')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!')
    },
  ]
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  const translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', 'en');
    params.append('target', 'hi');
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  };

  useEffect(()=>{
    setInput(transcript)
  },[transcript])

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  };


  return (
    <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="mx-10 flex flex-col items-center">
        <h1 className="text-7xl font-extrabold text-center text-slate-300 mt-28">Speech To Text</h1>
        <p className="text-xl text-center font-bold font-mono underline underline-offset-4 hover:decoration-4 mt-20 text-slate-100"> Press the record button</p>
        <div className="flex flex-row space-x-8 items-center">
          <button onClick={listenContinuously} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-10 transition-all ease-in-out">
            Record
          </button>

          <button onClick={SpeechRecognition.stopListening} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mt-10 transition-all ease-in-out'>
            Stop
          </button>

          <button onClick={resetTranscript} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mt-10 transition-all ease-in-out'>
            Reset
          </button>
        </div>
      </div>
      <span className='text-white font-mono flex flex-row justify-center mt-16'>
        listening:
        {' '}
        {listening ? 'on' : 'off'}
      </span>
      <div className="flex space-y-10 mt-10 pb-20 min-[320px]:flex-col items-center">
        <div className="h-80 w-9/12 rounded-xl mt-16 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-200">
          <p className="text-white font-extrabold ml-10 mt-7">English:</p>
          {message}
          <p className='text-white font-bold ml-10 mt-10'>
            {transcript}
          </p>
        </div>
          <button className='hover:bg-blue-700 w-40 text-white font-bold py-1 border border-blue-700 rounded mt-7 transition-all ease-in-out  md:ml-20 lg:ml-20' onClick={e => translate()}>
            Translate to hindi
          </button>
        <div className="h-80 w-9/12 rounded-xl mt-16 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-200">
          <span className='text-white mt-7 ml-10'>
            {output}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
