import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, Modal, Col, Row, Space, Form, message, Table, Popconfirm } from 'antd'
import { getAllQuestionsByExamId, insertNewQuestion, editQuestion, deleteQuestion } from '../../apicalls/adminapicall'



const AddQuestions = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activebtn, setActivebtn] = useState(false)
  const [getquestion, setGetquestion] = useState()
  const [activeedit, setActiveedit] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to store the selected question data during edit
  const [isediting, setIsediting] = useState(false)
  const [saved, setSaved] = useState(false)

  const populateQs = async () => {
    try {
      const fetchQs = await getAllQuestionsByExamId({
        examId: id
      })
      //console.log("Fetch Question", fetchQs)
      if (fetchQs.statusCode === 1) {
        setGetquestion(fetchQs.data.questions)
        message.success(fetchQs.message)
      } else {
        message.error("Error in getting question data")
      }
    } catch (error) {
      message.error(error.message)
      console.log("Error in populating question", error)
    }
  }

  useEffect(() => {
    populateQs()
  }, [id])

  const cancel = (e) => {
    setSelectedQuestion(false)
    message.error('Oh O! You were accidentally deleting data');
  }

  const enableInsertion = () => {
    setActivebtn(true)
  }

  const closeModal = () => {
    setActivebtn(false)
  }

  const enableEdit = (e, question) => {
    e.stopPropagation(); // Stop the click event from propagating to the row click event, results in producing syntetic element
    setIsediting(true)
    setActiveedit(true)
    setSelectedQuestion(question)  //To show question in modal during edit button hit
  }

  const enableDelete = (e, question) => {
    e.stopPropagation(); // Stop the click event from propagating to the row click event, results in producing syntetic element        
    setSelectedQuestion(question)  //To show question in modal during edit button hit
  }

  const closeEditModal = () => {
    setIsediting(false)
    setActiveedit(false)
    setSelectedQuestion(null)
  }

  const saveQuestion = async (values) => {
    try {
      setSaved(true)
      //values.preventDefault()     
      const destructingPayload = {
        questionname: values.questionname,
        correctans: values.correctans,
        options: {
          A: values.optionA,
          B: values.optionB,
          C: values.optionC,
          D: values.optionD
        },
        exam: id
      }
      const insertQs = await insertNewQuestion(destructingPayload)

      if (insertQs.statusCode === 1) {
        message.success(insertQs.message)
        setTimeout(() => {
          navigate(-1)
          populateQs()
        }, 2000)

      } else {
        setSaved(false)
        message.error("Error in insertion")
      }
    } catch (error) {
      setSaved(false)
      message.error(error.message)
      console.log("Error in question creation", error)
    }
  }



  const updateQuestion = async (value) => {
    try {
      const payloadDestructure = {
        questionname: value.questionname,
        correctans: value.correctans,
        options: {
          A: value.optionA,
          B: value.optionB,
          C: value.optionC,
          D: value.optionD
        },
        questionId: selectedQuestion?._id
      }

      const updateQs = await editQuestion(payloadDestructure)
      if (updateQs.statusCode === 1) {
        message.success(updateQs.message)
        navigate(-1)
      }
    } catch (error) {
      message.error(error.message)
      console.log("Error in updating question", error)
    }
  }


  const deleteQs = async () => {
    setIsediting(false)
    setSelectedQuestion(true)
    try {
      const payLoad = {
        questionId: selectedQuestion?._id,
        examId: id
      }
      const deleteQs = await deleteQuestion(payLoad)
      if (deleteQs.statusCode === 1) {
        message.success(deleteQs.message)
        populateQs()
        navigate(1)
      }
    } catch (error) {
      message.error(error.message)
      console.log("Error in updating question", error)
    }

  }


  const columns = [
    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Sl No</div>,
      dataIndex: 'serial',
      key: 'serial',
      render: (text) => (
        <span style={{ color: 'blue', fontSize: '16px', textAlign: 'center' }}>
          {text}
        </span>
      ),
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Question</div>,
      dataIndex: 'questionname',
      key: 'questionname'
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Correct Option</div>,
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => {
        return `${record.correctans} : ${record.options[record.correctans]}` //Stored in array of object (object = record.option)
      }
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>All Options</div>,
      dataIndex: 'alloptions',
      key: 'alloptions',
      render: (text, record) => {
        return Object.keys(record.options).map((value) => {
          return <div>{value} : {record.options[value]}</div>
        })
      }
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Edit</div>,
      dataIndex: 'edit',
      key: 'edit',
      render: (_, record) => (
        <div className='flex gap-3 cursor-pointer'>
          <i onClick={(e) => enableEdit(e, record)}
            className="edit"
          ><span className="material-symbols-outlined">
              edit
            </span></i>
        </div>
      )
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Delete</div>,
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm title="Are you sure to delete?"
          onClick={(e) => enableDelete(e, record)}
          onConfirm={() => deleteQs(record)}
          onCancel={cancel}
          okText="Sure"
          cancelText="Cancel"
          overlayClassName='custom-popconfirm'
        >
          <i className="delete"><span className="material-symbols-outlined">
            delete
          </span></i>
        </Popconfirm>
      )
    }
  ];


  const data = getquestion?.length > 0 ? getquestion?.map((data, index) => ({
    key: index.toString(),
    serial: (index + 1).toString(),
    _id: data._id,
    questionname: data.questionname,
    correctans: data.correctans,
    options: data.options, //Array of objects

  })) : [];

  console.log("SET QS Hook", selectedQuestion)
  console.log("DATA", data)

  return (
    <div className='container'>
      <div className='flex justify-between py-3 mt-2 lg:mt-4 p-6 bg-slate-100 border-gray-500 rounded-xl'>
        <h1 className='items-center justify-center text-center font-extrabold text-gray-800 text-xl leading-9'>ADMIN</h1>
        <Button className='bg-white flex items-center text-sky-500 font-bold'
          onClick={enableInsertion}
        ><span className="material-symbols-outlined"
        >add
          </span>Add Questions</Button>
      </div>

      {/* Modal for adding questions */}
      {!activebtn ? '' : (
        <Modal title="Add A New Question" open={activebtn} onCancel={closeModal} footer={false} className='text-center'>
          <Form layout='vertical' autoComplete='off' onFinish={saveQuestion} className='bg-green-100 rounded-xl p-2'>
            <Form.Item
              name="questionname"
              label="Question"
              className='text-center text-sm'
              rules={[
                { required: true }
              ]}
            >
              <Input type='text' className='border border-1 border-gray-600' placeholder='Name of the question' />
            </Form.Item>

            {/* All Options Button */}
            <Row gutter={[10, 10]} className='justify-center items-center'>
              <Col span={12}>
                <Form.Item
                  name="optionA"
                  label="Option A"
                  className='text-center text-sm'

                >
                  <Input type='text' className='border border-1 border-gray-600' placeholder='Option A' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="optionB"
                  label="Option B"
                  className='text-center text-sm'

                >
                  <Input type='text' className='border border-1 border-gray-600' placeholder='Option B' />
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={[10, 10]} className='justify-center items-center'>
              <Col span={12}>
                <Form.Item
                  name="optionC"
                  label="Option C"
                  className='text-center text-sm'

                >
                  <Input type='text' className='border border-1 border-gray-600' placeholder='Option C' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="optionD"
                  label="Option D"
                  className='text-center text-sm'

                >
                  <Input type='text' className='border border-1 border-gray-600' placeholder='Option D' />
                </Form.Item>
              </Col>
            </Row>

            {/* End of options section */}

            {/* Correct option button */}
            <Form.Item
              name="correctans"
              label="Correct Answer"
              className='text-center text-sm'
              rules={[
                { required: true }
              ]}
            >
              <Input type='text' className='border border-1 border-gray-600' placeholder='Correct answer. Give option number' />
            </Form.Item>


            {/* Action button for submit and reset */}
            <Form.Item className='flex items-center justify-center'>
              <Space>
                <>
                  <Button htmlType='submit' disabled={saved}
                  >Submit</Button>
                  <Button htmlType='reset' disabled={saved}>Reset</Button>
                </>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Modal for editing questions */}
      {!activeedit && !isediting ? '' : (
        <Modal title="Edit Question" open={activeedit} onCancel={closeEditModal} footer={false} className='text-center'>
          {selectedQuestion && (
            <Form layout='vertical'
              initialValues={{
                questionname: selectedQuestion?.questionname,
                optionA: selectedQuestion?.options.A,
                optionB: selectedQuestion?.options.B,
                optionC: selectedQuestion?.options.C,
                optionD: selectedQuestion?.options.D,
                correctans: selectedQuestion?.correctans
              }}
              onFinish={updateQuestion}
              className='bg-green-100 rounded-xl p-2'>
              <Form.Item
                name="questionname"
                label="Question"
                className='text-center text-sm'
                rules={[
                  { required: true }
                ]}
              >
                <Input type='text' className='border border-1 border-gray-600' placeholder='Enter question' />
              </Form.Item>

              {/* All Options Button */}
              <Row gutter={[10, 10]} className='justify-center items-center'>
                <Col span={12}>
                  <Form.Item
                    name="optionA"
                    label="Option A"
                    className='text-center text-sm'

                  >
                    <Input type='text' className='border border-1 border-gray-600' placeholder='Option A' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="optionB"
                    label="Option B"
                    className='text-center text-sm'

                  >
                    <Input type='text' className='border border-1 border-gray-600' placeholder='Option B' />
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={[10, 10]} className='justify-center items-center'>
                <Col span={12}>
                  <Form.Item
                    name="optionC"
                    label="Option C"
                    className='text-center text-sm'

                  >
                    <Input type='text' className='border border-1 border-gray-600' placeholder='Option C' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="optionD"
                    label="Option D"
                    className='text-center text-sm'

                  >
                    <Input type='text' className='border border-1 border-gray-600' placeholder='Option D' />
                  </Form.Item>
                </Col>
              </Row>

              {/* End of options section */}

              {/* Correct option button */}
              <Form.Item
                name="correctans"
                label="Correct Answer"
                className='text-center text-sm'
                rules={[
                  { required: true }
                ]}
              >
                <Input type='text' className='border border-1 border-gray-600' placeholder='Correct answer. Give option number' />
              </Form.Item>


              {/* Action button for submit and reset */}
              <Form.Item className='flex items-center justify-center'>
                <Space>
                  <>
                    <Button htmlType='submit'
                    >Submit</Button>
                    <Button htmlType='reset'>Reset</Button>
                  </>
                </Space>
              </Form.Item>
            </Form>
          )
          }
        </Modal>
      )}

      {/* Table for showing question data */}
      {!data.length ? <> <h1 className='p-2 rounded-xl mt-6 mb-6 text-center font-semibold  text-red-500 border-red-600 border-dashed border-spacing-7 border-2'>Sorry! This section currently does not have any questions.</h1>
        <div>
          <button
            type='button'           
            onClick={() => navigate("/addExams")}
            className='md:text-base mt-6 md:mt-6 lg:mt-8 py-2 px-5 text-xs md:text-md text-center  rounded-lg border border-none bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out cursor-pointer'>Back</button>
        </div>
      </> : (
        <div className='bg-slate-100 rounded-xl mt-3 lg:mt-6 flex md:flex-col items-center justify-center pt-3'>
          <div className='items-center justify-center text-center w-72 md:w-[500px] lg:w-[1050px] mb-3 rounded-xl'>
            <div className='w-full text-sm'>
              <Table
                columns={columns}
                dataSource={data}
                className='uppercase text-center items-center justify-center'
                scroll={{ x: true }}
                bordered
                onRow={(record) => ({
                  onClick: (e) => {
                    const target = e.target
                    if (target.tagName.toLowerCase() === 'i') {
                      if (target.classList.contains('edit')) {
                        enableEdit(e, record)
                      } else if (target.classList.contains('delete')) {
                        // Perform delete operation
                        enableDelete(e, record)
                      }
                    }
                  } //To pass the qs from the row to the Modal for editing
                })}
              />
            </div>
          </div>
        </div>
      )}

      {/* End of table for existing exam data */}
    </div>

  )
}

export default AddQuestions