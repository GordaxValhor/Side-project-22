import React , {useState} from 'react';
import {useSpring , animated,config} from 'react-spring';
function LogIn() {
    const [toggle , setToggle ] = useState(false);
    const moveDown = useSpring({
        config: config.stiff,
        config: {duration : 400},
        marginTop: toggle ? '0vh' : '-20vh',
        //config: config.slow
    })
    const moveUp = useSpring({
        config: config.stiff,
        config: {duration : 400},
        marginTop: toggle ? '-20vh' : '0vh',
        //config: config.slow
    })
    const activateAnimation = () => {
        setToggle(!toggle);
        //props.activateAnimation(!toggle);
    }
    return (
        <div>
            <div className='login-style'>
                <animated.div onClick={activateAnimation} style={moveUp} >
                    <img src={require('../imgs/login-icon.svg')}></img>
                </animated.div>
                <animated.ul className='login-style-open' style={moveDown}>
                        <li style={{fontSize: '16px'}}>Log in</li>
                        <form>
                            <input style={{width: '100px',border: 'none'}}></input>
                        </form>
                        <hr></hr>
                        <li onClick={activateAnimation} style={{opacity: '0.5',fontSize: '12px',cursor:'pointer'}}>Hide</li>
                </animated.ul>
            </div>
        </div>
    )
}

export default LogIn;
