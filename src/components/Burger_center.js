import React , {useState,useEffect} from 'react';
import {useSpring , animated,config} from 'react-spring';
import Modal from 'react-modal';
import Meal_Menu from './Meal_Menu';
import SandwichIngridients from './SandwichIngridients';
import {BrowserRouter as Router, Switch, Route, Link}from 'react-router-dom';

Modal.setAppElement('#root');


 function Burger_center(props) {
     
    
    //state pentru modal
        const [modalIsOpen,setOpenModal] = useState(false);
        function openModal() {
            setOpenModal(true);
        }
        function afterOpenModal() {
            // references are now sync'd and can be accessed.
            //subtitle.style.color = '#f00';
        }
        
        function closeModal(){
            setOpenModal(false);
        }

     //springuri pt animate de completare meal
    const [toggle , setToggle ] = useState(false);
    const [isReadyForOrder , setisReadyForOrder ] = useState(false);
    const [isPosAbsolute , setisPosAbsolute ] = useState(false);
    const moveLeft = useSpring({
        marginRight: toggle ? '50vw' : '0vw',
        delay: toggle ? 0 : 150,
        //config: config.slow
    });
    const moveRight = useSpring({
        config: config.slow,
        marginLeft: isReadyForOrder ? '50vw' : '-50vw',
        delay: isReadyForOrder ? 0 : 150,
        //config: config.slow
    });
    
    const appearPlusButton = useSpring({
        display : toggle ? 'block' : 'none',
        opacity : toggle ? '1' : '0',
    });
    const appearText = useSpring({
        display : toggle ? 'block' : 'none',
        opacity : toggle ? '1' : '0',
        delay: toggle ? 200 : 0
    });
    const activateAnimation = () => {
        
        if(sandwichIngridients.length > 0){
            setisReadyForOrder(true);
            setToggle(false);
            props.activateAnimation(false);
            setTimeout(() => {
                setisPosAbsolute(true);
            }, 800);
            console.log(sandwichIngridients);
        }
        else {
            setisReadyForOrder(false);
            setToggle(!toggle);
            props.activateAnimation(!toggle);
        }
        //pentru arrow button burger top/bot
        if(sandwichIngridients.length > 0){
            if(isReadyForOrder === false){
                props.showArrowButton(false);
            }
            else props.showArrowButton(true);
        }
        else {
            if(toggle === false){
                props.showArrowButton(true);
            }
            else props.showArrowButton(false);
        }
       /*} if(toggle === false) {
            console.log('1');
            
            
        }
        else{
            if(sandwichIngridients.length > 0){
                //props.showArrowButton(true);
            }
            else {
                props.showArrowButton(false);
            }
            props.showArrowButton(false);
            console.log('3');
        }*/

    };
    //pentru aducere data from db
    //const [hasError, setErrors] = useState(false);
    const [ingrediente, setIngrediente] = useState([]);
    //folosim useefect inloc de didmount

    useEffect(() => {
        async function fetchData() {
          const res = await fetch("http://localhost:4000/getdata");
          const data = await res.json();
          setIngrediente(data);
          
        }
        fetchData();
      }, []);

    // acest use-effect adauga datele pentru burger top si botom
    useEffect(() => {         
    if (ingrediente.length) {
       addWrappIng();
     }
    },[ingrediente]);

    //ne trebuie  un var care sa tina minte ce ingredient am ales
    // fct generare id
    function createKey() {
        let newKey = 0;
        
        if(sandwichIngridients.length > 0) {
            console.log('ingrediente',sandwichIngridients)
            let keys = [];
            for(let i=0;i<sandwichIngridients.length;i++){
                console.log('keys',sandwichIngridients[i].key);
                keys.push(sandwichIngridients[i].key);
            }
            console.log('keys', keys);
            let maxKey = Math.max(...keys);
            console.log('max key',maxKey);
            //newKey = sandwichIngridients[sandwichIngridients.length-1].key + 1;
            newKey = maxKey + 1;
        }
        else {
            newKey = 0;
        }
        console.log('newkey:',newKey);
        return newKey;
        
    }
    const [sandwichIngridients, setsandwichIngridients] = useState([]);
    
    //var styleforNewIng = 0;
    function addIngridient(id,nume,tip,cantitate) {
        closeModal();
        //o sa mai adaugam si cantitatea
        let newKey = createKey();
        let newIngredient = {
            id: id,
            nume: nume,
            tip: tip,
            key: newKey,
            cantitate: cantitate
        }
        sandwichIngridients.push(newIngredient);
        console.log(sandwichIngridients[sandwichIngridients.length-1]);
        props.activateNewIngStyle(25);
        //console.log(sandwichIngridients);
    }
    
    function removeIng(key){
        let array = sandwichIngridients;
        var newarray = array.filter(function(item) {
            return item.key !== key;
          });
        setsandwichIngridients(newarray);
        props.deactivateNewIngStyle(25);
        //console.log(sandwichIngridients);
    }
    
    //const simpleArray = [ 1,2,3,4,5]
    //() => {setTimeout(() => { isReadyForOrder === true ? orderItBStyle : {}},2000)}
    const renderlink =() => {
        if(isPosAbsolute === true) {
            if(allIngredients == '' && ableToCombineIng === false) {
                combineWrapANDIng();
                setableToCombineIng(false);
            }
            else if(ableToCombineIng != '' && ableToCombineIng === true ){
                setallIngredients([]);
                combineWrapANDIng();
            }
            return <Link to={{pathname: "/order" , data: allIngredients }}><button className='Buttonstyle' style={isPosAbsolute === true ? {transition: 'all 0.5s ease-in',right: '10vw'} : {transition: 'all 0.5s ease-in',right: '0vw'}} onClick={activateAnimation}>{sandwichIngridients.length > 0 ? "Order it!" : "Create yo' meal"}</button></Link>
        }
        else{
            return <button className='Buttonstyle' style={isPosAbsolute === true ? {transition: 'all 0.5s ease-in',right: '10vw'} : {transition: 'all 0.5s ease-in',right: '0vw'}} onClick={activateAnimation}>{sandwichIngridients.length > 0 ? "Order it!" : "Create yo' meal"}</button>
        }
    }
    //cream u state unde sa avem toate ingredientele inclunzand bun top so bot
    const [allIngredients,setallIngredients] = useState([]);
    // pentru burger top so bottom
    const [ingWrap,setingWrap] = useState([]);
    function addWrappIng() {
        let array = ingrediente;
        var newarray = array.filter(function(item) {
            return item.wrapper !== 'nu';
          });
        //console.log(newarray);
        props.setingredienteWrap(newarray);
        setingWrap(newarray);
    }


    //ca sa combinam cele doua array-uri avem nevoie de numarul la care suntem
    const [ableToCombineIng,setableToCombineIng] = useState(false);

    function combineWrapANDIng(){
        let top = props.NrTopIngWrap;
        let bot = props.NrBotIngWrap;
        if(ingWrap.length > 0) {
            //console.log(ingWrap[0].id);
            let newKey = createKey();
            let newIngredient1 = {
                id: ingWrap[top].id,
                nume: ingWrap[top].nume,
                tip: ingWrap[top].tip,
                key: newKey,
                cantitate: 'normala'
            }
            let newIngredient2 = {
                id: ingWrap[bot].id,
                nume: ingWrap[bot].nume,
                tip: ingWrap[bot].tip,
                key: newKey,
                cantitate: 'normala'
            }
            if(isPosAbsolute)
            {
                allIngredients.unshift(newIngredient1);
                allIngredients.push.apply(allIngredients, sandwichIngridients);
                allIngredients.push(newIngredient2);
            }
            setableToCombineIng(false);
            //sandwichIngridients.unshift(newIngredient);
        }
        console.log('all ingredients:')
        console.log(allIngredients);
    }
    return (
            <>
            <div style={centerThings}>
                <animated.div style={isReadyForOrder === true ? moveRight : moveLeft} className='OrderItDiv'> 
                    <animated.p style={isPosAbsolute === true ? {display: 'block',marginTop: '-50px',position:'relative',cursor: 'pointer'} : {display: 'none'} } onClick={() => {setisReadyForOrder(false);setToggle(true);setisPosAbsolute(false);props.activateAnimation(true);setableToCombineIng(true);props.showArrowButton(true);}}>Go back</animated.p>
                    {renderlink()}
                    {/*<animated.p style={appearText}>custom sandwich</animated.p>*/}
                    <p style={toggle === true ? {display: 'block',marginLeft: '150px',position:'absolute',cursor: 'pointer'} : {display: 'none'} }>custom sandwich</p>
                    <p style={isPosAbsolute === true ? {display: 'block',marginLeft: '150px',position:'absolute',cursor: 'pointer'} : {display: 'none'} }>custom sandwich</p>
                </animated.div>
                <div style={isPosAbsolute === true ? {transition: 'all 0.2s ease-out',height: '0px'}:{transition: 'all 0.2s ease-in',height:'100px'}}>

                </div>
                <animated.button className='Plusbutton' style={appearPlusButton} onClick={openModal}><img src={require('../imgs/plus-sign.svg') } style={{height: '40px'}} /></animated.button>
            </div>
            <div style={{margin : '10px'}}>
                <SandwichIngridients sandwichIngridients={sandwichIngridients} setsandwichIngridients={setsandwichIngridients} removeIng={removeIng} isReadyForOrder={isReadyForOrder}/>
            </div>
            <div>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                >
                    <Meal_Menu ingrediente={ingrediente} closeModal={closeModal} addIngridient={addIngridient}/>
                </Modal>
            </div>
            </>
    )
}
    const orderItBStyle ={
        position: 'absolute',
        top: '25vh',
        right: '10vw',
        transition: 'all 0.5s ease-in',
    }
    const centerThings ={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px'
    }
    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(19,19,19,0.8)',
        },
        content : {
            height:'80vh',
            width: '70vw',
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            backgroundColor : '#191919',
            color: 'white'
          }
        
      };
export default Burger_center;