import React from 'react';

interface DashboardStatsProps {
    views: number;
    clicks: number;
    sales: number;
    newCustomers: number;
}

const Stat: React.FC<{ title: string, value: number }> = ({ title, value }) => (
    <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-neutral-800">{value}</p>
    </div>
);

const DashboardStats: React.FC<DashboardStatsProps> = ({ views, clicks, sales, newCustomers }) => {
    return (
        <div className="flex justify-between w-fit border border-neutral-200 rounded-lg p-6 gap-10">
            <Stat title="Page Views" value={views} />
            <Stat title="Clicks" value={clicks} />
            <Stat title="Sales" value={sales} />
            <Stat title="New Customers" value={newCustomers} />
        </div>
    );
};

export default DashboardStats;