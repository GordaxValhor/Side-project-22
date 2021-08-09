import React,{useState} from 'react';
import {useSpring , animated,config} from 'react-spring';
import {Link} from 'react-router-dom';
function Menu() {
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
        <>
            <div className='menu-style'>
                <animated.div onClick={activateAnimation} style={moveUp} >
                    <img src={require('../imgs/icon-menu.svg')} style={{cursor:'pointer'}}></img>
                </animated.div>
                <animated.ul className='menu-style-open' style={moveDown}>
                    <li style={{fontSize: '16px'}}>Menu</li>
                    <hr></hr>
                    <Link to='/about'>
                    <li>About us</li>
                    </Link>
                    <li>More</li>
                    <li>Contact</li>
                    <li>More Info</li>
                    <hr></hr>
                    <li onClick={activateAnimation} style={{opacity: '0.5',fontSize: '12px',cursor:'pointer'}}>Hide</li>
                </animated.ul>
            </div>
        </>
    )
}

export default Menu;
