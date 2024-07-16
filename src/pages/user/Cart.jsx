import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RRBLogo from '../../assets/RRBLogo.png'
import { MdDelete } from "react-icons/md";
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { RemoveCartItems, ClearCartItems } from '../../redux/actions/cartSlice';
import axios from 'axios'


const Cart = () => {

  const { cartItems, totalCartItems, totalAmountCartItems } = useSelector((state) => state.cartItems) //Retrieving user details from redux store
  const { userall } = useSelector((state) => state.users) //Retrieving user details from redux store
  const { isLoaded, isSignedIn } = useUser()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDecreaseQuantity = () => {

  }

  const handleIncreaseQuantity = () => {

  }

  const handleRemoveFromCart = (productId) => {
    dispatch(RemoveCartItems(productId))
  }

  const clearAllHandler = (productId) => {
    dispatch(ClearCartItems(productId))
  }

  console.log("cart Items", cartItems)
  useEffect(() => {
    console.log("isLoaded, isSignedIn", isLoaded, isSignedIn)
    if (!isLoaded || !isSignedIn) {

      message.warning("Please login to your account")
      navigate('/')
      return undefined
    }
  }, [userall?._id, isLoaded, isSignedIn])


  return (


    <>
      <div className='container mx-auto '>
        <h1 className='text-xl items-center font-semibold mt-4 px-2'>Shopping Cart</h1>
        <hr className='mt-2' />
        <div className='flex flex-col justify-between md:flex-row md:gap-8'>
          <div className='space-y-0 md:w-2/3'>
            {cartItems?.length === 0 ?
              <>
                <div className='flex bg-slate-300 rounded-lg p-2 mt-5 items-center justify-center'>
                  <h1 className='text-center'>No items in the cart, please add some items to show them here.</h1>
                </div>
              </>

              : (cartItems?.map((item) =>
                <div key={item.productId}>
                  <div className='rounded-lg'>
                    <div className="justify-between mb-6 rounded-lg bg-white p-1 sm:flex sm:justify-start mt-2">
                      <img src={RRBLogo} alt='logo' className='h-12 w-12' />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center">

                        {/* Product Details */}
                        <div className='mt-5 sm:mt-0 w-1/4 max-w-1/3'>
                          <h2 className='text-lg font-bold text-gray-700 items-center'>{item.productName}</h2>
                        </div>

                        <div className='mt-5 sm:mt-0 '>
                          <p className='mt-1 text-sm text-gray-700'>Price: {item.price}</p>
                        </div>

                        {/* Manage Quantity, adding/subtracting */}
                        <div className="flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 items-center">
                          <div className="flex items-center border-gray-100">
                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={handleDecreaseQuantity}>
                              {" "}
                              -{" "}
                            </span>
                            <div className='text-center items-center justify-center'>
                              <input
                                className="h-8 w-8 border bg-white items-center justify-center text-center text-xs outline-none"
                                type="number"
                                value={item.quantity}
                                min="1"
                              />
                            </div>

                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={handleIncreaseQuantity}>

                              +
                            </span>
                          </div>
                        </div>

                        {/* Calculating sum of amount */}
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">Rs. {item.price * item.quantity} /-</p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button className="text-xl text-red-600" onClick={() => handleRemoveFromCart(item)}>
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))
            }
            {cartItems.length === 0 ? '' : (
              <>
                <button className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center text-white rounded-lg border border-none bg-sky-700 hover:bg-sky-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                  type='button'
                  onClick={() => clearAllHandler(cartItems.length > 0 ? cartItems : '')}
                >Clear All</button>
              </>
            )}

          </div>

          {/* CARD SECTION */}
          {/* For Biiling Amount Section Card */}
          <div className='md:w-1/3 mt-2'>
            <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0">
              <div className="flex justify-center bg-green-100 rounded-lg p-1">
                <h1 className='uppercase font-light'>Billing Information</h1>
              </div>

              <div className="mb-2 mt-4 flex justify-between">
                <p className="text-gray-700 text-sm">Subtotal</p>
                <p className="text-gray-700 text-sm">1152</p>
              </div>
              <div className="flex mb-2 mt-2 justify-between">
                <p className="text-gray-700 text-sm">Shipping Charge</p>
                <p className="text-gray-700 text-sm">20.00</p>
              </div>
              <div className="flex mb-2 mt-2 justify-between">
                <p className="text-gray-700 text-sm">Tax</p>
                <p className="text-gray-700 text-sm">20.00</p>
              </div>
              <div className="flex mb-2 mt-2 justify-between">
                <p className="text-gray-700 text-sm">Discount</p>
                <p className="text-gray-700 text-sm">0.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">Rs. 1172</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <hr className="my-4" />
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Proceed for payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart