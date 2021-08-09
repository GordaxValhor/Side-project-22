import React from 'react';
import { useForm } from "react-hook-form";
    
function FormIngredientMenu(props) {
    const {register , handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data.nume);
        props.addIngridient(data.id,data.nume,data.tip,data.cantitate);
    }
    return (
       
            <form onSubmit={handleSubmit(onSubmit)}>
                                <select style={SelectStyle} name="cantitate" ref={register}>
                                    <option value="Mica">Mica</option>
                                    <option value="Mare">Mare</option>
                                    <option value="Super Mare">Super Mare</option>
                                </select>
                                <p>*(Mica: aprox 50g,Mare: aprox 100g, Super Mare: aprox 150g)</p>
                                <input type='hidden' name="id" value={props.id} ref={register} ></input>
                                <input type='hidden' name="nume" value={props.nume} ref={register}></input>
                                <input type='hidden' name="tip" value={props.tip} ref={register}></input>
                                <input className="BottonSubmitIng" type="submit" value='Adauga'/>
            </form>
        
    )
}
const SelectStyle = {
    backgroundColor: '#191919',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid white',
}
export default FormIngredientMenu
