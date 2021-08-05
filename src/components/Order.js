import moment from "moment"
import Currency from 'react-currency-formatter'

function Order({id,amount,amountshipping,items,timestamp,images}) {
    return (
        <div className='relative border rounded-md' >
            <div className='flex items-center space-x-10 bg-gray-100 text-sm text-gray-600 p-3'>
                <div>
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
                </div>
                <div>
                    <p className='font-bold text-xs'>TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency="INR" /> -Next Day Delivery{" "}
                        <Currency quantity={amountshipping} currency="INR" />
                    </p>
                </div>
                <p className='text-xs whitespace-nowrap sm:text-lg self-end flex-1 text-right text-blue-500'>{items.length} items</p>
                <p className='absolute top-0 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>ORDER # {id}</p>
            </div>
            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {images.map(image=>(
                        <img src={image} className='h-20 object-contain sm:h-32' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
