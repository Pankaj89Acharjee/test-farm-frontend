import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import RRBLogo from '../../assets/RRBLogo.png'
import { ScheduleTwoTone } from '@ant-design/icons'
import { Input, Table } from 'antd'
import { getAllExamDataForUser } from '../../apicalls/usersapicall';


const Testseries = () => {

  const { isLoaded, isSignedIn } = useUser(); //Using clerk signin
  const { userall } = useSelector((state) => state.users) //Retrieving user details from redux

  const [search, setSearch] = useState('')
  const [examdata, setExamdata] = useState([])
  const [loading, setLoading] = useState(false)
  const [filtereddata, setFiltereddata] = useState([])

  const fetchExamData = async () => {
    try {
      setLoading(true)
      const getAllExams = await getAllExamDataForUser()
      if (getAllExams.statusCode === 1) {
        setExamdata(getAllExams.data)
        //console.log("All exam data in user test series", getAllExams)
        setLoading(false)
      } else {
        setLoading(false)
        console.log("Error in fetching data")
      }
    } catch (err) {
      console.log("Error in fetching data")
    }
  }


  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return undefined
    }
    fetchExamData()
  }, [isLoaded, isSignedIn])



  const columns = [
    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Sl No</div>,
      dataIndex: 'serial',
      key: 'serial',
      render: (text) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>
            {text}
          </span>
        </div>

      ),
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Exam Name</div>,
      dataIndex: 'examname',
      key: 'examname',
      filteredValue: [search],
      onFilter: (value, record) => {
        return record.examname.toLowerCase().includes(value.toLowerCase())
      },
      render: (text) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>
            {text}
          </span>
        </div>
      ),
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Duration</div>,
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>
            {text}
          </span>
        </div>

      ),
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Total Question</div>,
      dataIndex: 'totalquestion',
      key: 'totalquestion',
      render: (text) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>
            {text}
          </span>
        </div>

      ),
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Cut Off</div>,
      dataIndex: 'cutoff',
      key: 'cutoff',
      render: (text) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>
            {text}
          </span>
        </div>

      ),
    },

    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Question set</div>,
      dataIndex: 'questionset',
      key: 'questionset',
      render: (text) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>
            {text}
          </span>
        </div>

      ),
    },


    {
      title: <div style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>Action</div>,
      dataIndex: 'startexam',
      key: 'startexam',
      render: (_, record) => (
        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: '12' }}>
          <Link to={`/terms&conditions/${record.examid}`} className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-xs text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>Start</Link>
        </div>

      ),
    },
  ]

  const data = examdata?.length > 0 ? examdata?.map((data, index) => ({
    key: index.toString(),
    examid: data._id,
    serial: (index + 1).toString(),
    examname: data.examname,
    duration: data.duration,
    totalquestion: data.totalquestion,
    cutoff: data.cutoff,
    questionset: data.questions.length

  })) : []

  if (data) {
    console.log("Data is", data)
  }

  return (
    <div>
      {isSignedIn ? (
        <>
          <div className='container'>
            <section className='bg-gray-200 rounded-2xl '>
              <div className='lg:w-[470px] mx-auto'>
                <h1 className='text-center text-xl justify-center items-center leading-4 md:text-md md:leading-[40px]'>Welcome to exam section, <span className='text-purple-500'>{userall?.name} !</span></h1>
              </div>
              {/* For search bar of exams */}
              <div className='flex items-center justify-center mt-3 lg:mt-4 pl-2 pr-2 md:pl-3 md:pr-3 lg:pl-4 lg:pr-4'>
                <div className='items-center justify-center w-64 md:w-72 lg:w-96'>
                  <Input.Search
                    placeholder='Search exam'
                    style={{ textAlign: 'center' }}
                    //For searching functionality
                    onChange={(e) => {
                      const searchText = e.target.value
                      setSearch(searchText)
                      const filter = examdata.filter((item) => {
                        return item.examname.toLowerCase().includes(searchText.toLowerCase())
                      })
                      setFiltereddata(filter)
                    }}
                  />
                </div>
              </div>


              {loading ? <div>Loading</div> : (
                <div className='rounded-2xl mt-3 lg:mt-5 flex md:flex-col items-center justify-center pb-2'>
                  <div className='text-center items-center justify-center w-72 md:w-[500px] lg:w-[1050px] mb-3'>
                    <div className='w-full '>
                      <Table
                        className='uppercase  text-center items-center justify-center text-xs'
                        columns={columns}
                        dataSource={search ? filtereddata : data} //used for searching
                        pagination={true}
                        scroll={{ x: true }}
                        bordered
                      />
                    </div>
                  </div>
                </div>

              )}


              {/* For showing different exam names */}
              <div className='pl-2 pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 mt-6 lg:mt-12'>

                {/* 1st Exam topic */}
                <div className='py-2 px-2 bg-[#F5F5F5] rounded-2xl h-[400px]'  >
                  <div>
                    <h1 className='text-center font-bold text-sm items-center lg:text-base'><span className='mr-3 ' style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center' }}><ScheduleTwoTone /></span>English Short Test</h1>
                  </div>
                  <hr className='bg-gray-400 h-0.5 mt-1 mb-2' />
                  <div className='flex items-center justify-center'>
                    <img src={RRBLogo} alt="logorecbody" className='rounded-full h-14 w-14' />
                  </div>

                  <div className='flex flex-col text-gray-400 text-sm lg:text-md bg-gray-900 rounded-2xl border-none justify-center p-4 mt-4 '>
                    <ul className='text-center items-center justify-center'>
                      {/* Icons used as google fonts. Source: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:lock_reset:FILL@0;wght@400;GRAD@0;opsz@24 */}
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">quiz</span>158 Chapter test</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">schedule</span>Time: 90 Min</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        error
                      </span>Negative: 0.25</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        rule
                      </span>Cut off: 60</li>
                    </ul>

                    <Link to="" className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-white focus:ring-4 focus:ring-white hover:text-gray-700 hover:transition-all hover:duration-700 hover:ease-in-out hover:font-bold'>Start Exam</Link>
                  </div>
                </div>

                {/* 2nd Exam topic */}
                <div className='py-2 px-2 bg-[#F5F5F5] rounded-2xl h-[400px]'>
                  <div>
                    <h1 className='text-center font-bold text-sm items-center lg:text-base'><span className='mr-3 ' style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center' }}><ScheduleTwoTone /></span>Math Full Test</h1>
                  </div>
                  <hr className='bg-gray-400 h-0.5 mt-1 mb-2' />
                  <div className='flex items-center justify-center'>
                    <img src={RRBLogo} alt="logorecbody" className='rounded-full h-14 w-14' />
                  </div>

                  <div className='flex flex-col text-gray-400 text-sm lg:text-md bg-gray-900 rounded-2xl border-none justify-center p-4 mt-4 '>
                    <ul className='text-center items-center justify-center'>
                      {/* Icons used as google fonts. Source: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:lock_reset:FILL@0;wght@400;GRAD@0;opsz@24 */}
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">quiz</span>158 Chapter test</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">schedule</span>Time: 90 Min</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        error
                      </span>Negative: 0.25</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        rule
                      </span>Cut off: 60</li>
                    </ul>

                    <Link to="" className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-white focus:ring-4 focus:ring-white hover:text-gray-700 hover:transition-all hover:duration-700 hover:ease-in-out hover:font-bold'>Start Exam</Link>
                  </div>
                </div>


                {/* 3rd Exam topic */}
                <div className='py-2 px-2 bg-[#F5F5F5] rounded-2xl h-[400px]'>
                  <div>
                    <h1 className='text-center font-bold text-sm items-center lg:text-base'><span className='mr-3 ' style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center' }}><ScheduleTwoTone /></span>Modern History Full Test</h1>
                  </div>
                  <hr className='bg-gray-400 h-0.5 mt-1 mb-2' />
                  <div className='flex items-center justify-center'>
                    <img src={RRBLogo} alt="logorecbody" className='rounded-full h-14 w-14' />
                  </div>

                  <div className='flex flex-col text-gray-400 text-sm lg:text-md bg-gray-900 rounded-2xl border-none justify-center p-4 mt-4 '>
                    <ul className='text-center items-center justify-center'>
                      {/* Icons used as google fonts. Source: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:lock_reset:FILL@0;wght@400;GRAD@0;opsz@24 */}
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">quiz</span>158 Chapter test</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">schedule</span>Time: 90 Min</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        error
                      </span>Negative: 0.25</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        rule
                      </span>Cut off: 60</li>
                    </ul>

                    <Link to="" className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-white focus:ring-4 focus:ring-white hover:text-gray-700 hover:transition-all hover:duration-700 hover:ease-in-out hover:font-bold'>Start Exam</Link>
                  </div>
                </div>

                {/* 4th Exam topic */}
                <div className='py-2 px-2 bg-[#F5F5F5] rounded-2xl h-[400px]'>
                  <div>
                    <h1 className='text-center font-bold text-sm items-center lg:text-base'><span className='mr-3 ' style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center' }}><ScheduleTwoTone /></span>Geography Full Test</h1>
                  </div>
                  <hr className='bg-gray-400 h-0.5 mt-1 mb-2' />
                  <div className='flex items-center justify-center'>
                    <img src={RRBLogo} alt="logorecbody" className='rounded-full h-14 w-14' />
                  </div>

                  <div className='flex flex-col text-gray-400 text-sm lg:text-md bg-gray-900 rounded-2xl border-none justify-center p-4 mt-4 '>
                    <ul className='text-center items-center justify-center'>
                      {/* Icons used as google fonts. Source: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:lock_reset:FILL@0;wght@400;GRAD@0;opsz@24 */}
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">quiz</span>158 Chapter test</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">schedule</span>Time: 90 Min</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        error
                      </span>Negative: 0.25</li>
                      <li className='flex items-center mb-1 focus:ring-4 focus:ring-gray hover:text-white hover:transition-all hover:duration-500 hover:ease-in-out'><span className="material-symbols-outlined mr-3">
                        rule
                      </span>Cut off: 60</li>
                    </ul>

                    <Link to="" className='mt-6 md:mt-6 lg:mt-8 py-3 px-5 text-base text-center text-gray-800 rounded-lg border border-none bg-sky-500 hover:bg-white focus:ring-4 focus:ring-white hover:text-gray-700 hover:transition-all hover:duration-700 hover:ease-in-out hover:font-bold'>Start Exam</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          {/* Need to write code if the user is not signed in */}
        </>
      )}
    </div>
  )
}

export default Testseries