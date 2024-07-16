import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Select, Space, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { editExamById, updateExamById } from '../../apicalls/adminapicall'


const EditExamById = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [examinationdata, setExaminationdata] = useState([])
    const [submittable, setSubmittable] = useState(false)

    //console.log("examinationdata", examinationdata.data.category)
    useEffect(() => {
        fetchExamData(id)
    }, [id])

    const fetchExamData = async (payload) => {
        try {
            setSubmittable(true)
            const getData = await editExamById(payload)
            if (getData.statusCode === 1) {
                //console.log("Get single exam data", getData)
                setExaminationdata(getData)
            }
        } catch (error) {
            console.log("Error in getting exam data", error)
            message.error(error.message)
        }
    }

    const updateExamDetails = async (values) => {
        try {
            const sendData = await updateExamById({
                id: id,
                ...values
            })
            if (sendData.statusCode === 1) {
                message.success(sendData.message)
                setSubmittable(false)
                navigate("/addExams")
            }
        } catch (error) {
            console.log("Error in updating exam data", error)
            message.error(error.message)
        }
    }


    return (
        <div className='container'>
            <div className='bg-slate-100 rounded-xl mt-3 lg:mt-6 flex flex-col items-center justify-center'>
                {examinationdata.length === 0 ? '' : (
                    <>
                        <div>
                            <Form layout='vertical' autoComplete='off' onFinish={updateExamDetails} initialValues={examinationdata.data} >
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
                                            label="Duration"
                                            className='text-center text-sm'
                                            rules={[
                                                { required: true }
                                            ]}
                                        >
                                            <Input
                                                type='number' className='border border-1 border-gray-600' placeholder='Duration'
                                            />
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
                                </Row>

                                <Row gutter={[10, 10]}>
                                    <Col span={8}>
                                        <Form.Item
                                            name="price"
                                            label="Price"
                                            className='text-center text-sm'
                                            rules={[
                                                { required: true }
                                            ]}
                                        >
                                            <Input type='number' className='border border-1 border-gray-600' placeholder='Price of question' />
                                        </Form.Item>
                                    </Col>



                                    <Col span={8}>
                                        <Form.Item
                                            name="validity"
                                            label="Validity"
                                            className='text-center text-sm'
                                            rules={[
                                                { required: true }
                                            ]}
                                        >
                                            <Input type='number' className='border border-1 border-gray-600' placeholder='Exam Validity' />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item className='flex items-center justify-center'>
                                    <Space>
                                        {submittable ? (
                                            <>
                                                <Button htmlType='submit'
                                                >Update</Button>
                                                <Button htmlType='reset'>Reset</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                >Edit</Button>
                                            </>
                                        )}
                                    </Space>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                )}


            </div>

        </div>
    )
}

export default EditExamById