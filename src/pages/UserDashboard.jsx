import StatisticalCard from "../components/StatisticalCard.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import UserAccountPanel from "../components/UserAccountPanel.jsx";
import {Await, useActionData, useLoaderData} from "react-router";
import TableHeader from "../components/TableHeader.jsx";
import {fetchUserProfile} from "../api/authApi.js";
import {fetchTransactionHistory} from "../api/transactionsApi.js";

import {formatTransactionRecord} from "../utils/formatterUtils.js";
import {Suspense} from "react";
import store, {authActions} from "../store/index.js";
import {useDispatch} from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch()
  const {userData, transactionData} = useLoaderData()
  const formActionData = useActionData()

  const transactionTableData = {
    headers: ["Date", "Description", "Amount", "Status"],
    dataKeys: ["date", "description", "amount", "status"],
  }

  return (

    <Suspense fallback={<div className={'text-center text-2xl font-bold'}>Fetching Your Data...</div>}>
      <Await resolve={userData}>
        {(resolvedUserData) => {
          dispatch(authActions.setAccount(resolvedUserData.userData.accountNumber))

          return(
            <div className='flex flex-col gap-8'>
              <DashboardHeader username={resolvedUserData.userData.name}/>
              <UserAccountPanel accountBalance={resolvedUserData.userData.balance}
                                formActionData={formActionData}/>

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
                    <TableHeader headerLabels={transactionTableData.headers}/>
                    <tbody>
                    <Suspense fallback={<tr>
                      <td colSpan={4}
                          className='text-center p-4 pb-2'>Fetching Recent Transactions...
                      </td>
                    </tr>}>
                      <Await resolve={transactionData}>
                        {(resolvedTransactionData) => {
                          const formattedTransactions = resolvedTransactionData.transactionData.transactions.map(transaction => {
                              return formatTransactionRecord(transaction, resolvedUserData.userData.accountNumber)
                            }
                          )

                          const isUserTransactionEmpty = formattedTransactions.length === 0

                          if (isUserTransactionEmpty) {
                            return (<tr>
                              <td colSpan={4}
                                  className='text-center p-4 pb-2'>No transactions yet
                              </td>
                            </tr>)
                          }

                          return (
                            formattedTransactions.toReversed().map((data, rowIndex) => {
                              const isLastEntry = rowIndex + 1 === formattedTransactions.length;
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
                                })
                                }
                              </tr>)
                            })
                          )
                        }
                        }
                      </Await>
                    </Suspense>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>)
        }}
      </Await>
    </Suspense>
  );
};

export default UserDashboard;

export const loader = async () => {
  const userId = store.getState().auth.userId

  const userData = fetchUserProfile(userId)
  const transactionData = fetchTransactionHistory()

  return ({userData, transactionData})
}