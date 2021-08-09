import React ,{useState} from 'react';
import {useSpring , animated} from 'react-spring';

 function Burger_bottom(props) {
    const moveDown = useSpring({
        marginTop:  props.activate ? '15vh' : '0vh',
        delay : 100
    })
    //style={styleForIngAdd}
    const [isHover,setisHover] = useState(false);
    const arrowright = '>';
    const arrowleft = '<';

    const [wrapperNumber, setwrapperNumber] = useState(0);

    function increaseWpNr() {
        if(wrapperNumber == props.ingWrapper.length -1) {
            setwrapperNumber(0);
            props.updateNrIng('bot',0);
        }
        else {
            setwrapperNumber(prevNr => prevNr + 1);
            props.updateNrIng('bot',wrapperNumber + 1);
        }
        console.log(wrapperNumber);
    }
    function decreaseWpNr() {
        if(wrapperNumber == 0) {
            setwrapperNumber(props.ingWrapper.length);
            props.updateNrIng('bot',props.ingWrapper.length - 1);
        }
        setwrapperNumber(prevNr => prevNr - 1);
        console.log(wrapperNumber);
        //props.updateNrIng('bot',wrapperNumber - 1);
    }
    const item = () =>{
        //console.log(props.ingWrapper)
        if(props.ingWrapper.length > 0) {
            return  props.ingWrapper[wrapperNumber].tip
        }
        else return 'paine_burger' 
    }

    return (
        <div style={{display: 'flex' ,flexDirection: 'row',justifyContent: 'center'}} onMouseEnter={() => setisHover(true)} onMouseLeave={() => setisHover(false)}>           
                <animated.div style={moveDown} className='styleBun'>
                    <button style={isHover===true && props.showArrowButton === true ?  buttonStyleOn: buttonStyleOf} onClick={() => decreaseWpNr()}>{arrowleft}</button> 
                    <img src={require(`../imgs/${item()}_bot.svg`)} style={{height: '45px'}} alt="React Logo" />
                    <button style={isHover===true && props.showArrowButton === true ? buttonStyleOn: buttonStyleOf} onClick={() => increaseWpNr()}>{arrowright}</button>
                </animated.div>
        </div>
    )
    
}
const buttonStyleOn={
    background: 'none',
    color: 'white',
    border: 'none',
    fontSize: '21px',
    opacity: 1,
    transition: 'all 0.3s ease-in-out'
}
const buttonStyleOf={
    background: 'none',
    color: 'white',
    border: 'none',
    fontSize: '21px',
    opacity: 0,
    transition: 'all 0.3s ease-in-out'
}
export default Burger_bottom;