import AnimalsData from "./AnimalsData";
export default function Canvas(props){
 const groups = props.group.map(person => {
  return <img src={AnimalsData[person]} class="" alt="..." />
 })
 return (
  <div className="offcanvas offcanvas-bottom" tabIndex="-1" id={`offcanvasBottom${props.name}`} aria-labelledby={`offcanvasBottom${props.name}`} style={{backgroundColor:props.color}} >
   <div className='container' >
     <button type="button" className="btn-close mt-2 " data-bs-dismiss="offcanvas" aria-label="Close"></button>
     <div className="offcanvas-body" >
      <div className="card" >
       <div className="row g-0">
         <div className="col-md-4">
           <div className="d-flex flex-column align-items-center justify-content-center">
           <img src={props.image} className="img-fluid rounded-start canvas-principal-img" alt="..." />
            {props.name}
           </div>
         </div>
         <div className="col-md-8 " >
             {groups}
         </div>
       </div>
      </div>
     </div>
    </div>
  </div>
 );
} 