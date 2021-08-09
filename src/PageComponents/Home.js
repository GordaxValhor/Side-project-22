import React from 'react'
import Burger_thing from '../components/Burger_thing';

function Home(props) {
  const right = '>';
  const left = '<';
    return (
        <div className="App-body">
          {/*<h2 style={{display: 'block',position: 'absolute',top: '12vh',left:'50%',transform: 'translate(-50%)'}}>Aici poti sa iti creezi sandwichurile exact cum vrei!</h2>
          <h3 style={{display: 'block',position: 'absolute',top: '16vh',left:'50%',transform: 'translate(-50%)',backgroundColor: '#752921'}}>Alege-ti ingredientele preferate si comanda rapid.</h3>*/}
          <button>{left}</button>
            {/*aici o sa avem si rauterul ca sa avem linkuri spre tot si toate :))) */}
            {/* deci aici o sa fie cam toata magia
              -in primul rand toate partile burgarului o sa fie react components
             */}
              <Burger_thing getData={props.getData}/>
          <button>{right}</button> 
        </div>
    )
}

export default Home
