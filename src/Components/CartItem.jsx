import React from 'react';
import { AiFillDelete } from "react-icons/ai";



const CartItem = ({imgSrc, name, price, qty, decrement, increment, deleteHandler, id, maxQuantityReached }) => {


  return (
        <>
           
            <div className="cartItem">
                <img src={imgSrc} alt='Item' />
                <article>
                    <h3>{name}</h3>
                    <h3>₹{price}</h3>
                </article>

                <div>
                    <button onClick={() => decrement(id)}>-</button>
                        <p>{qty}</p>
                    <button onClick={() => increment(id)} disabled={ maxQuantityReached } style={maxQuantityReached ? { opacity: 0.5 } : {}} >+</button>
                </div>

                    <AiFillDelete onClick={() => deleteHandler(id)} />
            </div>
        
        </>
  );
};

export default CartItem;