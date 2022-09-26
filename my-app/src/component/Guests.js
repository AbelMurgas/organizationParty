import data from '../data/groupsInfo.json';
import OrganizationParty from '../OrganizationParty';
import Guest from './Guest';
import React from 'react';
import {useEffect, useState} from 'react';


export default function Guests(){
 const [components, setNum] = useState(0);

  useEffect(() => {
    const newInstance = new OrganizationParty(data);
    const rules = newInstance.getInformationEachPerson()
    function generateComponent(rules) {
      setNum(rules.map(person => {
       return <Guest key={person.name} {...person}/>
      }));
    }
    generateComponent(rules);
  }, []);
  
 return (
  <div className="container d-flex flex-wrap mt-5 justify-content-center align-items-center">
   {components}
  </div>
 );
}