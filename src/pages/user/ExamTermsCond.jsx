import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { getExamDetailsForUser, getAllQuestionsByExamId, saveQuestionAttempts } from '../../apicalls/usersapicall';
import { message } from 'antd';
import Spinner from '../../components/Loader/Spinner';
import { useSelector } from 'react-redux';



const ExamTermsCond = () => {
  const { isLoaded, isSignedIn } = useUser(); //Using clerk signin
  const navigate = useNavigate()
  const { examid } = useParams() //As examid is coming from Test series
  const { userall } = useSelector((state) => state.users) //Retrieving user details from redux

  const [examdata, setExamdata] = useState([])
  const [loading, setLoading] = useState(false)
  const [startexam, setStartExam] = useState(true)
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState([])
  const [selectedopt, setSelectedopt] = useState([])
  const [result, setResult] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(examdata?.duration || 0);

  const goTestPage = () => {
    navigate(-1)
  }

  const beginExamination = async () => {
    setLoading(true)
    setStartExam(false)
    await getQuestions()
    setLoading(false)

    let timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Optionally, you can add logic for what happens when the timer reaches 0
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return undefined
    }
    fetchExamData(examid)
  }, [examid, isLoaded, isSignedIn])



  const fetchExamData = async (payload) => {
    try {
      setLoading(true)
      const getData = await getExamDetailsForUser(payload)
      if (getData.statusCode === 1) {
        console.log("Get single exam data details in T&C", getData)
        setExamdata(getData.data)
        setTimeLeft(getData.data.duration)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error in getting exam data", error)
      message.error(error.message)
    }
  }


  const getQuestions = async () => {
    setLoading(true)
    try {
      const fetchQs = await getAllQuestionsByExamId({
        examId: examid
      })
      //console.log("Fetched Question", fetchQs.data.questions)
      if (fetchQs.statusCode === 1) {
        setLoading(false)
        setQuestion(fetchQs.data.questions)
        message.success(fetchQs.message)
      } else {
        setLoading(false)
        message.error("Error in getting question data")
      }
    } catch (error) {
      setLoading(false)
      message.error(error.message)
      console.log("Error in populating question", error)
    }
  }


  const evaluateResult = async () => {
    setLoading(true)
    let correctAns = []
    let wrongAns = []
    let skippedAns = []


    question.forEach((data, loopNo) => {
      if (data.correctans === selectedopt[loopNo]) {
        correctAns.push(selectedopt[loopNo])
      } else if (!selectedopt[loopNo]) {
        skippedAns.push(`${loopNo + 1}`)
      } else {
        wrongAns.push(selectedopt[loopNo])
      }
    })

    let negMarks = `${wrongAns.length * examdata?.negativemarks}`
    let netScore = `${correctAns.length - negMarks}`
    let verdict = netScore >= examdata?.cutoff ? "PASSED" : "FAILED"

    const resultData = { correctAns, wrongAns, skippedAns, negMarks, netScore, verdict }
    setResult(resultData)

    const response = await saveQuestionAttempts({
      user: userall._id,
      examination: examid,
      result: resultData
    })

    if (response.statusCode === 1) {
      message.success(response.message)
    }
    if (response.statusCode === 0) {
      message.error(response.message)
    }
   

    setSubmitted(true)
    setLoading(false)
  }


  const showResult = () => {
    //try to implement useMemo here later
    navigate(`/examResult/${examid}`, { state: { result, examdata } })
  }

  if (loading) {
    return <Spinner message="Loading!">Loader</Spinner>
  }




  //console.log("Exam data hook in T&C is", examdata)

  return (
    <div className='container '>
      <div className='bg-gray-200 rounded-xl'>
        {/* If startexam hook is true then hide all T & C */}

        {startexam ? (

          <>
            <div className='flex justify-center items-center '>
              <h1 className='text-center text-xs md:text-sm lg:text-2xl mt-3 text-blue-800'>{examdata?.examname}</h1>
            </div>
            <div className='flex justify-center items-center '>
              <h1 className='text-center text-xs md:text-sm lg:text-xl mt-3 text-blue-800'>Terms and Conditions </h1>
            </div>

            {/* For instructions details */}
            <div className='flex md:flex-col items-center justify-center mt-2 lg:mt-5'>
              <div className='flex items-center justify-center w-72 md:w-[400px] lg:w-[850px] bg-white '>
                {/* <h1 className='items-center justify-center text-sm lg:text-xl p-2 lg:mr-2'>Please read the instructions carefullly before proceeding:</h1> */}
                <ul className='items-center justify-center text-xs md:text-sm lg:text-base p-3 list-decimal leading-7 w-40 md:w-[200px] lg:w-[500px] text-justify'>
                  <li className='ml-2 pl-2'>You can give only one correct answer for a question.</li>
                  <li className='ml-2 pl-2'>Each questin will carry one mark for correct answer.</li>
                  <li className='ml-2 pl-2'>For each wrong answer there will a negative marks of <strong>0.25.</strong></li>
                  <li className='ml-2 pl-2'>Total marks for the examination is <strong>{examdata?.totalmarks} .</strong> </li>
                  <li className='ml-2 pl-2'>Cut off marks is <span><strong>{examdata?.cutoff} .</strong></span></li>
                  <li className='ml-2 pl-2'>A clock will appear for referencing the time.</li>
                  <li className='ml-2 pl-2'>You should not open any other window during examination.</li>
                  <li className='ml-2 pl-2'>To remove your response, just click again on the same option again.</li>
                  <li className='ml-2 pl-2'>The clock in the screen will show you the remaining time.</li>
                  <li className='ml-2 pl-2'>Do not use any gadget as this may terminate your exam.</li>
                  <li className='ml-2 pl-2'>Your computer should have active internet conection throughout the examination.</li>
                  <li className='ml-2 pl-2'>Once started, you cannot re-take the exam.</li>
                </ul>
              </div>
            </div>

            {/* For buttons */}
            <div className='flex-col items-center justify-center mb-4'>
              <div className='mt-3 p-2'>
                <h1 className='items-center justify-center text-center text-sm lg:text-xl p-2 lg:mr-2'>On clicking proceed button you are giving consent to accept the above instructions and guidelines.</h1>
              </div>

              <div className='flex justify-center items-center pl-5 pr-5'>
                <div className='p-2'>
                  <button className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                    onClick={beginExamination}
                  >I Accept</button>
                </div>

                <div className='p-2'>
                  <button className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                    onClick={goTestPage}
                  >Go Back</button>
                </div>

              </div>
            </div>
          </>
        ) : (
          <div className='p-2'>
            {/* Otherwise, Show here the questions */}
            <div className='flex justify-center items-center'>
              {timeLeft < 0 || submitted ? (
                <h1 className="text-center text-xs md:text-sm lg:text-2xl mt-3 text-blue-800">Exam is over!</h1>
              ) : (
                <h1 className="text-center text-xs md:text-sm lg:text-2xl mt-3 text-blue-800">Time Left: {formatTime(timeLeft)}</h1>
              )}
            </div>
            <h1 className='text-center text-xl justify-center items-center leading-4 md:text-md md:leading-[40px]'>Hi! <span className='text-purple-500'>{userall?.name}</span></h1>
            <div className='bg-gray-200 rounded-lg'>
              {question?.length === 0 ? ( //If no question is available then show red bordered msg
                <div className='p-2 flex justify-center flex-col '>
                  <div className='w-full flex flex-col justify-center items-center'>
                    <h1 className='p-2 rounded-xl text-center font-semibold  text-red-500 border-red-600 border-dashed border-spacing-7 border-2'>Sorry! This section currently does not have any questions.</h1>

                  </div>
                  <button className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                    onClick={goTestPage}
                  >Go Back</button>
                </div>
              ) : (

                <div className='bg-white flex items-center justify-center flex-col p-2 mt-2'>
                  {submitted || timeLeft < 0 ? (
                    <div className='mb-5 p-2 flex flex-col w-1/4'>
                      <h1 className='p-2 rounded-md text-center font-semibold  text-green-500 border-green-600 border-dashed border-spacing-7 border-2'>Exam Over</h1>
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
                        onClick={() => showResult()} //Here try to implement useMemo
                      >Show Result</button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h1 className='text-center items-center'>Qs. No. {index + 1}: {" "} {question[index]?.questionname}</h1>
                      </div>

                      {/* For showing Multiple Choice Options */}
                      <div className='flex flex-col mt-2 p-2 leading-8'>
                        {Object.keys(question[index]?.options).map((data, indice) => {
                          return ( //Dynamic class name to highlight the selected option
                            <div className={`${selectedopt[index] === data ? "flex pl-2 pr-2 rounded-md mt-1 mb-1 bg-sky-400 text-white ease-linear transition-all duration-400" : "bg-gray-200 pl-2 pr-2 rounded-md mt-1 mb-1"}`}
                              key={indice}
                              onClick={() => { //Function for selecting and highlighting the selected option
                                setSelectedopt({
                                  ...selectedopt, [index]: data
                                })
                              }}
                            >
                              <h1>{data}: {question[index].options[data]}</h1>
                            </div>
                          )
                        })}
                      </div>
                      {/* End For showing Multiple Choice Options */}


                      {/* For showing Prev and Next button */}
                      <div className='flex flex-row'>
                        {index > 0 && (
                          <div className='mr-2 p-1 mb-1'>
                            <button
                              className='md:text-base mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center  rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                              onClick={() => setIndex(index - 1)}>Prev</button>
                          </div>
                        )}

                        {index < question.length - 1 && (
                          <div className='ml-2 p-1 mb-1'>
                            <button
                              className='md:text-base mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center  rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                              onClick={() => setIndex(index + 1)}>Next</button>
                          </div>
                        )}


                        {/* For Clear button */}
                        <div className='ml-2 p-1 mb-1'>
                          <button
                            className='md:text-base mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center  rounded-lg border border-none bg-amber-500 hover:bg-amber-700 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                            onClick={() => {
                              setSelectedopt({
                                ...selectedopt, [index]: null
                              })
                            }}>Clear</button>
                        </div>
                        {/* End For Clear button */}


                        {/* For submitting exam and showing report */}
                        {index === question.length - 1 && (
                          <div className='ml-2 p-1 mb-1'>
                            {submitted === false  || timeLeft === 0 ? (
                              <button
                                type='button'
                                className='md:text-base mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center  rounded-lg border border-none bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out cursor-pointer'
                                onClick={evaluateResult}
                              >Submit</button>
                            ) : (
                              <button
                                type='button'
                                className='md:text-base mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center  rounded-lg border border-none bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:ring-white text-white hover:transition-all hover:duration-700 hover:ease-in-out'
                                disabled
                              >Submit</button>
                            )}
                          </div>
                        )}
                        {/* End For submitting exam and showing report */}
                      </div>
                      {/*End For showing Prev, Clear and Next button */}
                    </>
                  )}
                </div>
              )}
              {/* End of questions section */}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

// Function to format time
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  // 200 / 3600 ≈ 0.0556
  // Math.floor(0.0556) = 0
  // So, the result of Math.floor(200 / 3600) is 0, indicating that there are 0 whole hours in 200 seconds.
  const minutes = Math.floor((seconds % 3600) / 60);
  //seconds % 3600: This is 200 % 3600, which is equal to 200 since 200 is less than 3600. This represents the remaining seconds after removing whole hours.
  const remainingSeconds = seconds % 60;
  //200 % 60 is 20. So seconds will be 20 seconds remainder.

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default ExamTermsCond