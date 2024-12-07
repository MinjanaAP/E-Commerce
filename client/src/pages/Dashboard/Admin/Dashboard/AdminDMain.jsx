import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery, useGetOrderStatsQuery, useGetWeeklyStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';
import WeeklyStats from './WeeklyStatsChart';
import OrderStatsChart from './OrderStatsChart';

function AdminDMain() {
    const { user } = useSelector((state) => state.auth);

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    //* get admin stats
    const { data: adminStats, error: adminError, isLoading: adminLoading } = useGetAdminStatsQuery();

    //* get weekly update stats
    const { data: weeklyStats, error: weeklyError, isLoading: weeklyLoading } = useGetWeeklyStatsQuery();

     //* get Order update stats
     const { data: orderStats, error: orderError, isLoading: orderLoading } = useGetOrderStatsQuery();

    if (adminLoading || weeklyLoading || orderLoading) return <div>Loading...</div>;
    if (!adminStats) return <div>No admin stats found</div>;
    if (adminError || weeklyError || orderError) return <div>{adminError && weeklyError && orderError}</div>;

    return (
        <div className="p-6">
            <div>
                <section id='stats'>
                  <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
                  <p className="text-gray-500">Hi, {user?.username}! Welcome to the admin dashboard.</p>
                  <AdminStats stats={adminStats} />
                </section>
                <section id='weekly-admin-stats'>
                  {weeklyStats?.weeklyReport && <WeeklyStats weeklyReport={weeklyStats.weeklyReport} />}
                </section>
                
                <AdminStatsChart stats={adminStats} />
                <section id='order-stats'>
                  <OrderStatsChart 
                      dailyOrders={orderStats.dailyOrders} 
                      ordersByStatus={orderStats.ordersByStatus} 
                  />
                </section>
                

            </div>
        </div>
    );
}

export default AdminDMain;
