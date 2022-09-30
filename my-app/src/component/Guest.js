import AnimalsData from './AnimalsData';
import React from 'react';
import {useState} from 'react';

export default function Guest(props){
  const [show, setShow] = useState(false);
  const element = props.group.map(element => {
    return <img src={AnimalsData[element]} class="" alt="..." />
  });

  function okLol(){
    setShow(!show)
    setTimeout(() => {
      setShow(false)
    }, 1000);
  }
 return (
  <div>
    <button className="btn-animals" onClick={okLol} >
    <div className="shadow color-icon rounded-4 m-3 link buzz-out-on-hover " style={{backgroundColor:props.color}}>
    {show && element}
    </div>
    
    </button>
  </div>
 );
}