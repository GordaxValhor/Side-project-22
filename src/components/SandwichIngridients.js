import React ,{useState,useRef} from 'react';
import {useTransition,useSpring, animated} from 'react-spring';


function SandwichIngridients(props_uri) {
    //console.log(props.sandwichIngridients);
    //treaba ca sa avem show more cand hover peste ingredient
    //tre sa avem o conditie pt order ready
    const [isHover, setIsHover] = useState(false);
    const [isId, setId] = useState();
    function getStyle(id,show) {
        if(props_uri.isReadyForOrder === false){
        setIsHover(show);
        setId(id);
        }
    }
    const [isHoverInfo, setIsHoverInfo] = useState(false);
    const [isIdInfo, setIdInfo] = useState();
    function getStyleInfo(id,show) {
        if(props_uri.isReadyForOrder === false){
        setIsHoverInfo(show);
        setIdInfo(id);
        }
    }
    const transitions = useTransition(props_uri.sandwichIngridients, items => items.key,{
        from: { opacity: 0 , marginRight: '-300px' },
        enter: { opacity: 1 ,marginRight: '0px' },
        leave:{ opacity: 0 ,marginRight:'-300px'},
        })


    //for drag and drop


    const [dragging,setdragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) =>{
        console.log('draging');
        console.log(params.index);
        dragItem.current = params.index;
        dragNode.current = e.target;

        dragNode.current.addEventListener('dragend',handleDragEnd)
        setTimeout(()=>{
            setdragging(true);
        }, 0);
        
    }
    const handleDragEnd = () =>{
        console.log('ending drag..');
        setdragging(false);
        dragNode.current.removeEventListener('dragend',handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleDragEnter = (e,params) =>{
        const currentItem = dragItem.current;
        if ( e.target === dragNode.current){
            console.log('same',params.index);
        }
        else{
            console.log('not same',params.index);
            props_uri.setsandwichIngridients(oldList =>{
                let newList = JSON.parse(JSON.stringify(oldList));
                newList.splice(params.index, 0 ,newList.splice(currentItem.index,1)[0]);
                return newList
            })
        }
    }



    const styleDrag= (index) =>{
        const currentItemIndex = dragItem.current;
        if(currentItemIndex === index){
            return 'hide';
        }
    }

    function getImgSrc(item_tip){
        if(item_tip.split("_")[0] === 'paine'){
            let txt = `${item_tip}_bot.svg`
            return txt;
        }
        else {
            return `${(item_tip)}.svg`;
        }
    }
    
        return transitions.map(({ item, props, key},index) =>
            <animated.div  style={props} key={key} onMouseEnter={() => getStyle(item.key,true)} onMouseLeave={() => getStyle(item.key,false)}   draggable onDragStart={ (e) => {handleDragStart(e,{index})}} onDragEnter={dragging? (e)=> {handleDragEnter(e,{index})} : null} >
                       <div className={dragging? styleDrag(index) : 'show'}>
                        <img  className='ImgStyle' src={require(`../imgs/${getImgSrc(item.tip)}`)} alt=''></img>
                        <animated.button  className='buttonStyle' onClick={() => props_uri.removeIng(item.key)} style={(isHover === true && isId === item.key) ? {opacity:'1',transition: 'opacity .3s ease-in'} : {opacity:'0',transition: 'opacity .3s ease-in'}}><img src={require('../imgs/plus-sign.svg') } style={{height: '20px'}} /></animated.button>
                        <animated.div className='moreInfoStyleDiv' style={(isHover === true && isId === item.key) ? {opacity:'1',transition: 'opacity .3s ease-in'} : {opacity:'0',transition: 'opacity .3s ease-in'}}>
                            {/*<hr></hr>*/}
                            <img draggable src={require('../imgs/more_infoI.svg')} onMouseEnter={() => getStyleInfo(item.key,true)} onMouseLeave={() => getStyleInfo(item.key,false)}></img>
                            <div style={(isHoverInfo === true && isIdInfo === item.key) ? {opacity:'1',transition: 'opacity .3s ease-in',display:'block'} : {opacity:'0',transition: 'opacity .3s ease-in',display: 'none'}}>
                                <p>More info</p>
                                <hr></hr>
                                <p>{item.nume}</p>
                                <p>Cantitate: {item.cantitate}</p>
                                <p>Tip {item.tip.split("_")[0]} : {item.tip.split("_")[1]}</p>
                            </div>
                        </animated.div>
                        </div>
            </animated.div>
        )
}

export default SandwichIngridients
