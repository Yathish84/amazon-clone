import { StarIcon } from '@heroicons/react/solid';
import Image  from 'next/image';
import  Currency  from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import {addToBasket,removeFromBasket} from '../slices/basketSlice';
function Checkoutproduct({ 
    id,
    title,
    image,
    price,
    rating,
    category,
    description,
    hasprime
}) {
    const dispatch = useDispatch();
    const product = {
        id,
    title,
    image,
    price,
    rating,
    category,
    description,
    hasprime
    }
    const additem = ()=>{
        dispatch(addToBasket(product))
    };
    const removeitem = ()=>{
        dispatch(removeFromBasket({id}))
    }
    return (
        <div className="grid grid-cols-5 ">
            <Image src={image} height={200} width={200} objectFit="contain" />
            <div className=" col-span-3 mx-5 " >
                <p>{title}</p>
                <div className="flex">
                   { Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>
                <p className = "text-xs my-2 line-clamp-3 ">{description}</p>
                <Currency quantity={price}  currency="INR"/>
                {hasprime && (
                    <div className='flex items-center space-x-2  '>
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="" loading="lazy" />
                        <p className='text-xs text-gray-500 '>FREE Next-day-delivery</p>
                    </div>
                )}
            </div>
            <div className=' flex flex-col my-auto space-y-2 justify-self-end '>
                <button onClick={additem} className="button">Add To Basket</button>
                <button onClick={removeitem} className="button ">Remove from Basket</button>
            </div>
            
        </div>
    )
}

export default Checkoutproduct;

