import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import CartItem from './CartItem';
import productList from '../productList';

const empty_logo = require("../img/empty_cart.jpg");    
const img4 = "https://as2.ftcdn.net/v2/jpg/02/69/54/19/1000_F_269541985_vzkBHSNf9dz2EjIRuoH5rGUpFI9rtPIf.jpg";


const Cart = () => {

    const { cartItems, subTotal, shipping, total ,tax, selectedOffer, discount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

        // console.log(discount,"discount");

    const increment = (id) => {
        const item = cartItems.find((i) => i.id === id);
        const product = productList.find((p) => p.id === id);

            if(item && product && item.quantity < product.item_quantity){
                dispatch({
                    type: "addToCart",
                    payload: { id },
                });
                
                if (cartItems.length > 0) {
                    dispatch({ type: "calculatePrice" });
                }
            }
    };

    const decrement = (id) => {
        dispatch({
            type: "decrement",
            payload: id,
        });

        if (cartItems.length > 0) {
            dispatch({ type: "calculatePrice" });
        }        
    };

    const deleteHandler = (id) => {
        dispatch({
            type: "deleteFromCart",
            payload: id,
        });

        if (cartItems.length > 0) {
            dispatch({ type: "calculatePrice" });
        } 
    };

    const selectOfferHandler = (e) => {
        // console.log("Selected offer:", e.target.value);
        dispatch({
            type: "selectOffer",
            payload: e.target.value,
        });

        dispatch({
            type: "setOfferSelected",
            payload: true,
        });
        dispatch({ type: "calculatePrice" });
    };

    const GenerateBill = () => {
        const bill = {
            items: cartItems.map(item => ({
                imgSrc : item.imgSrc,
                name : item.name,
                price : item.price,
                quantity : item.quantity,
                subTotal : item.price * item.quantity,
            })),
            subTotal : subTotal,
            tax : tax,
            shipping : shipping,
            discount : discount,
            total : total,
        };

        const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.open();

           
            iframeDoc.write(` 
                <div className="header">
                    <img src="${img4}" alt="logo" width="100" />
                    <h1>Shop Cart</h1>
                </div>  
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bill.items.map(item => `
                            <tr>
                                <td><img src="${item.imgSrc}" alt="${item.name}" width="100" /></td>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${item.subTotal}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>

                    <table>
                        <tbody>
                            <tr><td>Subtotal :</td><td>${bill.subTotal}</td></tr>
                            <tr><td>Tax :</td><td>${bill.tax}</td></tr>
                            <tr><td>Shipping :</td><td>${bill.shipping}</td></tr>
                            ${bill.discount ? `<tr><td>Discount:</td><td>${bill.discount}</td></tr>` : ''}
                            <tr><td>Total :</td><td>${bill.total}</td></tr>
                        </tbody>
                    </table>   
            `);

            const style = iframeDoc.createElement('style');
            style.innerHTML = `
                body {
                    font-family: Arial, sans-serif;
                }
                // .header {
                //     dispaly: flex;
                //     align-items: center;
                //     justify-content: center;
                // }
                img {
                    background-color: white;
                    border-radius: 50%;
                }
                h1 {
                    color: black;
                    text-align: center;
                    margin-top: -70px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 50px;
                }
                th,td {
                    text-align: left;
                    padding: 8px;
                    border: 1px solid black;
                }
                td,th {
                    text-align: center;
                }
                th {
                    background-color: #f2f2f2;
                }
                p {
                    text-align: center;
                }
            `;
            iframeDoc.head.appendChild(style);

            iframeDoc.close();

            setTimeout(() => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                document.body.removeChild(iframe);
            }, 100);
            }

  return (
        <>
            <div className='cart'>
                <main>
                    { 
                        cartItems.length > 0 ? (
                            cartItems.map((i) => {
                                const product = productList.find((p) => p.id === i.id);
                                return (
                                    <CartItem
                                    imgSrc={i.imgSrc}
                                    name={i.name}
                                    price={i.price}
                                    qty={i.quantity}
                                    id={i.id}
                                    key={i.id}
                                    decrement={decrement}
                                    increment={increment}
                                    deleteHandler={deleteHandler}
                                    maxQuantityReached={i.quantity === product.item_quantity} 
                                    />
                                );
                            })
                        ) : (
                                <div className='empty'>
                                    <img src={empty_logo} alt='Empty Image' />
                                    <h2>Your cart is empty !!!</h2>
                                </div>
                        )
                    }
                </main>

                    {
                        cartItems.length == 0 ? (
                            null
                        ) : (
                            <aside >

                               <div className='calc'>
                                    <h2>Subtotal : ₹{subTotal}</h2>
                                    <h2>Shipping : ₹{shipping}</h2>
                                    <h2>Tax : ₹{tax}</h2>

                                        {
                                            selectedOffer && subTotal >= 40000 && (
                                                <>
                                                    <h3>Offer applied: {selectedOffer}</h3>
                                                    <h3>Discount: <span> - ₹{discount} </span></h3>
                                                </>
                                            )
                                        }

                                    <h2>Total : ₹{total}</h2>

                                        {
                                            subTotal >= 40000 ? (
                                                <div className='offers'>
                                                                    <select onChange={selectOfferHandler}  value={selectedOffer}>
                                                                        <option value="">Apply Offers</option>  
                                                                        {subTotal >= 40000 && <option value="offer1">10% Discount</option>}
                                                                        {subTotal >= 60000 && <option value="offer2">20% Discount</option>}
                                                                    </select>

                                                        
                                                        { subTotal >= 100000 && (
                                                            <>
                                                                <h3> Apply Offer</h3>
                                                                <label>
                                                                    <input type='radio' name='offer' value='offer1' onChange={selectOfferHandler} checked={selectedOffer === 'offer1'} />
                                                                        10% Discount    
                                                                </label>
                                                            </>
                                                        )}
                                                        { subTotal >= 150000 && (
                                                            <label>
                                                                <input type='radio' name='offer' value='offer2' onChange={selectOfferHandler} checked={selectedOffer === 'offer2'} />
                                                                    20% Discount
                                                            </label>
                                                        )}


                                                        <button className='order' onClick={() => GenerateBill()}>Generate Bill</button>

                                                </div>
                                            ) : (
                                                null
                                            )
                                        }
                               </div>    

                            </aside>
                        )
                    }
            </div>
        </>
  );
};



export default Cart;


        // const doc = new jsPDF();

        // doc.text('----------------------------------------- Bill -----------------------------------------',10,10);
        // let y = 30;
        // bill.items.forEach(item => {
        //     // doc.text(`${item.imgSrc}`, 10, y)
        //     // y += 10;
        //     doc.text(`${item.name} * ${item.quantity} : ${item.subTotal}`, 10, y);
        //     y += 10;
        // });
        // doc.text(`Subtotal: ${bill.subTotal}`, 10, y);
        // y += 10;
        // doc.text(`Tax: ${bill.tax}`, 10, y);
        // y += 10;
        // doc.text(`Shipping: ${bill.shipping}`, 10, y);
        // y += 10;
        // if(bill.discount){
        //     doc.text(`Discount: ${bill.discount}`, 10, y);
        //     y += 10;
        // }
        // doc.text(`Total: ${bill.total}`, 10, y);

        // let pic = doc.save('bill.pdf');

        // window.print();


         // iframeDoc.write('<h1>Bill</h1>');
            // bill.items.forEach(item => {
            //     iframeDoc.write(`<img src="${item.imgSrc}" alt="${item.name}" width="100" />`);
            //     iframeDoc.write(`<p className="name">${item.name} * ${item.quantity} : ${item.subTotal}</p>`);
            // });

            // iframeDoc.write(`<p>Subtotal: ${bill.subTotal}</p>`);
            // iframeDoc.write(`<p>Tax: ${bill.tax}</p>`);
            // iframeDoc.write(`<p>Shipping: ${bill.shipping}</p>`);
            // if(bill.discount){
            //     iframeDoc.write(`<p>Discount: ${bill.discount}</p>`);
            // }
            // iframeDoc.write(`<P>Total: ${bill.total}</p>`);





 // const printWindow = window.open('', 'PRINT', 'height=600, width=1200');


        // printWindow.document.write('<h1>Bill</h1>');
        // bill.items.forEach(item => {
        //     printWindow.document.write(`<img src="${item.imgSrc}" alt="${item.name}" width="100" />`);
        //     printWindow.document.write(`<p>${item.name} * ${item.quantity} : ${item.subTotal}</p>`);
        // });
        // printWindow.document.write(`<p>Subtotal: ${bill.subTotal}</p>`);
        // printWindow.document.write(`<p>Tax: ${bill.tax}</p>`);
        // printWindow.document.write(`<p>Shipping: ${bill.shipping}</p>`);
        // if(bill.discount){
        //     printWindow.document.write(`<p>Discount: ${bill.discount}</p>`);
        // }
        // printWindow.document.write(`<P>Total: ${bill.total}</p>`);

        // // printWindow.document.write('<button onclick="window.print()">Save</button>');
        // // printWindow.document.write('<button onclick="window.close()">Close</button>');
        // printWindow.document.close();
        // // printWindow.focus();
        // printWindow.print();
        // // printWindow.close();