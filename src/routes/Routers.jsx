import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Testseries from '../pages/user/Testseries'
import Allexams from '../pages/admin/Allexams'
import EditExamById from '../pages/admin/EditExamById'
import AddQuestions from '../pages/admin/AddQuestions'
import ExamTermsCond from '../pages/user/ExamTermsCond'
import ExamResult from '../pages/user/ExamResult'
import PurchaseExam from '../pages/user/PurchaseExam'
import FailurePayPage from '../pages/user/FailurePayPage'
import PurchaseConfirm from '../pages/user/PurchaseConfirm'
import OrderHistory from '../pages/user/OrderHistory'
import Cart from '../pages/user/Cart'


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/testseries' element={<Testseries />} />
      <Route path='/purchase' element={<PurchaseExam />} />
      <Route path='/addExams' element={<Allexams />} />
      <Route path='/api/admin/editExamById/:id' element={<EditExamById />} />
      <Route path='/api/admin/addQuestionsByExamId/:id' element={<AddQuestions />} />
      <Route path='/terms&conditions/:examid' element={<ExamTermsCond />} />
      <Route path='/examResult/:examid' element={<ExamResult />} />
      <Route path='/paymentFailure' element={<FailurePayPage />} />
      <Route path='/paymentSuccess' element={<PurchaseConfirm />} />
      <Route path='/userOrderHistory' element={<OrderHistory />} />
      <Route path='/cart' element={<Cart />} />



    </Routes>
  )
}

export default Routers