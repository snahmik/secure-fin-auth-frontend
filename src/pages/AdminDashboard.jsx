import React from 'react';
import StatisticalCard from "../components/StatisticalCard.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";

const transactions = [
  {
    date: 'Jul 10, 2026',
    description: 'Deposit',
    amount: '+$500.00',
    type: 'income',
  },
  {
    date: 'Jul 9, 2026',
    description: 'Transfer from John D.',
    amount: '+$75.00',
    type: 'income',
  },
  {
    date: 'Jul 9, 2026',
    description: 'Transfer to Sarah K.',
    amount: '$120.00',
    type: 'expense',
  },
  {
    date: 'Jul 8, 2026',
    description: 'Transfer to Alex M.',
    amount: '$55.00',
    type: 'expense',
  },
  {
    date: 'Jul 7, 2026',
    description: 'Deposit',
    amount: '+$850.00',
    type: 'income',
  },
];

const AdminDashboard = () => {
  return (
    <div className='flex flex-col gap-8'>
      <DashboardHeader username={'Admin'}/>

      <section className='flex gap-8 justify-around'>
        <StatisticalCard dataLabel="Total Users"
                         dataValue="42"
                         description="+4 this week"/>
        <StatisticalCard dataLabel="Pending Transfers"
                         dataValue="55"
                         description="2 transfers processed"/>
        <StatisticalCard dataLabel="Approved/Rejected Ratio"
                         dataValue="20/9"
                         description="xx% approved"/>
      </section>

      <section>
        <h2 className='text-2xl font-bold'>Recent Activity</h2>
        <br/>
        <div className='p-4 shadow-md border-slate-100 rounded-xl'>
          <table className='w-full border-collapse'>
            <thead className='border-b-2'>
            <tr className='text-left text-sm font-bold uppercase tracking-wider'>
              <th className='p-4 pt-2'>Date</th>
              <th className='p-4 pt-2 border-l border-slate-200'>Description</th>
              <th className='p-4 pt-2 border-l border-slate-200'>Amount</th>
              <th className='p-4 pt-2 border-l border-slate-200'>Status</th>
            </tr>
            </thead>

            <tbody>
            {transactions.map((transaction,index) => {
              const isLastEntry = index + 1 === transactions.length;

              console.log(transaction.description + isLastEntry)

              return (<tr className={isLastEntry? 'border-0' : 'border-b border-slate-200'}>
                <td className={`${isLastEntry? 'p-4 pb-2' : 'p-4'}`}>{transaction.date}</td>
                <td className={`${isLastEntry? 'p-4 pb-2' : 'p-4'} border-l border-slate-200`}>{transaction.description}</td>
                <td className={`${isLastEntry? 'p-4 pb-2' : 'p-4'} border-l border-slate-200`}>{transaction.amount}</td>
                <td className={`${isLastEntry? 'p-4 pb-2' : 'p-4'} border-l border-slate-200`}>{transaction.type}</td>
              </tr>);
            })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;