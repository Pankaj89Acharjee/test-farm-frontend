import { Button, Col, Form, Input, Row, Select, Space, Table, message, Popconfirm, FloatButton } from 'antd'
import Lib, { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { addNewExam, fetchAllExams, deleteExamById } from '../../apicalls/adminapicall'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Loader/Spinner'


const Allexams = () => {

    const [getexam, setGetexam] = useState([])
    const [makeedit, setMakeedit] = useState(false)
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
            fetchExamData();
            setLoading(false)
        }, 2000);

        return () => {
            clearTimeout(timeoutId); // Clear the timeout when unmounting to prevent memory leakage
        };
    }, []);


    const fetchExamData = async () => {
        try {
            setLoading(true)
            const fetchExamData = await fetchAllExams()

            if (fetchExamData.statusCode === 1) {
                setGetexam(fetchExamData.data)
                //message.success(fetchExamData.message)
                setLoading(false)
            }

        } catch (error) {
            console.log("Error in getting exam data", error)
            message.error(error.message)
        }
    }


    const enableInsertion = () => {
        setMakeedit(true)
    }

    const cancel = (e) => {
        message.error('Oh O! You were accidentally deleting data');
    }

    const saveNewExam = async (value) => {
        setLoading(true)
        try {
            const sendNewExamData = await addNewExam(value)  //API call to backend
            if (sendNewExamData.statusCode === 1) {
                setMakeedit(false)
                message.success(sendNewExamData.message)
                setLoading(false)
                setTimeout(() => {
                    fetchExamData()
                    navigate("/addExams")
                }, 1000)
            } else {
                setLoading(false)
                console.log("Could not save the data")
                message.error(sendNewExamData.message)
            }
        } catch (error) {
            console.log("Error in creation", error)
            message.error("Failed to create new exam")
        }
    }


    const deleteExam = async (id) => {
        try {
            const deleteExam = await deleteExamById({
                id: id
            })
            if (deleteExam.statusCode === 1) {
                message.success(deleteExam.message)
                navigate('/addExams')
                fetchExamData()
            }
        } catch (error) {
            message.error("Failed to create new exam")
        }
    }


    const AddQuestions = (recordId) => {
        const filteredData = getexam.find(data => data._id === recordId)
        if (filteredData) {
            // console.log("Filtered Data", filteredData)
            const totalQs = filteredData.totalquestion
            const noOfQs = `${filteredData.questions.length}`

            // console.log("totalQs and NoQs", totalQs, " ", noOfQs)
            if (noOfQs < totalQs) {
                navigate(`/api/admin/addQuestionsByExamId/${recordId}`)
            } else {
                message.error("No more questions can be added! Limit reached!")
            }
        } else {
            console.log("No data to filter")
        }

    }


    if (loading) {
        return <Spinner message="Loading!">Loader</Spinner>
    }

    const columns = [
        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Sl No</div>,
            dataIndex: 'serial',
            key: 'serial',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },
        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Exam Name</div>,
            dataIndex: 'examname',
            key: 'examname',
            render: (text, record) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        <Link to={`/api/admin/addQuestionsByExamId/${record._id}`}> {text}</Link>
                    </span>
                </div>
            ),
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Category</div>,
            dataIndex: 'category',
            key: 'category',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Total Marks</div>,
            dataIndex: 'totalmarks',
            key: 'totalmarks',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },
        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Duration</div>,
            dataIndex: 'duration',
            key: 'duration',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },


        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Neg Marks</div>,
            dataIndex: 'negativemarks',
            key: 'negativemarks',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },
        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Marks Per Qs</div>,
            dataIndex: 'marksperquestion',
            key: 'marksperquestion',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Total Qs Set</div>,
            dataIndex: 'questions',
            key: 'questions',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Price</div>,
            dataIndex: 'price',
            key: 'price',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Validity</div>,
            dataIndex: 'validity',
            key: 'validity',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '12px', textAlign: 'center' }}>
                        {text}
                    </span>
                </div>
            ),
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Action</div>,
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <div className='flex gap-3 cursor-pointer'>
                    <i onClick={() => {
                        //console.log("record", record)
                        navigate(`/api/admin/editExamById/${record._id}`)
                    }}><span className="material-symbols-outlined">
                            edit
                        </span></i>
                    <Popconfirm title="Are you sure to delete?"
                        onConfirm={() => deleteExam(record._id)}
                        onCancel={cancel}
                        okText="Sure"
                        cancelText="Cancel"
                        overlayClassName='custom-popconfirm'
                    >
                        <i ><span className="material-symbols-outlined text-sm">
                            delete
                        </span></i>
                    </Popconfirm>
                </div>
            )
        },

        {
            title: <div style={{ fontSize: '13px', color: 'black', textAlign: 'center' }}>Add Questions</div>,
            dataIndex: 'addquestions',
            key: 'addquestions',
            render: (_, record) => (
                <div className='flex items-center justify-center text-2xl h-4 text-green-600 cursor-pointer'>

                    <i onClick={() => AddQuestions(record._id)}>
                        <span className="material-symbols-outlined text-md">
                            playlist_add
                        </span>
                    </i>
                </div>
            )
        },
    ];

    const data = getexam.length > 0 ? getexam?.map((data, index) => ({
        key: index.toString(),
        serial: (index + 1).toString(),
        _id: data._id,
        examname: data.examname,
        totalquestion: data.totalquestion,
        category: data.category,
        totalmarks: data.totalmarks,
        duration: data.duration,
        negativemarks: data.negativemarks,
        marksperquestion: data.marksperquestion,
        questions: data.questions.length,
        price: data.price,
        validity: data.validity

    })) : [];

    console.log("DAta in Allexams", data)

    return (
        <div className='container'>
            <div className='flex justify-between py-3 mt-2 lg:mt-4 p-6 bg-slate-100 border-gray-500 rounded-xl'>
                <h1 className='items-center justify-center text-center font-extrabold text-gray-800 text-xl leading-9'>ADMIN</h1>
                <Button className='bg-white flex items-center text-sky-500 font-bold'
                    onClick={enableInsertion}
                ><span className="material-symbols-outlined"
                >add
                    </span>Create Exams</Button>
            </div>

            {/* Division for Creating a new exam */}
            {!makeedit ? '' : (
                <div className='bg-slate-100 rounded-xl mt-3 lg:mt-6 flex flex-col items-center justify-center'>
                    <div className='bg-white p-4 rounded-xl mt-3 mb-3 w-72 md:w-[477px] lg:w-[600px]'>
                        <Form layout='vertical' autoComplete='off' onFinish={saveNewExam}>
                            <Form.Item
                                name="examname"
                                label="Exam Name"
                                className='text-center text-sm'
                                rules={[
                                    { required: true }
                                ]}
                            >
                                <Input type='text' className='border border-1 border-gray-600' placeholder='Name of the examination' />
                            </Form.Item>

                            <Row gutter={[10, 10]}>
                                <Col span={8}>
                                    <Form.Item
                                        name="duration"
                                        label="Duration in sec"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Duration' />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="totalquestion"
                                        label="Questions"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Total questions' />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        name="totalmarks"
                                        label="Marks"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Total Marks' />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Form.Item
                                name="category"
                                label="Subject Category"
                                className='text-center text-sm'
                                rules={[
                                    { required: true }
                                ]}
                            >
                                <Select placeholder="Select exam category" className='border border-gray-600 rounded-md'>
                                    <Select.Option value="reactjs">ReactJS</Select.Option>
                                    <Select.Option value="javascript">JavaScript</Select.Option>
                                    <Select.Option value="english">English</Select.Option>
                                    <Select.Option value="mathematics">Mathematics</Select.Option>
                                    <Select.Option value="reasoning">Reasoning</Select.Option>
                                    <Select.Option value="general awareness">General Awareness</Select.Option>
                                    <Select.Option value="history">History</Select.Option>
                                </Select>
                            </Form.Item>

                            <Row gutter={[10, 10]}>
                                <Col span={8}>
                                    <Form.Item
                                        name="cutoff"
                                        label="Cut Off Marks"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Cut off marks' />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        name="negativemarks"
                                        label="Neg Marks"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Negative marks' />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        name="marksperquestion"
                                        label="Pos Marks"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='marks per question' />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        name="price"
                                        label="Price"
                                        className='text-center text-sm'
                                        rules={[
                                            { required: true }
                                        ]}
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Exam Price' />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        name="validity"
                                        label="Validity"
                                        className='text-center text-sm'
                                    >
                                        <Input type='number' className='border border-1 border-gray-600' placeholder='Exam Validity' />
                                    </Form.Item>
                                </Col>
                            </Row>

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
                    </div>
                </div>
            )}
            {/* End of creating new exam */}


            {/* Table for showing existing exam data */}
            {!getexam ? '' : (
                <div className='bg-slate-100 rounded-xl mt-3 lg:mt-6 flex md:flex-col items-center justify-center pt-3'>
                    <div className='items-center justify-center text-center w-72 md:w-[500px] lg:w-[1050px] mb-3 rounded-xl'>
                        <div className='w-full text-sm'>
                            <Table columns={columns} dataSource={data} className='uppercase text-center items-center justify-center' scroll={{ x: true }} bordered />
                        </div>
                    </div>
                    <FloatButton.Group
                        trigger="hover"
                        type="primary"
                        style={{
                            right: 94,
                        }}
                        icon={<CustomerServiceOutlined />}
                    >

                        <FloatButton
                            onClick={() => { navigate(`/api/admin/editExamById/${''}`) }}
                            icon={<CommentOutlined />} />
                    </FloatButton.Group>
                </div>
            )}

            {/* End of table for existing exam data */}
        </div>
    )
}

export default Allexams