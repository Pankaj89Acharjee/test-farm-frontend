import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getAllExamDataForUser } from '../../apicalls/usersapicall'
import RRBLogo from '../../assets/RRBLogo.png'
import PurchaseLogo from '../../assets/Purchased.png'
import phonePeLogo from '../../assets/PHpe.jpg'
import upiLogo from '../../assets/UPILogo.png'
import Spinner from '../../components/Loader/Spinner'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AddToCart } from '../../redux/actions/cartSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'





const PurchaseExam = () => {

    const { isLoaded, isSignedIn } = useUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [examdata, setExamdata] = useState([])

    const { userall } = useSelector((state) => state.users) //Retrieving user details from redux

    const dispatch = useDispatch()

    const fetchExamData = async () => {
        try {
            setLoading(true)
            const getAllExams = await getAllExamDataForUser()
            if (getAllExams.statusCode === 1) {
                setExamdata(getAllExams.data)
                setLoading(false)
            } else {
                setLoading(false)
                console.log("Error in fetching data")
            }
        } catch (err) {
            console.log("Error in fetching data")
        }
    }



    useEffect(() => {
        if (!isLoaded || !isSignedIn) {
            return undefined
        }
        fetchExamData()
    }, [isLoaded, isSignedIn])


    //Creating map for existing data. It will create an array of ids (Object Id)
    let examDataMap = new Map(examdata.map((data) => [data._id, data]))

    //Creating lookups for filtered data
    //Later use cart and redux toolkit for this
    const sortedCartData = (examId) => {
        const filteredData = examDataMap.get(examId)
        if (filteredData) {
            const arrayData =
            {
                productId: filteredData._id, //It is examId actually of exams schema
                productName: filteredData.examname,
                price: filteredData.price,
                users: userall._id
            }

            return arrayData
        } else {
            return null
        }
    }

    const openRazorpayHandler = (orderData, examName, productId) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            description: "Exam Purchase",
            order_id: orderData.id,


            //This portion works when payment is done
            handler: async function (response) {
                //alert(response.razorpay_payment_id)
                console.log("Response handler", response)
                const verifyPay = await axios.post("http://localhost:5075/api/user/verifyPayment", { response: response })
                if (verifyPay.data.statusCode === 1) {
                    //message.success(verifyPay.data.message)   
                    const savePurchaseData = await axios.post("http://localhost:5075/api/user/savePurchasingRecord", {
                        orderid: response.razorpay_order_id,
                        paymentid: response.razorpay_payment_id,
                        paysignature: response.razorpay_signature,
                        exams: productId,
                        users: userall?._id //From redux
                    })
                    if (savePurchaseData.data.statusCode === 1) {
                        navigate(`/paymentSuccess`, { state: { response, examName: examName, userId: userall?._id } })
                    } else {
                        message.error(savePurchaseData.data.message)
                    }
                } else {
                    message.error(verifyPay.data.message)
                }
            },
            prefill: {
                name: userall?.name, //customer's name
                email: userall?.email, //customer's email
            },
            notes: {
                address: "Test Farm Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const sendOrderDetails = async (examId) => {
        const cartData = sortedCartData(examId)
        console.log("Sorted Cart Data", cartData)

        const sendData = await axios.post("http://localhost:5075/api/user/generateOrder", { cartData: cartData })
        console.log("After creating order", sendData)
        openRazorpayHandler(sendData.data.orderGeneratedetails, cartData.productName, cartData.productId)
    }


    const addProductToRedux = async (examId) => {
        const addCartItems = sortedCartData(examId)
        // console.log("Items to send in carts", addCartItems)
        dispatch(AddToCart(addCartItems))
    }

    if (loading) {
        return <Spinner message="Loading!">Loader</Spinner>
    }

    //console.log("Exam data hook in user test series", examdata)

    return (
        <div className='container'>
            <div className='flex flex-col justify-center items-center bg-gray-200 rounded-xl'>
                {/* Formatted cards designs */}
                {examdata?.length === 0 ? '' : (
                    <>
                        {examdata?.map((data, index) => {
                            return (
                                <>
                                    <div key={data} className="flex flex-col mt-6 items-center justify-center lg:flex mb-4 w-60 md:w-[500px] lg:w-[1050px] ">
                                        <div className="border-2 border-y-teal-500 border-x-sky-500  bg-white rounded-xl p-4 flex flex-col justify-between leading-normal">
                                            <div className="mb-8 items-center text-center justify-center">
                                                <p className="flex items-center ">
                                                    {/* Icons used as google fonts. Source: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:lock_reset:FILL@0;wght@400;GRAD@0;opsz@24 */}
                                                    <span className="material-symbols-outlined mr-2">
                                                        lock
                                                    </span>
                                                    <h1 className='text-sm text-white bg-red-600 p-2 rounded-xl'>Premium Course</h1>

                                                </p>
                                                <div className="text-gray-900 font-bold text-xl mb-2 text-center">{data?.examname}</div>
                                                <div className='hidden lg:flex items-center justify-between space-x-6 uppercase'>
                                                    <img className="w-16 h-16 rounded-full mr-4 mb-2 lg:mb-0" src={RRBLogo} alt="Exam Logo" />
                                                    <p className="flex text-gray-900 leading-none bg-slate-300 p-2 text-[16px] rounded-md mb-2 lg:mb-0 mr-2 ">Quality questions </p>
                                                    <p className="flex text-gray-900 leading-none bg-slate-300 p-2 text-[16px] rounded-md mb-2 lg:mb-0 mr-2 ">Full lenth examination </p>
                                                    {/* <p className="flex text-gray-900 leading-none bg-slate-300 p-2 text-[16px] rounded-md mb-2 lg:mb-0 mr-2 ">Every Solution </p> */}
                                                    <p className="flex text-gray-900 leading-none bg-slate-300 p-2 text-[16px] rounded-md mb-2 lg:mb-0 mr-2 ">24 x 7 Premium Support </p>
                                                    <p className=" flex text-gray-900 leading-none bg-slate-300 p-2 text-[16px] rounded-md mb-2 lg:mb-0 mr-2 ">Questions:<span className='font-bold ml-1'>{data?.totalquestion}</span> </p>
                                                    <p className="flex text-gray-900 leading-none bg-slate-300 p-2 text-[16px] rounded-md mb-2 lg:mb-0 mr-2 ">Price: <span className='font-bold ml-1 text-center'> 1200 /-</span> </p>

                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-between lg:flex lg:flex-row">
                                                <div className="flex">
                                                    <div className="text-sm items-center justify-center text-center">
                                                        <p className="text-gray-600 bg-slate-300 p-2 rounded-md mt-1 mb-2 lg:mb-0 mr-2 ">Discount:<span className='font-bold ml-1'>30%</span></p>
                                                    </div>
                                                    <div className="text-sm items-center justify-center text-center">
                                                        <p className="text-gray-600 bg-slate-300 p-2 rounded-md mt-1 mb-2 lg:mb-0 mr-2 ">Validity: <span className='font-bold ml-1'>{data?.validity} days</span></p>
                                                    </div>

                                                    <div className="text-sm items-center justify-center">
                                                        <p className="text-gray-600 bg-slate-300 p-2 rounded-md mt-1 mb-2 lg:mb-0 mr-2 ">Purchased ?</p>
                                                    </div>
                                                </div>




                                                <div className='items-center justify-center mb-2 lg:mb-0 w-24 h-24 mr-2 '>
                                                    <img src={PurchaseLogo} alt='purchase logo' className='h-20 w-24' />
                                                </div>

                                                <div className="flex">
                                                    <div className='justify-center items-center mr-2 '>
                                                        <button
                                                            onClick={() => addProductToRedux(data?._id)}
                                                            className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center text-white rounded-lg border border-none bg-sky-700 hover:bg-sky-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Add to cart</button>
                                                    </div>

                                                    <div className='justify-center items-center mr-2 '>
                                                        <button
                                                            onClick={() => sendOrderDetails(data?._id)}
                                                            className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center text-white rounded-lg border border-none bg-sky-700 hover:bg-sky-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Buy a copy</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-2 text-white rounded-xl text-xs flex items-center justify-center mt-3 lg:mt-1'>
                                                <h1 className='text-center items-center mr-2'>Online purchasing available in</h1>
                                                <img className='w-5 h-5 rounded-full' src={phonePeLogo} alt='phpeLogo' />
                                                <img className='w-8 h-6 rounded-full ml-2' src={upiLogo} alt='upiLogo' />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </>
                )}

                {/* Formatted cards designs end*/}
            </div>
        </div>
    )
}

export default PurchaseExam