import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Table } from 'antd';

const ExamResult = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const gotoTestPage = () => {
        navigate('/testseries')
    }
    const propsData = location?.state?.result
    const propsExamData = location?.state?.examdata

    console.log("Props data in result", propsData, propsExamData)
    console.log("Props exam data in result", propsExamData)




    //Columns for table
    const columns = [
        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Exam Name</div>,
            dataIndex: 'examName',
            key: 'examName',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },

        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Correct Answers</div>,
            dataIndex: 'correctAnswer',
            key: 'correctAnswer',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },

        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Wrong Answers</div>,
            dataIndex: 'wrongAnswer',
            key: 'wrongAnswer',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },

        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Negative Marks</div>,
            dataIndex: 'negMarks',
            key: 'negMarks',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'red', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },

        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Questions Skipped</div>,
            dataIndex: 'skippedAnswer',
            key: 'skippedAnswer',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },

        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Score</div>,
            dataIndex: 'netScore',
            key: 'netScore',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },

        {
            title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Result</div>,
            dataIndex: 'result',
            key: 'result',
            render: (text) => (
                <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: text === 'FAILED' ? 'red' : 'green', fontSize: '13px', textAlign: 'center', fontWeight: text === 'FAILED' ? 'extra-bold' : 'bold' }}>
                        {text}
                    </span>
                </div>

            ),
        },
    ]


    const data = [{
        correctAnswer: propsData?.correctAns.length,
        wrongAnswer: propsData?.wrongAns.length,
        skippedAnswer: propsData?.skippedAns.length,
        negMarks: propsData?.negMarks,
        netScore: propsData?.netScore,
        result: propsData?.verdict,
        examName: propsExamData?.examname
    }]
    console.log("Data in result is", data)

    return (
        <div className='container'>
            <section className='flex flex-col justify-center items-center'>
                <div className='lg:w-[470px] mx-auto'>
                    <h1 className='text-center text-xl justify-center items-center leading-4 md:text-md md:leading-[40px]'>Exam Result for <span className='text-purple-500'>{data.map((d) => d.examName)}</span></h1>
                </div>
                <div className='rounded-2xl mt-3 lg:mt-5 flex md:flex-col items-center justify-center pb-2'>
                    <div className='text-center items-center justify-center w-72 md:w-[500px] lg:w-[1050px] mb-3'>
                        <div className='w-full '>
                            <Table
                                className='uppercase  text-center items-center justify-center text-xs'
                                columns={columns}
                                dataSource={data} //used for searching
                                pagination={true}
                                scroll={{ x: true }}
                                bordered
                            />
                        </div>
                    </div>
                </div>

                <h1>Later Need Charts here like BAR Chart, Pie Chart etc</h1>

                <div className='flex w-4/5 justify-center items-center'>
                    <button className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out' onClick={gotoTestPage}>Go Test Page</button>
                </div>
            </section>
        </div>
    )
}

export default ExamResult