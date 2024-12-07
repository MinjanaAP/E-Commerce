import React from 'react'
import AdminCard from './AdminCard';

const AdminStats = ({stats})=> {

    const dataEarnings = [
        { name: 'Page A', value: 100 },
        { name: 'Page B', value: 300 },
        { name: 'Page C', value: 800 },
        { name: 'Page D', value: 200 },
    ];

    
    const dataOrders = [
        { name: 'Page A', value: 1000 },
        { name: 'Page B', value: 600 },
        { name: 'Page C', value: 550 },
        { name: 'Page D', value: 200 },
    ];

    const dataUsers = [
        { name: 'Page A', value: 10 },
        { name: 'Page B', value: 60 },
        { name: 'Page C', value: 5 },
        { name: 'Page D', value: 20 },
    ];

    const dataProducts = [
        { name: 'Page A', value: 1200 },
        { name: 'Page B', value: 600 },
        { name: 'Page C', value: 1800 },
        { name: 'Page D', value: 200 },
    ];

    console.log(stats);
  return (
    <div className='my-5 space-y-4'>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
            <AdminCard
                            title="Total Earnings"
                            value={stats?.totalEarnings?.toFixed(2)}
                            percentage="4.56"
                            chartData={dataEarnings}
                            chartColor="#22c55e"
                        />
            
            <AdminCard
                            title="All Orders"
                            value={stats?.totalOrders}
                            percentage="1.73"
                            chartData={dataOrders}
                            chartColor="#ff5722"
                        />
            
            <AdminCard
                            title="All Users"
                            value={stats?.totalUsers}
                            percentage="2.08"
                            chartData={dataUsers}
                            chartColor="#95989d"
                        />

            <AdminCard
                            title="Total Products"
                            value={stats?.totalProducts}
                            percentage="15.79"
                            chartData={dataProducts}
                            chartColor="#2275fc"
                        />
        </div>
    </div>
  )
}

export default AdminStats