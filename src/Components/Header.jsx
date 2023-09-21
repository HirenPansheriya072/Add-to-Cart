import React from 'react';
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from 'react-redux';
import img1 from "../img/logo.png";


const img3 = "https://as2.ftcdn.net/v2/jpg/02/69/54/19/1000_F_269541985_vzkBHSNf9dz2EjIRuoH5rGUpFI9rtPIf.jpg";

const Header = () => {

  const {cartItems} = useSelector((state) => state.cart);

  return (
    <nav>
        <h2>
            <img src={ img3 } alt='Logo' />
        </h2>

        <div>
            <Link to="/">Home</Link>
            <Link to="/cart">
              <FiShoppingCart />
                { cartItems.length > 0 ? (
                  <p>{cartItems.length}</p>
                ) : (
                  null
                )}
            </Link>
        </div>
    </nav>
  )
}

export default Header;