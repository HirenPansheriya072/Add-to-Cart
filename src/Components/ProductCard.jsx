import React from 'react';

const sold_out = "https://media.istockphoto.com/id/1019461088/vector/sold-out-red-square-grunge-stamp-on-white.jpg?s=612x612&w=0&k=20&c=Q1funtaP0CzqKKU_Okp6QQXGP79-X_cNAYd7trlR5-s=";

const ProductCard = ({ name, id, price, handler, imgSrc, item_quantity, cartItem }) => {
  return (
    <>
        {cartItem && cartItem.quantity === item_quantity ? (
          <div className='productCard' style={{ height: "20rem", }} >
            <img src={sold_out} alt="sold out" style={{ width: "100%", height: "auto", marginTop: "5rem", }} />
          </div>
        ) : (
          <div className='productCard'>
              <img src={imgSrc} alt={name} />
              <p>{name}</p>
              <h4>₹{price}</h4>
                <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
                      Add to Cart
                </button>
          </div>
        )}
    </>
  );
};

export default ProductCard;
