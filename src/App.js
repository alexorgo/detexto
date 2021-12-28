import './App.css';
import axios from 'axios';
import InputBlock from './componentas/InputComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect, useState } from 'react';
import StepsCounterInput from './componentas/StepsCounter';
import logo from './media/alien-dance.gif';

//intentar cambiar state a array para el pathstring aber k mergas

function App() {

  const [outputs, setOutputs] = useState('output shows here');
  const [inputs, setInputs] = useState('input shows here');
  const [translationPathString, setTranslationPathString] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [steps, setSteps] = useState(5);

  var fileName;
  var fileContent;
  var translationPath = [];
  var offsetTranslationPath = [];

  const handleSteps = (noSteps) => {
    setSteps(noSteps);
  }

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
var foobar; 

useEffect(()=>{
  console.log(outputs);
}, [outputs])

useEffect(()=>{
  console.log(translationPathString);
}, [translationPathString])


const getTranslationPath = () => {
  let pathArray = [];
  let offsetPathArray = [];
  //getLanguageSource();
  offsetPathArray.push(14);
  for(let i = 0; i<steps ; i++){
    let randy = Math.floor(Math.random()*17);
    pathArray.push(randy);
    offsetPathArray.push(randy);
  }
  pathArray.push(14);
  translationPath = pathArray;
  offsetTranslationPath = offsetPathArray;
  let tempPathString = 'translation path: '
  for(let i = 0 ; i<translationPath.length-1 ; i++){
    tempPathString = tempPathString + languagesList[translationPath[i]].name + " → ";
  }
  tempPathString = tempPathString + "español";
  setTranslationPathString(tempPathString);
  console.log("translation path set");
}

useEffect(() => {
  axios.get(`https://libretranslate.de/languages`)
      .then((response) => {
          setLanguagesList(response.data)
          console.log(response.data)
      })
}, [])

useEffect(()=>{
}, [translationPathString])

const getLanguageSource = (texto, lan) =>  {
  axios.post(`https://libretranslate.de/detect`, {
            q: texto
        })
        .then((response) => {
            console.log(response.data[0].language);
            lan = response.data[0].language;
            console.log("getLang triggered")
        })
}

const handleInputs  = () =>{
  getTranslationPath();
  brokenTranslation(steps, inputs);
}

const helperFunction = () =>{
  let array = [];
  for(let i = 0 ; i<14 ; i++){
    let rand = Math.floor(Math.random()*17);
    array.push(rand);
  }
  console.log(array)
}

const tempTranslate = (texto, lan) => {
  let data = {
    q: texto,
    source: lan,
    target: 'es'
  }
  axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setOutputs(response.data.translatedText)
        })
}

const codesArray = [
  {0 : ['en', 'fr', 'it', 'pt', 'es']},
  {1 : ['de', 'id', 'vi']},
  {2 : ['hi', 'ga', 'pl', 'ru','tr']},
  {3 : ['ar', 'zh', 'ja', 'ko']}
];

const codesKeys = {
  'fr' : 'francés', 'it' : 'italiano',
  'pt' : 'portugues', 'en' : 'ingles',
  'es' : 'español',
  'de' : 'alemán', 'vi' : 'vietnames',
  'id' : 'indonesio', 'hi' : 'hindi',
  'ga' : 'irlandes', 'pl' : 'polaco',
  'ru' : 'ruso', 'tr' : 'turco',
  'ar' : 'árabe',
  'zh' : 'chino', 'ja' : 'japonés',
  'ko' : 'koreano'
}

const handleFileChange = e => {
}

const brokenTranslation = async (steps, texto) =>{
  let foo = texto;
  console.log(offsetTranslationPath);
  console.log(translationPath);
  for (let i = 0 ; i<=steps ; i++){
    let data = {
      'q' : texto,
      'source' : languagesList[offsetTranslationPath[i]].code, 
      'target' : languagesList[translationPath[i]].code
    }
    await axios.post(`https://translate.mentality.rip/translate`, data)
    .then ((response)=>{
      foo = response.data.translatedText;
      setOutputs(foo);
      texto = foo;
    })
    setTimeout(()=>{
    }, 100);
  }
}


  return (
    <div className="App">
      <div className="col">
        <header className="App-header">
          <div className="row">
          <div className="col">
            <h1>
            hola mensas :)
          </h1>
          </div>
          <div className="col">
          <img src={logo} />
          </div>
          </div>

          <br/>
        <br/>
        <InputBlock setter={setInputs} handle={handleInputs}/>
        <br/>
        <StepsCounterInput handle={handleSteps}/>
        <br/>
        <div className="row row-outputs">
          <div className="Outputs col">
            <p>
              {inputs}
            </p>
          </div>
          <div className="Outputs col">
            <p>
              {outputs}
            </p>
          </div>
          
        </div>
        <br/>
        <div className="div-chiquito-xd">
          <p>
           {translationPathString}
         </p>
        </div>
        <br/>
        </header>
        <div>
         
        </div>
      </div>
    </div>
  );
}

export default App;
