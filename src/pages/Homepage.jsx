import React, { useEffect } from 'react'
import { Button, message } from 'antd'
import { useUser } from '@clerk/clerk-react'
import { registerNewUser } from '../apicalls/usersapicall'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/actions/userSlice.js'
import { Link } from 'react-router-dom'
import Student1 from '../assets/Examinee.png'
import Student2 from '../assets/Examinee2.png'
import Student3 from '../assets/Examinee3.png'



const Homepage = () => {
  const dispatch = useDispatch()
  const { userall } = useSelector((state) => state.users)
  const { isLoaded, isSignedIn, user } = useUser();

  //console.log("User all redux is", userall)
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !isSignedIn) {
        return undefined;
      }

      if (isSignedIn) {
        try {
          let email = user?.primaryEmailAddress?.emailAddress
          let userId = user?.id;
          let name = user?.fullName;
          let phone = user?.primaryPhoneNumber.phoneNumber;
          let payload = {
            userId: userId,
            name: name,
            email: email,
            phone: phone,
            isAdmin: false
          }

          const registerUser = await registerNewUser(payload)

          if (registerUser.statusCode === "0") {
            dispatch(SetUser(registerUser.data))
            console.log(registerUser.message)
            message.success("Welcome")
          }
          if (registerUser?.statusCode === "1") {
            console.log("User registered");
            message.success(registerUser?.message)
          }

        } catch (error) {
          console.error("Error fetching data:", error);
          message.error(error.message)
        }
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, user, dispatch]);

  return (

    <div>
      {isSignedIn ? (
        <>
          <div className='container'>
            {/* Banner section */}
            <section className='pt-[60px] 2xl:h-[800px]'>
              <div>
                {/* Flex container */}
                <div className='flex flex-col lg:flex-row gap-20 items-center justify-between'>
                  <div>
                    {/* Banner content */}
                    <div className='lg:w-[570px]'>
                      <h1 className='text-[36px] font-Murecho leading-[46px] text-green-500 font-extrabold md:text-[60px] md:leading-[70px]'>
                        Prepare yourself and land your dream job
                      </h1>
                      <p className='font-xl text-green-950 py-2 leading-7 font-Murecho mt-2 lg:mt-4'>
                        A world class testing portal for your self-assessment. All questions are set by veteran experts with their 25 years of knowledge in the examination and teaching field. No need to worry about! Just prepare yourself.
                      </p>
                      <div className='flex flex-row py-3 mt-2 lg:mt-4'>
                        <Link to="#" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>
                          View All Tests
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-7 justify-end '>
                    <div>
                      <img src={Student1} alt='student1' className='w-full rounded-2xl' />
                    </div>
                    <div className='mt-[30px]'>
                      <img src={Student2} alt="student2" className='w-full mb-7 rounded-full' />
                      <img src={Student3} alt="student3" className='w-full rounded-2xl p-3' />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Body content after banner for holding different exams */}
            <section>
              <div className='container'>
                <div className='lg:w-470px mx-auto'>
                  <h1 className='text-center text-[24px] justify-center items-center leading-7 md:text-[45px] md:leading-[40px] text-blue-800'>
                    Several exams from State PSC, UPSC, as well as state government exams, Banking to mock up.
                  </h1>
                </div>

                {/* For holding different specialist doctors image */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 mt-6 lg:mt-12'>

                  {/* 1st Exam topic */}
                  <div className='px-5 py-7 bg-green-200 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                      <img src={Student1} alt="neurologist" className='rounded-full h-44 w-44' />
                    </div>
                    <div>
                      <h2 className='items-center justify-center text-center mt-2 lg:mt-4 font-mono font-extrabold text-blue-800 text-xl leading-9'>Dr. Wrikcheng Wedeke</h2>
                      <p className='text-sm leading-6 text-gray-700 mt-4 justify-center text-justify'>A veteran specialist in Neurological Sciences with over 25 years of experience. An alumni of North American Neurological Sciences and Institute with over 10 years of consistent research analytics has made a tremendous benchmark in the hiostory of Neuro-sciences.</p>
                    </div>
                    <div className='flex flex-row mt-5 lg:mt-8 items-center justify-between px-5 '>
                      <div className='items-center'>
                        <Link to="" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Book</Link>
                      </div>

                      <div className='item-center justify-center  bg-rose-500 bg-repeat-round rounded-2xl px-3'>
                        <h2 className='text-center text-sm font-extrabold'>Fees 800 INR</h2>
                      </div>
                    </div>
                  </div>

                  {/* 2nd Exam topic */}
                  <div className='px-5 py-7 bg-green-200 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                      <img src={Student1} alt="gastro" className='rounded-full h-44 w-44' />
                    </div>
                    <div>
                      <h2 className='items-center justify-center text-center mt-2 lg:mt-4 font-mono font-extrabold text-blue-800 text-xl leading-9'>Dr. Yangchu Ming</h2>
                      <p className='text-sm leading-6 text-gray-700 mt-4 justify-center text-justify'>With the benchmark in the technology and the rapid research, Dr. Ming has an extent level of research knowledge and expertise in gastrointestinal disorder. She has expertise on colon-study and hands-on experience in handling severe and acute gastrointestinal disorders.</p>
                    </div>
                    <div className='flex flex-row mt-5 lg:mt-8 items-center justify-between px-5 '>
                      <div className='items-center'>
                        <Link to="" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Book</Link>
                      </div>

                      <div className='item-center justify-center  bg-rose-500 bg-repeat-round rounded-2xl px-3'>
                        <h2 className='text-center text-sm font-extrabold'>Fees 800 INR</h2>
                      </div>
                    </div>
                  </div>


                  {/* 3rd Exam topic */}
                  <div className='px-5 py-7 bg-green-200 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                      <img src={Student1} alt="psycho" className='rounded-full h-44 w-44' />
                    </div>
                    <div>
                      <h2 className='items-center justify-center text-center mt-2 lg:mt-4 font-mono font-extrabold text-blue-800 text-xl leading-9'>Dr. David Russel</h2>
                      <p className='text-sm leading-6 text-gray-700 mt-4 justify-center text-justify'>A veteran specialist in Neurological Sciences with over 25 years of experience. An alumni of North American Neurological Sciences and Institute with over 10 years of consistent research analytics has made a tremendous benchmark in the hiostory of Neuro-sciences.</p>
                    </div>
                    <div className='flex flex-row mt-5 lg:mt-8 items-center justify-between px-5 '>
                      <div className='items-center'>
                        <Link to="" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Book</Link>
                      </div>

                      <div className='item-center justify-center  bg-rose-500 bg-repeat-round rounded-2xl px-3'>
                        <h2 className='text-center text-sm font-extrabold'>Fees 800 INR</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* Ammenities Section */}
            <section>
              <div className="container">
                <div className='xl:w-[470px] mx-auto'>
                  <h1 className='text-[36px] leading-[46px] text-green-500 font-extrabold md:text-[60px] md:leading-[70px] text-center'>
                    Ammenities
                  </h1>
                  <p className='text-center text_para text-gray-700'>All the ammenities are exceptional and best of quality. Your utmost satisfaction is our pleasure.</p>
                </div>

              </div>
            </section>
            {/* End of Ammenities Section */}



            {/* Laboratory Section */}
            <section>
              <div className='flex items-center justify-between flex-col lg:flex-row'>

              </div>
            </section>

            {/* End of Laboratory Section */}


          </div>
        </>
      ) : (
        <>
          <div className='container'>
            {/* Banner section */}
            <section className='pt-[60px] 2xl:h-[800px]'>
              <div>
                {/* Flex container */}
                <div className='flex flex-col lg:flex-row gap-20 items-center justify-between'>
                  <div>
                    {/* Banner content */}
                    <div className='lg:w-[570px]'>
                      <h1 className='text-[36px] font-Murecho leading-[46px] text-green-500 font-extrabold md:text-[60px] md:leading-[70px]'>
                        Prepare yourself and land your dream job
                      </h1>
                      <p className='font-xl text-green-950 py-2 leading-7 font-Murecho mt-2 lg:mt-4'>
                        A world class testing portal for your self-assessment. All questions are set by veteran experts with their 25 years of knowledge in the examination and teaching field. No need to worry about! Just prepare yourself.
                      </p>
                      <div className='flex flex-row py-3 mt-2 lg:mt-4'>
                        <Link to="#" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>
                          View All Tests
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-7 justify-end '>
                    <div>
                      <img src={Student1} alt='student1' className='w-full rounded-2xl' />
                    </div>
                    <div className='mt-[30px]'>
                      <img src={Student2} alt="student2" className='w-full mb-7 rounded-full' />
                      <img src={Student3} alt="student3" className='w-full rounded-2xl p-3' />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Body content after banner for holding different exams */}
            <section>
              <div className='container'>
                <div className='lg:w-470px mx-auto'>
                  <h1 className='text-center text-[24px] justify-center items-center leading-7 md:text-[45px] md:leading-[40px] text-blue-800'>
                    Several exams from State PSC, UPSC, as well as state government exams, Banking to mock up.
                  </h1>
                </div>

                {/* For holding different specialist doctors image */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 mt-6 lg:mt-12'>

                  {/* 1st Exam topic */}
                  <div className='px-5 py-7 bg-green-200 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                      <img src={Student1} alt="neurologist" className='rounded-full h-44 w-44' />
                    </div>
                    <div>
                      <h2 className='items-center justify-center text-center mt-2 lg:mt-4 font-mono font-extrabold text-blue-800 text-xl leading-9'>Dr. Wrikcheng Wedeke</h2>
                      <p className='text-sm leading-6 text-gray-700 mt-4 justify-center text-justify'>A veteran specialist in Neurological Sciences with over 25 years of experience. An alumni of North American Neurological Sciences and Institute with over 10 years of consistent research analytics has made a tremendous benchmark in the hiostory of Neuro-sciences.</p>
                    </div>
                    <div className='flex flex-row mt-5 lg:mt-8 items-center justify-between px-5 '>
                      <div className='items-center'>
                        <Link to="" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Book</Link>
                      </div>

                      <div className='item-center justify-center  bg-rose-500 bg-repeat-round rounded-2xl px-3'>
                        <h2 className='text-center text-sm font-extrabold'>Fees 800 INR</h2>
                      </div>
                    </div>
                  </div>

                  {/* 2nd Exam topic */}
                  <div className='px-5 py-7 bg-green-200 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                      <img src={Student1} alt="gastro" className='rounded-full h-44 w-44' />
                    </div>
                    <div>
                      <h2 className='items-center justify-center text-center mt-2 lg:mt-4 font-mono font-extrabold text-blue-800 text-xl leading-9'>Dr. Yangchu Ming</h2>
                      <p className='text-sm leading-6 text-gray-700 mt-4 justify-center text-justify'>With the benchmark in the technology and the rapid research, Dr. Ming has an extent level of research knowledge and expertise in gastrointestinal disorder. She has expertise on colon-study and hands-on experience in handling severe and acute gastrointestinal disorders.</p>
                    </div>
                    <div className='flex flex-row mt-5 lg:mt-8 items-center justify-between px-5 '>
                      <div className='items-center'>
                        <Link to="" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Book</Link>
                      </div>

                      <div className='item-center justify-center  bg-rose-500 bg-repeat-round rounded-2xl px-3'>
                        <h2 className='text-center text-sm font-extrabold'>Fees 800 INR</h2>
                      </div>
                    </div>
                  </div>


                  {/* 3rd Exam topic */}
                  <div className='px-5 py-7 bg-green-200 rounded-2xl'>
                    <div className='flex items-center justify-center'>
                      <img src={Student1} alt="psycho" className='rounded-full h-44 w-44' />
                    </div>
                    <div>
                      <h2 className='items-center justify-center text-center mt-2 lg:mt-4 font-mono font-extrabold text-blue-800 text-xl leading-9'>Dr. David Russel</h2>
                      <p className='text-sm leading-6 text-gray-700 mt-4 justify-center text-justify'>A veteran specialist in Neurological Sciences with over 25 years of experience. An alumni of North American Neurological Sciences and Institute with over 10 years of consistent research analytics has made a tremendous benchmark in the hiostory of Neuro-sciences.</p>
                    </div>
                    <div className='flex flex-row mt-5 lg:mt-8 items-center justify-between px-5 '>
                      <div className='items-center'>
                        <Link to="" className='py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-amber-400 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Book</Link>
                      </div>

                      <div className='item-center justify-center  bg-rose-500 bg-repeat-round rounded-2xl px-3'>
                        <h2 className='text-center text-sm font-extrabold'>Fees 800 INR</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* Ammenities Section */}
            <section>
              <div className="container">
                <div className='xl:w-[470px] mx-auto'>
                  <h1 className='text-[36px] leading-[46px] text-green-500 font-extrabold md:text-[60px] md:leading-[70px] text-center'>
                    Ammenities
                  </h1>
                  <p className='text-center text_para text-gray-700'>All the ammenities are exceptional and best of quality. Your utmost satisfaction is our pleasure.</p>
                </div>

              </div>
            </section>
            {/* End of Ammenities Section */}



            {/* Laboratory Section */}
            <section>
              <div className='flex items-center justify-between flex-col lg:flex-row'>

              </div>
            </section>

            {/* End of Laboratory Section */}


          </div>
        </>
      )}
    </div>

  )
}

export default Homepage;
