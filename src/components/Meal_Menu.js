import React , {useState,useInput} from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import FormIngredientMenu from './FormIngredientMenu';

function Meal_Menu(props) {

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
     //adugare ingrediente
     //------
    //pentru deschiderea modalurilor cu ingrediente
    const [whatModal,setwhatModal] = useState('');
    function openIngModal(str) {
        setwhatModal(str);
        openModal();
    }
    //pentru faza cu cantitate
    //const [cantitate,setcantitate] = useState('Mica');
    const {register , handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    }
    /*const handleForm = (evt) => {
        evt.preventDefault();
        console.log(`Aratane : ${id}, ${nume},${tip}`);
    }*/
    return (
        <div style={customStyle}>
            <form style={formStyle}> 
                <input style={inputStyle} placeholder='Cauta ingrediente, sandwichuri si multe altele'/>
                <button>Search mate!!</button>
            </form>
            <h3>Alege:</h3>
            <div style={buttonsTableStyle}>
                <button style={buttonTableStyle} onClick={() => openIngModal('carne')}>Carne</button>
                <button style={buttonTableStyle} onClick={() => openIngModal('paine')}>Paine</button>
                <button style={buttonTableStyle} onClick={() => openIngModal('sos')}>Sosuri</button>
                <button style={buttonTableStyle} onClick={() => openIngModal('muraturi')}>Muraturi</button>
                <button style={buttonTableStyle} onClick={() => openIngModal('branza')}>Branzeturi</button>
                <button style={buttonTableStyle} onClick={() => openIngModal('cartofi')}>Cartofi</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                >   
                    <div className='ModalIng'>
                    <h3>Ingrediente de tip {whatModal}:</h3>
                    <button  onClick={closeModal} style={buttonStyle}><img src={require('../imgs/plus-sign.svg') } style={{height: '40px'}} /></button>
                    <ul>{
                    props.ingrediente.filter(function(ingredient){
                        return ingredient.tip.includes(whatModal);
                    }).map((ingredient,index) => (
                        
                        <li key={index}>
                            <p style={{fontSize: '18px',fontWeight: 'bold'}}>{index +1} - {ingredient.nume}:</p>
                            <p>{ingredient.descriere}</p>
                            <p>Ce cantitate doresti:</p>
                            <FormIngredientMenu id={ingredient.id} nume={ingredient.nume} tip={ingredient.tip} addIngridient={props.addIngridient}/>
                            
                        </li>
                        
                        
                        
                    ))}</ul>
                    </div>
                    {/*{props.ingrediente.map((ingredient,index) => (
                        <li key={index}>
                            <p>Nume: {ingredient.nume}</p>
                            <p>Desc: {ingredient.descriere}</p>
                            <button onClick={ () => props.addIngridient(ingredient.id,ingredient.nume,ingredient.tip)}>Adauga</button>
                        </li>
                    ))}</ul>*/}
            </Modal>
            <br></br>
            <div>
                <p>Premade sandwich:</p>
                <div style={{display: 'flex' ,flexDirection:'row',width:'700px',justifyContent: 'space-between'}}>
                    <div style={{height:'200px',width:'140px',border:'1px solid white'}}>
                    </div>
                    <div style={{height:'200px',width:'140px',border:'1px solid white'}}>
                    </div>
                    <div style={{height:'200px',width:'140px',border:'1px solid white'}}>
                    </div>
                </div>
            </div>      
            <button  onClick={props.closeModal} style={buttonStyle}><img src={require('../imgs/plus-sign.svg') } style={{height: '40px'}} /></button>
        </div>
    )
}
const customStyle ={
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
}
const formStyle ={
    width: '80%',   
}
const inputStyle = {
    width: '80%',
    background: '#191919',
    color: 'white',
    height :'20px', 
    border: '1px  solid white',
    margin: '5px',
    padding: '5px',
    borderRadius: '5px',
}
const buttonStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    outline: 'none',
    background: 'transparent',
    border : 'none',
    transform : 'rotate(45deg)',
    width: '40px',
    cursor: 'pointer'
}
const buttonsTableStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap:'wrap',
    width: '300px',
   
    
}
const buttonTableStyle = {
    background: 'none',
    color: 'white',
    padding: '10px',
    border: '1px solid white',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px',
}
const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(19,19,19,0.8)',
    },
    content : {
        height:'85vh',
        width: '35vw',
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
export default Meal_Menu
