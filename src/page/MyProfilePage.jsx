import React from 'react'
import Navbar from '../features/navbar/Navbar'
import MyProfile from '../features/user/component/MyProfile'

const MyProfilePage = () => {
  return (
    <div>
        <Navbar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <MyProfile></MyProfile>
        </Navbar>
    </div>
  )
}

export default MyProfilePage