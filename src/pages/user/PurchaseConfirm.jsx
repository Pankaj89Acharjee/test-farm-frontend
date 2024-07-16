import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {  getOrderHistory } from '../../apicalls/usersapicall';

const PurchaseConfirm = () => {
    const { isLoaded, isSignedIn } = useUser(); //Using clerk signin
    const navigate = useNavigate()
    const location = useLocation()

    const orderId = location?.state?.response?.razorpay_order_id
    const paymentId = location?.state?.response?.razorpay_payment_id
    const productname = location?.state?.examName


    const showOrderHistory = async () => {
        const orderHistory = await getOrderHistory({
            userId: location?.state?.userId
        })
        console.log("OrderHistory details", orderHistory.data.data)
       // navigate(`/userOrderHistory`)
    }



    useEffect(() => {
        if (!isLoaded || !isSignedIn) {
            navigate('/')
            return undefined
        }
    }, [navigate, isLoaded, isSignedIn])


    return (
        <div className='container'>
            <div className='bg-gray-200 flex justify-center items-center'>
                <div className='mb-5 p-2 flex flex-col w-1/4 justify-center'>
                    <h1 className='p-2 rounded-md text-center font-semibold text-xs lg:text-base text-green-500 border-green-600 md:border-dashed md:border-spacing-7 md:border-2 border-hidden '>Purchase for <span><h1 className='text-xs lg:text-base text-purple-500'>{productname}</h1></span>  was successful</h1>
                    <div className='mt-2 p-1 flex flex-col justify-center items-center'>
                        <h1 className='text-center text-xs text-gray-600'><strong>Payment Id:</strong> {paymentId}</h1>
                        <h1 className='text-center text-xs text-gray-600'><strong>Order Id:</strong> {orderId}</h1>

                    </div>

                    {/* Animation when exam is over. This is a script from Lottie Files */}
                    <dotlottie-player
                        src="https://lottie.host/545a0874-4d6f-47b3-afac-782e674913bb/Ns3JK5vDfE.json" background="transparent"
                        speed="1"
                        loop
                        autoplay>
                    </dotlottie-player>

                    <button
                        type='button'
                        className='md:text-base mt-6 md:mt-6 lg:mt-8 py-2 px-5 text-xs md:text-md text-center  rounded-lg border border-none bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out cursor-pointer'
                        onClick={() => showOrderHistory()} //Here try to implement useMemo
                    >Show Order History</button>
                </div>
            </div>

        </div>
    )
}

export default PurchaseConfirm