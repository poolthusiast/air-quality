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
      
      var mainContainer = document.getElementById("myResult1");
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
      var mainContainer = document.getElementById("myResult2");
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

   function show_message(divID, messagetext) {
      let div1 = document.createElement("div");
      let mainContainer1 = document.getElementById(divID);
      mainContainer1.innerHTML = '';

      div1.innerText = messagetext;
      mainContainer1.appendChild(div1);   
   }

  const handleSubmit = event => {
    event.preventDefault();

    //error handling
    if (city1 === '') {
      //print error
      show_message("myerror1", "city #1 is blank");


      //blank results
      show_message("myResult1", "");


      show_message("myResult2", "");
 
      
      if (city2 === '') {
         show_message("myerror2", "city #2 is blank");
 
      }
      else {
         show_message("myerror2", "");

      }

      return;
    }
    else if (city2 === '') {
      //print error
      show_message("myerror2", "city #2 is blank");


      //blank results
      show_message("myResult1", "");


      show_message("myResult2", "");


      if (city1 === '') {
         show_message("myerror1", "city #1 is blank");

      }
      else {
         show_message("myerror1", "");

         
      }

      return;
    }
    else {
      show_message("myerror1", "");


      show_message("myerror2", "");

    }

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
    <h2>Air quality data between two US cities (CH4 PPM)</h2>
    <br />
    <form onSubmit={handleSubmit}>
    &nbsp;&nbsp;ex. Chicago, New York, Boston
    <br />
    City #1 : <Input placeholder='City' id="city1" name="city1" value={city1} onChange={event => setCity1(event.target.value)} />
    <div id="myerror1">
    </div>
    <br />
    City #2 : <Input placeholder='City' id="city2" name="city2" value={city2} onChange={event => setCity2(event.target.value)}/>
    <div id="myerror2">
    </div>
    <br />
    <br />
    <button type="submit">submit</button>
    </form>
    <br />
    <div id="myResult1">
    </div>
    <div id="myResult2">
    </div>

 
   </div>

  );
}

export default App;
