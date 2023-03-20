import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Input } from 'semantic-ui-react'
import {useState} from 'react';
import React from 'react';

function App() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  
   // Define recursive function to print nested values
   function printCity1Values(data) {
      
      var mainContainer = document.getElementById("myInner1");
      mainContainer.innerHTML = '';
      var div = document.createElement("div");

      for(var k in data) {
         if(data[k] instanceof Object) {
               printCity1Values(data[k]);
         } else {
               if (k === "value") {
                  div.innerText = city1 + " : " + data[k];
                  mainContainer.appendChild(div);                  

               }
         };

      };

   };

   // Define recursive function to print nested values
   function printCity2Values(data) {

      var div = document.createElement("div");
      var mainContainer = document.getElementById("myInner2");
      mainContainer.innerHTML = '';
      
      for(var k in data) {
         if(data[k] instanceof Object) {
               printCity2Values(data[k]);
         } else {
               if (k === "value") {
                  div.innerText = city2 + " : " + data[k];
                  mainContainer.appendChild(div);                  
               }
         };

   }

};

  const handleSubmit = event => {

    event.preventDefault();

    const city1url = 'https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=' + city1 + '&order_by=lastUpdated&dumpRaw=false';

    fetch(city1url)
    .then((response) => response.json())
    .then((response) => {
       printCity1Values(response);
    })
    .catch((err) => {
       console.log(err.message);
    });

    const city2url = 'https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=' + city2 + '&order_by=lastUpdated&dumpRaw=false';

    fetch(city2url)
    .then((response) => response.json())
    .then((response) => {
       printCity2Values(response);
    })
    .catch((err) => {
       console.log(err.message);
    });
 
   }

   
 

    
    return (
    <div id="myData">
    <h2>Air quality data between two cities (CH4 PPM)</h2>
    <br />
    <form onSubmit={handleSubmit}>
    City #1 : <Input placeholder='City 1' id="city1" name="city1" value={city1} onChange={event => setCity1(event.target.value)} />
    <br />
    City #2 : <Input placeholder='City 2' id="city2" name="city2" value={city2} onChange={event => setCity2(event.target.value)}/>
    <br />
    <br />
    <button type="submit">submit</button>
    </form>
    <br />
    <div id="myInner1">
    </div>
    <div id="myInner2">
    </div>

 
   </div>

  );
}

export default App;
