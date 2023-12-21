import React from 'react'
import { useSelector } from 'react-redux'
import { IconBtn } from '../../../Common/IconBtn';

export const RenderTotalAmount = () => {

    const {total,cart} = useSelector((state)=>state.cart);

    const handlerBuyCourse = ()=>{
        const courses = cart.map((course)=>course._id)
        console.log("Bought these courses:",courses);
        //todo: API integrate -> payment gateway
    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>

        <IconBtn
            text="Buy Now"
            onclick={handlerBuyCourse}
            customClasses={"w-full justify-center"}

        />
    </div>
  )
}
