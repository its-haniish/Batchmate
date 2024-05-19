import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Teacher, { TeacherLoader } from '../../components/teacher/Teacher'
import getTeachersList from '../../utils/getTeachersList'
import { useDispatch, useSelector } from 'react-redux'

const AllTeachers = () => {
  const [loading, setLoading] = useState(false)
  const { teachers } = useSelector(state => state.allTeachersReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (teachers === null) {
      getTeachersList(dispatch, setLoading)
    }

  }, [])
  return (
    <>
      <Navbar />
      <div className='w-screen h-screen overflow-y-scroll justify-center items-center flex flex-wrap my-5 pb-9 mt-[6.5vh]'>
        <h2 className='text-3xl font-bold *:*:justify-center'>All Teachers</h2>

        {
          loading ?
            <>
              <div className='w-auto h-3/6 py-2'>
                <TeacherLoader />
              </div>
              <div className='w-auto h-3/6 py-2'>
                <TeacherLoader />
              </div>
              <div className='w-auto h-3/6 py-2'>
                <TeacherLoader />
              </div>
              <div className='w-auto h-3/6 py-2'>
                <TeacherLoader />
              </div>
              <div className='w-auto h-3/6 py-2'>
                <TeacherLoader />
              </div>
              <div className='w-auto h-3/6 py-2'>
                <TeacherLoader />
              </div>
            </> :
            teachers && teachers.length === 0 ?
              <p className='text-[0.9rem] font-semibold font-Nunito text-center text-wrap w-full'>!! NO TEACHERS TO SHOW !!</p> :
              teachers && teachers.map(teacher => (
                <div className='w-auto h-3/6 py-2' key={teacher._id} >
                  <Teacher name={teacher.name} id={teacher._id} />
                </div>
              ))
        }
      </div>
    </>
  )
}

export default AllTeachers