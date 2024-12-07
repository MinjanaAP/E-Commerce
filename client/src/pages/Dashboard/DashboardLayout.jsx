import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, Outlet } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'


const DashboardLayout = () => {
    const {user} = useSelector((state) => state.auth)
    if(!user) {
        return <Navigate to="/login" replace/>
    }
    const renderDashboard = () => {
        switch (user?.role) {
          case 'admin':
            
            return <AdminDashboard/>;
          case 'user': 
            return <UserDashboard/>;
        
          default:
            return <Navigate to="/login" replace/>;
        }
      }
  return (
    <div className='w-full bg-adminBackground '>
      <div className='container bg-adminBackground mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
          <header className='lg:w-1/5 sm:w-2/5 w-full sticky top-0 '>{renderDashboard()}</header>
          <div className='container md-flex-column'>
            <div className="bg-white  p-4 flex justify-between items-center mb-5 rounded-lg w-full">
              <h2 className="text-lg">Manage and Monitor Dashboard</h2>
              <div className="flex items-center space-x-4">
                <Link to="/dashboard/messages">
                  <button className="text-gray-700 hover:text-blue-600 font-medium" >
                    Notifications
                  </button>
                </Link>
                <button className="text-gray-700 hover:text-blue-600 font-medium">
                  Profile
                </button>
              </div>
            </div>
            <main className='bg-adminBackground w-full '>
                <Outlet />
            </main>
          </div>
          
        
      </div>
    </div>
  )
}

export default DashboardLayout