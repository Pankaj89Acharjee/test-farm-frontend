import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import moment from 'moment';

const Cardcomponent = ({ propdata }) => {
    //propdata is coming from OrderHistory.jsx
    const orderData = propdata.data

    console.log("Propdata in card component", orderData)
    return (
        <div className='container'>
            {orderData?.map((data, index) => (
                <Card key={index} className="w-full flex-row mt-3 mb-3">
                    <CardHeader
                        shadow={false}
                        floated={true}
                        className="m-0 w-2/5 shrink-0 rounded-lg items-center justify-between ml-3 lg:ml-3 p-1 lg:p-2 hidden md:flex"
                    >
                        <Typography variant="h6" color="gray" className="mb-4 uppercase bg-cyan-400 p-2 rounded-md shadow-md shadow-gray-400">
                            {data.exams.examname}
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h4" color="blue-gray" className="mb-6 shadow-lg shadow-gray-300 p-1 rounded-md bg-gray-200 text-center">
                            {data.exams.examname}
                        </Typography>
                        <Typography variant="h6" color="gray" className="mb-4 uppercase ">
                            Price: {data.exams.price} /-
                        </Typography>
                        <Typography color="gray" className="mb-8">
                            <strong>Purchased on:</strong> {`${moment(data.createdAt).format('DD-MMM-YYYY')}`}
                        </Typography>
                        <Typography color="gray" className="mb-8">
                            <strong>Payment Id:</strong> {data.paymentid}
                        </Typography>
                        <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2 mt-6 md:mt-6 lg:mt-8 py-1 px-2 text-center rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out">
                                Order Details
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                    </CardBody>
                </Card>
            ))} 
        </div>
    )
}

export default Cardcomponent



