import React, { useState,useEffect } from 'react';
import axios from "axios"
import Editable from "./editable.jsx"


import './App.css';

const GETURL  = "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
const MAX_VALUE = 1000

const  CounterValue = ({value})=>{

return (


  <p> 

  Counter value :  
<span>{value}</span>
  
  </p>


)


}


const Spinner = ()=>{

  return (

    <span>
    spin..
    </span>
  )
}
const Loader  = ()=>{

  return (

    <div>
       <Spinner/>
      <span>
        Saving...
      </span>
    </div>
  )
}


const Display = ({onChange,value})=>{


  return(

    <Editable onChange={onChange}>

      <span class="display  editable">{value}</span>

    </Editable>
  )
}
const CounterCore = ({counterValue, decreaseCount,increaseCount,onChange})=>{


  return(

    <div class="flex space">

    <button onClick={decreaseCount}  class="decrease" > - </button>

    <Display value={counterValue} onChange={onChange}/>


    <button onClick={increaseCount} class="increase"> +</button>

    </div>
  )
}

function App(){
const [value, setValue] = useState(1) 




useEffect(()=>{

 axios.get(GETURL)
  .then(function (response) {
   
    if(response.data){
      setValue(parseInt(response.data) )  ;
    }

    
  })
  .catch(function (error) {
    // error handling
    console.log(error);
  })

  document.querySelector('.editable').onkeypress = (e)=>{
    if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
}
  
},[])

const handleIncreaseCount =()=>{
  if(value<MAX_VALUE)
 setValue(value+1) ;
}
const handleDecreaseCount =()=>{
  if(value>0)
  setValue(value-1) ;
  
}
const handleOnChange = (x)=>{
  
  if(parseInt(x) <=MAX_VALUE)
setValue(parseInt(x) )
else if(parseInt(x)  > MAX_VALUE ){
  setValue(MAX_VALUE) 
}


}


  return (
   
    <div class="center w-100 ">
    
    
      <main class="">

      <Loader/>

      <CounterCore 
        counterValue={value}
        decreaseCount={handleDecreaseCount}
       increaseCount={handleIncreaseCount}
       onChange={handleOnChange}
      />

      <CounterValue value={value}/>

     </main>
    </div>
  );
}

export default App;