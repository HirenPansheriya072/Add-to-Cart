import { createReducer } from "@reduxjs/toolkit";
import productList from "../productList";
import { toast } from 'react-hot-toast';


export const cartReducer = createReducer(
    {
        cartItems: [],
        subTotal: 0,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: 0,
        isSoldOut: false,
        selectedOffer: null,
        offerSelected: false,
    },
    {
        addToCart: (state, action) => {
            const item = action.payload;
            // console.log(item,"item");
            const isItemExist = state.cartItems.find((i) => i.id === item.id);
            const product = productList.find((p) => p.id === item.id);

            if(isItemExist){
                if(isItemExist.quantity < product.item_quantity){
                    state.cartItems.forEach((i) => {      
                        if(i.id === item.id) i.quantity += 1;
                    });
                }
            }else{
                state.cartItems.push(item);
            }
        },

        decrement: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if(item.quantity > 1){
                state.cartItems.forEach((i) => {
                    if(i.id === item.id) i.quantity -= 1;
                });
            }
            const product = productList.find((p) => p.id === item.id);
            if(item.quantity === product.item_quantity - 1){
                state.isSoldOut = false;
            }
        },

        deleteFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
            if(state.cartItems.length === 0) {
                state.selectedOffer = false
                state.offerSelected = null;
            }
        },

        calculatePrice: (state) => {
            let sum = 0;
            state.cartItems.forEach((i) => (sum += i.price * i.quantity));
            state.subTotal = sum;
            state.shipping = state.subTotal > 40000 ? 0 : 200;
                if (sum === 0) {
                    state.shipping = 0;
                }
        
                // let selectedOffer = '';
                // if(selectedOffer){
                //     if(sum >= 60000){
                //     state.selectedOffer = "offer2";
                //     }else if(sum >= 40000){
                //         state.selectedOffer = "offer1";
                //     }else{
                //         state.selectedOffer = null;
                //     }
                // }


            let discount = 0;
            let offerApplied = false;
            if (state.selectedOffer === "offer1" && sum >= 100000) {
                discount = +(sum * 0.1).toFixed(2);
                offerApplied = true;
            } else if (state.selectedOffer === "offer2" && sum >= 150000) {
                discount = +(sum * 0.2).toFixed(2);
                offerApplied = true;
            }
        
            if (state.selectedOffer && !offerApplied) {
                toast.success("Offer not applied");
            }
        
            state.discount = discount.toFixed(2);
            state.tax = +((state.subTotal - discount)* 0.18).toFixed(2);
            state.total = state.subTotal + state.shipping + state.tax - discount.toFixed(2);

        },

        selectOffer: (state, action) => {
            console.log("Selected :", action.payload);
            state.selectedOffer = action.payload.toLowerCase();
        },

        setOfferSelected: (state, action) => {
            state.offerSelected = action.payload;
        },

    });

