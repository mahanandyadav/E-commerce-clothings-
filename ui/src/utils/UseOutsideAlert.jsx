import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../store/cart/cart.action";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
  const dispatch = useDispatch()
  const navigate=useNavigate()

  useEffect(() => {
    /****
     * Alert if clicked on outside of element
     ***/
    function handleClickOutside(event) {

      if (ref.current && !ref.current.contains(event.target)) {
        console.log(ref.current)
        console.log(event.target.innerText === 'GO TO CHECKOUT')
        // alert("You clicked outside of me!");
        
        dispatch(setIsCartOpen(false))  
        if (event.target.innerText === 'GO TO CHECKOUT') {
            navigate('/checkout');
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter