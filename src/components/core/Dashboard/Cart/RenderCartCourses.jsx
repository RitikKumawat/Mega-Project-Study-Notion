import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice';



export const RenderCartCourses = () => {
  
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  
    return (
    <div>
        {
            cart.map((courses,index)=>(
                <div key={index}>
                    <div>
                        <img src={courses?.thumbnail}/>
                        <div>
                            <p>{courses?.courseName}</p>
                            <p>{courses?.category?.name}</p>
                            <div>
                                <span>4.4</span>
                                <StarRatingComponent
                                    starCount={5}
                                    editing={false}
                                    starColor="#ffd700"
                                    renderStarIconHalf={<GiNinjaStar/>}
                                    renderStarIcon={<GiNinjaStar/>}
                                />
                                <span>{courses?.ratingAndReviews?.length}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>dispatch(removeFromCart(courses._id))}>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>  
                        </button>

                        <p>Rs {courses?.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
