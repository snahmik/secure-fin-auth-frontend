import React from 'react';
import StatisticalCard from "../components/StatisticalCard.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import UserAccountPanel from "../components/UserAccountPanel.jsx";
import {useSelector} from "react-redux";
import {useActionData} from "react-router";

const UserDashboard = () => {
  const {balance,userTransactions} = useSelector((state) => state.userAccount)
  const formActionData = useActionData()

  const isUserTransactionEmpty = userTransactions.length === 0

  const transactionTableData = {
    headers: ["Date", "Description", "Amount", "Status"],
    dataKeys: ["date", "description", "amount", "status"],
    dataset: userTransactions,
  }

  return (
    <>
      <div className='flex flex-col gap-8'>
        <DashboardHeader username={'Hans'}/>
        <UserAccountPanel accountBalance={balance} formActionData={formActionData}/>

        {/*Data Summary Cards*/}
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

        {/*Recent Transactions*/}
        <section>
          <h2 className='text-2xl font-bold'>Recent Transactions</h2>
          <br/>
          <div className='p-4 shadow-md border-slate-100 rounded-xl bg-slate-50'>
            <table className='w-full border-collapse'>
              <thead className='border-b-2'>
              <tr className='text-left text-sm font-bold uppercase tracking-wider'>
                {transactionTableData.headers.map((label, index) => {
                  const cssClass = index === 0 ? 'p-4 pt-2' : 'p-4 pt-2 border-l border-slate-200';
                  return <th key={'header' + index}
                             className={cssClass}>{label}</th>
                })
                }
              </tr>
              </thead>
              <tbody>
              {isUserTransactionEmpty && <tr><td colSpan={4} className='text-center p-4 pb-2'>No transactions yet</td></tr>}
              {!isUserTransactionEmpty && transactionTableData.dataset.toReversed().map((data, rowIndex) => {
                const isLastEntry = rowIndex + 1 === transactionTableData.dataset.length;
                //Remove border from bottom row
                const rowCssClass = isLastEntry ? 'border-0' : 'border-b border-slate-200';
                let cellCssClass = isLastEntry ? 'p-4 pb-2' : 'p-4';
                return (<tr key={'transaction-row' + rowIndex}
                            className={rowCssClass}>
                  {transactionTableData.dataKeys.map((key, colIndex) => {
                    //Remove border from left-most cell
                    colIndex > 0 ? cellCssClass += ' border-l border-slate-200' : ''
                    return <td key={'data-cell' + rowIndex + colIndex}
                               className={cellCssClass}>{data[key]}</td>
                  })}
                </tr>)
              })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDashboard;