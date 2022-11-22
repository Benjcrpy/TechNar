import React, {useEffect, useState} from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";

import { useStateValue } from '../context/StateProvide';
import { actionType } from "../context/reducer";
import EmptyCart from "../images/emptyCart.png"
import CartItem from './CartItem';


const CartContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const showCart = () => {
        dispatch({
          type: actionType.SET_CART_SHOW,
          cartShow: !cartShow,
       });
      };

      useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot)
      }, [tot, flag]);

      const clearCart = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: [],
        });
    
        localStorage.setItem("cartItems", JSON.stringify([]));
      };


  return (
    <motion.div 
        initial={{opacity: 0, x : 200}}
        animate={{opacity: 1, x : 0}}
        exit={{opacity: 0, x : 200}}
        className="fixed top-0 right-0 w-full md:w-375 h-screen bg-slate-900 drop-shadow-md flex flex-col z-[101] rounded-lg">

        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-slate-50 text-3xl" />
        </motion.div>
        <p className="text-slate-100 text-lg font-semibold"> Cart </p>

          <motion.p 
          whileTap={{ scale: 0.75 }} 
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md
          hover:shadow-md cursor-pointer text-slate-900 text-base"
          onClick={clearCart}

          >
          Clear <RiRefreshFill /> {" "} 
          </motion.p>
      </div>

       {/* Bottom Section */}
       {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-gradient-to-r from-orange-300 to-black rounded-t-[2rem] flex flex-col">

       {/* cart Items section */}
        <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">

       {/* cart Item */}
       {cartItems && 
          cartItems.length > 0 && 
          cartItems.map((item) => (
         <CartItem 
          key={item.id} 
          item={item}
          setFlag={setFlag}
          flag={flag}
         />
       ))}
      </div>

       {/*  cart total section */}
       <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
        <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg"> Sub Total </p>
            <p className="text-gray-400 text-lg"> P {tot} </p>
        </div>
        <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg"> Delivery </p>
            <p className="text-gray-400 text-lg"> 1.5 </p>
        </div>

        <div className="w-full border-b border-gray-600 my-2"></div>

        <div className="w-full flex items-center justify-between">
            <p className="text-gray-200 text-xl font-semibold"> Total </p>
            <p className="text-gray-200 text-xl font-semibold"> P {tot + 2.5} </p>
        </div>
          
        {user ? (
            <motion.div 
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex text-center justify-center text-black text-1xl text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out cursor-pointer"
            >
                Check Out     
            </motion.div>
        ) : (
            <motion.div 
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex text-center justify-center text-black text-1xl text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out cursor-pointer"
            >
                Log in to Check Out    
            </motion.div>
        )}   
       </div>
        </div>
       ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-white ">
            <img src={EmptyCart} className="w-300" alt=""  />
            <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
            </p>
        </div>
       )}
    </motion.div>
  )
}

export default CartContainer
