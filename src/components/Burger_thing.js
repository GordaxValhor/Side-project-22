import React,{useState} from 'react'
import Burger_top from './Burger_top'
import Burger_center from "./Burger_center"
import Burger_bottom from './Burger_bottom'
 function Burger_thing(props) {
    const [active , setActive ] = useState(false);
    //togle pt animatile de burger top si bottom
    const activateAnimation = (toggle) => {
        setActive(toggle);
    }
    const newIngStyle = (nr) => {
        let newstate = nr + styleforNewIng
        setstyleforNewIng(newstate);
        console.log('active');
        console.log(styleforNewIng);
    }
    const unnewIngStyle = (nr) => {
        let newstate = styleforNewIng - nr;
        setstyleforNewIng(newstate);
        console.log('deactive');
        console.log(styleforNewIng);
    }

    const [styleforNewIng, setstyleforNewIng] = useState(0);

    // avem treaba cu ingrentientele care acopera sandwichiul bun top,bun bottom
    const [ingredienteWrap, setingredienteWrap] = useState([]);
    function addIngWrapp(data){
        setingredienteWrap(data);
    }
    const [NrTopIngredienteWrap, setNrTopIngredienteWrap] = useState(0);
    const [NrBotIngredienteWrap, setNrBotIngredienteWrap] = useState(0);

    const [isshowButton,issetshowButton] = useState(false);

    //fct pentru a updata numarul pt ing de wrap
    function updateNrIngWrap(care,nr){
        console.log("nr:");console.log(nr);
        if(care === 'top'){
            setNrTopIngredienteWrap(nr);
        }
        if(care === 'bot'){
            setNrBotIngredienteWrap(nr);
        }
    }
    console.log('data');
    console.log(ingredienteWrap);
    function showArrowButton(show){
        if(show === true){
            issetshowButton(true);
        }
        else issetshowButton(false);
    }
    return (
        <div className='Burger-thing'>
            <div>
                <Burger_top activate={active} ingWrapper={ingredienteWrap} updateNrIng={updateNrIngWrap} showArrowButton={isshowButton}/>
                <Burger_center activateAnimation={activateAnimation} activateNewIngStyle={newIngStyle} deactivateNewIngStyle={unnewIngStyle} 
                setingredienteWrap={addIngWrapp} NrTopIngWrap={NrTopIngredienteWrap} NrBotIngWrap={NrBotIngredienteWrap}   showArrowButton={showArrowButton}/>
                <Burger_bottom activate={active} styleIng={styleforNewIng} ingWrapper={ingredienteWrap} updateNrIng={updateNrIngWrap} showArrowButton={isshowButton}/>
            </div>
        </div>
    )
}
export default Burger_thing;