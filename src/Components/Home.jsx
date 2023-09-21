import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import productList from "../productList.jsx";
import ProductCard from './ProductCard.jsx';

const Home = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const addToCartHandler = (options) => {
        dispatch(
          {
            type: "addToCart",
            payload: options
          }
        );
          dispatch({ type: "calculatePrice" });
          toast.success("Added To Cart.");
    };

  return (
    <>
      <div className='home'>
        {
          productList.map((i) => {
            const cartItem = cartItems.find((item) => item.id === i.id);
              return (
                <ProductCard
                    key={i.id}
                    imgSrc={i.imgSrc}
                    name={i.name}
                    price={i.price}
                    id={i.id}
                    handler={addToCartHandler}
                    item_quantity={i.item_quantity}
                    cartItem={cartItem}
                  />
              );
          })
        }
      </div>
    </>
  );
};

export default Home;

