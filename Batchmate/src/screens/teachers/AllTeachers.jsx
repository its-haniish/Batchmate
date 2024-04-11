import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Teacher, { TeacherLoader } from '../../components/teacher/Teacher'
import TeacherDetails from '../../components/teacher/TeacherDetails'

const AllTeachers = () => {
  return (
    <>
      <Navbar />
      <div className='w-screen h-screen overflow-y-scroll justify-center items-center flex flex-wrap my-5 pb-9'>
        <h2 className='text-3xl font-bold *:*:justify-center'>All Teachers</h2>
        <div className='w-auto h-3/6 py-2'>
          <Teacher />
        </div>
        <div className='w-auto h-3/6 py-2'>
          <TeacherLoader />
        </div>
        <div className='w-auto h-3/6 py-2'>
          <TeacherLoader />
        </div>
      </div>
    </>
  )
}

export default AllTeachers