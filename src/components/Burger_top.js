import React,{useState} from 'react'
import {useSpring , animated} from 'react-spring';
 function Burger_top(props) {
    const moveUp = useSpring({
        marginBottom:  props.activate ? '15vh' : '0vh',
        delay : 100

    })
    const rotate90deg = useSpring({
        transform: props.activate  ? 'rotate(-90deg)' : 'rotate(0deg)',
        delay: props.activate  ? 0 : 150,
        //config: config.slow
    })
    const [isHover,setisHover] = useState(false);
    
    const arrowright = '>';
    const arrowleft = '<';

    const [wrapperNumber, setwrapperNumber] = useState(0);

    function increaseWpNr() {
        if(wrapperNumber == props.ingWrapper.length -1) {
            setwrapperNumber(0);
            props.updateNrIng('top',0);
        }
        else {
            setwrapperNumber(prevNr => prevNr + 1);
            props.updateNrIng('top',wrapperNumber + 1);
        }
        console.log(wrapperNumber);
        
    }
    function decreaseWpNr() {
        if(wrapperNumber == 0) {
            setwrapperNumber(props.ingWrapper.length);
            props.updateNrIng('top',props.ingWrapper.length - 1);
        }
        setwrapperNumber(prevNr => prevNr - 1)
        console.log(wrapperNumber);
        //props.updateNrIng('top',wrapperNumber - 1);
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
            
                <animated.div style={moveUp} className='rotate styleBun'>
                    <button style={isHover===true && props.showArrowButton === true ?  buttonStyleOn: buttonStyleOf} onClick={() => decreaseWpNr()}>{arrowleft}</button>
                    <img src={require(`../imgs/${item()}_top.svg`)} style={{height: '80px'}} alt="" />
                    {/*<img src={require(`../imgs/paine_submarin_top.svg`)} style={{height: '80px'}}alt="React Logo" />*/}
                    <button style={isHover===true && props.showArrowButton=== true ?  buttonStyleOn: buttonStyleOf} onClick={() => increaseWpNr()}>{arrowright}</button>
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
    transition: 'all 0.3s ease-in-out',
    marginTop: '30px',
}
const buttonStyleOf={
    background: 'none',
    color: 'white',
    border: 'none',
    fontSize: '21px',
    opacity: 0,
    transition: 'all 0.3s ease-in-out',
    marginTop: '30px',
}
export default Burger_top;