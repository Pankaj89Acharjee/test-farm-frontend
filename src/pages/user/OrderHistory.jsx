import React, { useState, useEffect } from 'react'
import { getOrderHistory } from '../../apicalls/usersapicall';
import { useSelector } from 'react-redux';
import Radiobtn from '../../components/Radiobutton/Radiobtn';
import Cardcomponent from '../../components/Card/Cardcomponent';


const OrderHistory = () => {

  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState([])

  const { userall } = useSelector((state) => state.users) //Retrieving user details from redux store
  const {selectedValue} = useSelector((state) => state.radio) //Retrieving radio details from redux store

  const showOrderHistory = async () => {
    console.log("User all hook in Order History", userall._id)
    console.log("Radio Btns state is", selectedValue)

    const orderHistory = await getOrderHistory({
      userId: userall?._id
    })
    setOrderData(orderHistory)
    console.log("OrderHistory details", orderHistory)
    // navigate(`/userOrderHistory`)
  }


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      showOrderHistory()
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className='container'>
      <div className="flex flex-col bg-gray-200 rounded-xl py-2 px-2">
        <div className="flex items-center justify-center">
          <h1 className='text-center text-lg font-Murecho leading-[46px] font-bold text-purple-500'>Order History</h1>
        </div>

        <div className='flex flex-col lg:flex-row mt-6 items-center justify-center '>
          <div className=' lg:w-1/3 w-full items-center justify-center mb-2 py-2'>
            <div><Radiobtn propdata={"YOUR ORDER TIME"}/></div>
          </div>

          <div className='lg:w-3/5 w-full py-2 rounded-lg ml-3'>            
            <Cardcomponent  propdata={orderData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory