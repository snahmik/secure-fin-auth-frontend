import React from 'react';
import StatisticalCard from "../components/StatisticalCard.jsx";
import DataTable from "../components/DataTable.jsx";

const transactions = [
  {
    date: 'Jul 10, 2026',
    description: 'Deposit',
    amount: '+$500.00',
    type: 'pending',
  },
  {
    date: 'Jul 9, 2026',
    description: 'Transfer from John D.',
    amount: '+$75.00',
    type: 'approved',
  },
  {
    date: 'Jul 9, 2026',
    description: 'Transfer to Sarah K.',
    amount: '$120.00',
    type: 'rejected',
  },
  {
    date: 'Jul 8, 2026',
    description: 'Transfer to Alex M.',
    amount: '$55.00',
    type: 'approved',
  },
  {
    date: 'Jul 7, 2026',
    description: 'Deposit',
    amount: '+$850.00',
    type: 'rejected',
  },
];

const UserDashboard = () => {
  const transactionTableData = {
    headers: ["Date", "Description", "Amount", "Status"],
    dataKeys: ["date", "description", "amount", "type"],
    dataset: transactions,
  }

  return (
    <div className='flex flex-col gap-8'>
      <section className='flex flex-col gap-1'>
        <p className='text-lg text-slate-400'>Friday, July 11, 2026</p>
        <h1 className='text-3xl font-bold'>Welcome back, HANS</h1>
      </section>

      <section className='rounded-2xl bg-gray-700 text-white shadow-sm p-6 flex flex-col gap-6'>
        <p className='text-md font-medium uppercase'>Available Balance</p>
        <h3 className='text-4xl font-bold'>RM 1,250.00</h3>
        <div className='flex gap-4'>
          <button className='rounded-lg bg-teal-600 px-6 py-3 text-md font-medium text-white transition hover:bg-teal-700'>
            Theoretical Deposit
          </button>
          <button className='rounded-lg border border-slate-500 px-6 py-3 text-md font-medium text-white transition hover:bg-white/10'>
            Transfer Funds
          </button>
        </div>
      </section>

      <section className='flex gap-8 justify-around'>
        <StatisticalCard dataLabel="Total Deposited"
                         dataValue="RM 1,350.00"
                         description="+RM 500 this week"/>
        <StatisticalCard dataLabel="Total Sending"
                         dataValue="RM 350.00"
                         description="2 transfers"/>
        <StatisticalCard dataLabel="Pending Transfers"
                         dataValue="RM 50.00"
                         description="None pending"/>
      </section>

      <section>
        <h2 className='text-2xl font-bold'>Recent Transactions</h2>
        <br/>
        <div className='p-4 shadow-md border-slate-100 rounded-xl'>
          <table className='w-full border-collapse'>
            <thead className='border-b-2'>
            <tr className='text-left text-sm font-bold uppercase tracking-wider'>
              {transactionTableData.headers.map((label,index) => {
                const cssClass = index === 0 ? 'p-4 pt-2' : 'p-4 pt-2 border-l border-slate-200';
                return <th key={'header' + index} className={cssClass}>{label}</th>
              })
              }
            </tr>
            </thead>
            <tbody>
            {transactionTableData.dataset.map((data,rowIndex) => {
              const isLastEntry = rowIndex + 1 === transactionTableData.dataset.length;
              //Remove border from bottom row
              const rowCssClass = isLastEntry ? 'border-0': 'border-b border-slate-200';
              let cellCssClass = isLastEntry ? 'p-4 pb-2' : 'p-4';
              return (<tr key={'transaction-row' + rowIndex} className={rowCssClass}>
                {transactionTableData.dataKeys.map((key,colIndex) => {
                  //Remove border from left-most cell
                  colIndex > 0 ? cellCssClass += ' border-l border-slate-200' : ''
                  return <td key={'data-cell'+rowIndex+colIndex} className={cellCssClass}>{data[key]}</td>
                })}
              </tr>)
            })}
            </tbody>
          </table>
        </div>
      </section>

      {/*<section className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm'>*/}
      {/*  <h2 className='px-10 py-8 text-2xl font-bold text-[#182945]'>Recent Activity</h2>*/}

      {/*  <table className='w-full border-collapse'>*/}

      {/*    <tbody>*/}
      {/*    {transactions.map((transaction) => {*/}
      {/*      return (*/}
      {/*        <tr className='border-b border-slate-100 last:border-b-0'>*/}
      {/*          <td className='px-10 py-8 text-xl text-slate-500'>{transaction.date}</td>*/}
      {/*          <td className='px-10 py-8 text-xl font-medium text-[#182945]'>{transaction.description}</td>*/}
      {/*          <td className='px-10 py-8 text-xl font-bold text-teal-700'>{transaction.amount}</td>*/}
      {/*          <td className='px-10 py-8'>*/}
      {/*      <span className='inline-flex items-center rounded-ful bg-teal-50 px-5 py-2 text-lg font-medium text-teal-700'>*/}
      {/*        {transaction.type}*/}
      {/*      </span>*/}
      {/*          </td>*/}
      {/*        </tr>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*</section>*/}
    </div>
  );
};

export default UserDashboard;

//total amount,

