import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Teacher, { TeacherLoader } from '../../components/teacher/Teacher'
import getTeachersList from '../../utils/getTeachersList'

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachersList(setTeachers)
  }, [])
  return (
    <>
      <Navbar />
      <div className='w-screen h-screen overflow-y-scroll justify-center items-center flex flex-wrap my-5 pb-9'>
        <h2 className='text-3xl font-bold *:*:justify-center'>All Teachers</h2>

        {
          teachers.length === 0 ?
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
            teachers.map(teacher => (
              <div className='w-auto h-3/6 py-2'>
                <Teacher name={teacher.name} id={teacher._id} key={teacher._id} />
              </div>
            ))
        }
      </div>
    </>
  )
}

export default AllTeachers