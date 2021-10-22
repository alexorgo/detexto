import './App.css';
//import axios from 'axios';
import InputBlock from './componentas/InputComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect, useState } from 'react';
import StepsCounterInput from './componentas/StepsCounter';
import logo from './media/alien-dance.gif';

function App() {

  const [outputs, setOutputs] = useState('output shows here');
  const [inputs, setInputs] = useState('input shows here');
  const [translationPathString, setTranslationPathString] = useState('');
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
var subscriptionKey = "6cb32ea2ff4e42958f4a02addbe949e6";
var endpoint = "https://api.cognitive.microsofttranslator.com";
var location = "southcentralus";
var foobar; 

useEffect(()=>{
  console.log(outputs);
}, [outputs])

useEffect(()=>{
  console.log(translationPathString);
}, [translationPathString])

function getTranslationPath(){
  let pathArray = [];
  let offsetPathArray = [];
  offsetPathArray.push('');
  for(let i = 0; i<steps ; i++){
    let rand = Math.floor(Math.random()*4);
    let pathElement = codesArray[rand][rand][Math.floor(Math.random()*codesArray[rand][rand].length)]
    pathArray.push(pathElement);
    offsetPathArray.push(pathElement);
  }
  pathArray.push('es');
  translationPath = pathArray;
  offsetTranslationPath = offsetPathArray;
  let tempPathString = 'translation path: '
  for(let i = 0 ; i<translationPath.length-1 ; i++){
    tempPathString = tempPathString + codesKeys[translationPath[i]] + " → ";
  }
  tempPathString = tempPathString + "español";
  setTranslationPathString(tempPathString);
}

const handleInputs = (inputText) =>{
  if(inputText == '') {
    console.log('big cacas es _');
  }
  else
    {setInputs(inputText);}
  console.log("le vengo manejando "+inputText);
  getTranslationPath();
  //TriggerTranslation(inputText, foobar);
  detextoTranslation(steps, inputs, foobar);
}

const codesArray = [
  {0 : ['da', 'nl', 'fr', 'it', 'nb', 'pt', 'ro', 'es', 'sv']},
  {1 : ['de', 'ht', 'id', 'ms', 'sw']},
  {2 : ['sq', 'am', 'hy', 'az','bg', 'cs', 'prs', 'et', 'fi', 'ka', 'hi', 'hu', 'kk', 'km', 'lo', 'sl', 'te'
]},
  {3 : ['ar', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'yua', 'tlh-Latn', 'tlh-Piqd']}
];

const codesKeys = {
  'da' : 'danés', 'nl' : 'holandés',
  'fr' : 'francés', 'it' : 'italiano', 'nb' : 'noruego',
  'pt' : 'portugues', 'ro' : 'rumano',
  'es' : 'español', 'sv' : 'sueco',
  'de' : 'alemán', 'ht' : 'creole haitiano',
  'id' : 'indonesio', 'ms' : 'malayo',
  'sw' : 'swahili', 'sq' : 'albania',
  'am' : 'amárico', 'hy' : 'armenio',
  'az' : 'azerbaiyán', 'bg' : 'búlgaro',
  'cs' : 'checo', 'prs': 'persa, dari',
  'et' : 'estonia', 'fi' : 'finlandés',
  'ka' : 'georgiano', 'hi' : 'hindi',
  'hu' : 'húngaro', 'kk' : 'kazajstán',
  'km' : 'khmer', 'lo' : 'lao',
  'sl' : 'esloveno', 'te' : 'telgu',
  'ar' : 'árabe', 'zh-Hans' : 'chino simplificado',
  'zh-Hant' : 'chino tradicional', 'ja' : 'japonés',
  'ko' : 'koreano', 'yua' : 'maya yucateco',
  'tlh-Latn' : 'klingon', 'tlh-Piqd' : 'klingon (plqaD)'
}

const handleFileChange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () =>{
    fileName = file.name;
    getTranslationPath();
    fileContent = reader.result;
    console.log(fileName, fileContent+" /// ");
    console.log(typeof fileContent);
    detextoTranslation(steps, fileContent, foobar);
    setInputs(fileContent);
  }
  reader.onabort = () =>{
    console.log("sede rrumbo");
  }
  reader.onerror = () =>{
    console.log('file error', reader.error);
  }
}

const detextoTranslation = async (steps, texto, foo) => {
  for (let i = 0 ; i <= steps ; i++){
    await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: {
          'api-version': '3.0',
          'from': [offsetTranslationPath[i]],
          'to': [translationPath[i]]
      },
      data: [{
          'text': texto
      }],
      responseType: 'json'
  }).then(function(response){
      console.log(JSON.stringify(response.data, null, 1));
      foo = JSON.parse(JSON.stringify(response));
      foo = foo.data[0].translations[0].text;
      console.log(foo);
      setOutputs(foo);
      texto = foo;
  })
}
}

const TriggerTranslation = (texto, foo) =>{
  try {
      axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: {
          'api-version': '3.0',
          //'from': 'en',
          'to': 'es'
      },
      data: [{
          'text': texto
      }],
      responseType: 'json'
  }).then(function(response){
      console.log(JSON.stringify(response.data, null, 1));
      foo = JSON.parse(JSON.stringify(response));
      foo = foo.data[0].translations[0].text;
      console.log(foo);
      setOutputs(foo);
      console.log(outputs);
      
  })
  } catch (err){
    console.error(err);
  }
}

  return (
    <div className="App">
      <div className="col">
        <header className="App-header">
          <div className="row">
          <div className="col">
            <h1>
            hola mensas
          </h1>
          </div>
          <div className="col">
          <img src={logo} />
          </div>
          </div>

          <br/>
          <input type="file" onChange={handleFileChange}></input>
        <br/>
        <InputBlock handle={handleInputs}/>
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
