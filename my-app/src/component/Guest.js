import AnimalsData from './AnimalsData';
import React from 'react';
import Canvas from './Canvas';

export default class Guest extends React.Component{

 constructor(props){
  super(props);
  console.log(props.group)

 }
 render(){return (
  <div>
    <button className="btn-animals" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasBottom${this.props.name}`} aria-controls={`offcanvasBottom${this.props.name}`}>
    <div className="person-icon rounded rainbow-background m-2 link buzz-out-on-hover">
      <img src={AnimalsData[this.props.name]} className="card-img-top"  alt="..."></img>
    </div>
    </button>
    <Canvas color= {this.props.color} name={this.props.name} id={this.props.id} image = {AnimalsData[this.props.name]} group = {this.props.group} />
  </div>
 );
}
}