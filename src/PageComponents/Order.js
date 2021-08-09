import React from 'react'

function Order(props) {
    
    const showOrder = () =>{
        if(props.location.data) {
            return (
                <div>
                <p>Ce contine sandwichul tau:</p>
                {props.location.data.map((ingredient,index) => (
                    <div key={index}>
                        <p>{ingredient.nume} - cantitate: {ingredient.cantitate}</p>
                    </div>
                ))}
                </div>
                )
        } 
        else {
            return (
                <p>Se pare ca nu ati comandat nimic. :-( </p>
            )
        }
    }
    return(
        <div>
            <h1>Your order chump!</h1>
            
            {showOrder()}
        </div>
    )
}

export default Order
