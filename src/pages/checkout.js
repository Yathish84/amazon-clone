import Header from './../components/Header';
import  Image  from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems,selectTotal } from './../slices/basketSlice';   
import Checkoutproduct from '../components/Checkoutproduct';
import { useSession } from 'next-auth/client';
import  Currency  from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
    const total =  useSelector(selectTotal)
    const [session] = useSession();
    const items = useSelector(selectItems)

    const createCheckoutSession = async()=>{
        const stripe = await stripePromise;
        // call the backend to create api end point ie checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',{
            items: items,
            email:session.user.email
        });
        //redirect user to checkout session
        const result = await stripe.redirectToCheckout({
            sessionId:checkoutSession.data.id,
        })
        if(result.error) alert(result.error.message)
        
    }

    return (
        <div className="bg-gray-100">
            <Header />
            <main className=" flex max-w-screen-xl mx-auto">
                {/* leftside */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250} 
                        objectFit="contain"  
                    />
                    <div className="bg-white flex flex-col p-5 space-y-10">
                       <h1 className="text-3xl border-b pb-4 ">{items.length === 0 ? 'Your Amazon Basket is Empty' : "Shopping Basket" }</h1> 
                       {items.map((item,i)=>(
                         <Checkoutproduct  
                            key={i}
                            id={item.id}
                            title={item.title}
                            image = {item.image}
                            price= {item.price}
                            category= {item.category}
                            description= {item.description}
                            hasprime= {item.hasprime}
                            rating= {item.rating}
                         /> 
                     ))}
                    </div>
                     
                </div>
                {/* rightside */}
                <div className={`${items.length>0 && 'flex flex-col bg-white p-10 shadow-md'} `}>
                {items.length>0&&(
                    <> 
                        <h2 className='whitespace-nowrap'>Subtotal ({items.length}) items : <span className='font-bold'>
                            <Currency quantity={total}  currency="INR"/>
                           </span></h2>
                        <button 
                        role='link'
                        onClick={createCheckoutSession}
                        disabled={!session} 
                        className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-300 text-gray-300 cursor-not-allowed'}`}>
                            {!session ? "Sign in to checkout" : "Proceed to checkout"}    
                        </button>   
                    </>
                )}  
                </div>
                
            </main>
        </div>
    )
}

export default Checkout
