import React, {Suspense, useRef, useState} from 'react';
import StatisticalCard from "../components/StatisticalCard.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import TableHeader from "../components/TableHeader.jsx";
import Modal from "../components/Modal.jsx";
import {Await, useLoaderData, useNavigate, useRevalidator} from "react-router";
import {approveTransaction, fetchAllTransactions, rejectTransaction} from "../api/transactionsApi.js";
import {formatRM, getCurrentDateTime} from "../utils/formatterUtils.js";

const {headers, dataKeys} = {
  headers: ["Date", "Sender", "Recipient", "Amount", "Status"],
  dataKeys: ["date", "sender", "recipient", "amount", "status"],
}

const AdminDashboard = () => {
  const {transactionData} = useLoaderData()
  const dialog = useRef()
  const [activeTransaction, setActiveTransaction] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const navigate = useNavigate()

  function handleViewTransaction(transaction) {
    setActiveTransaction(transaction)
    dialog.current.open()
  }

  function handleCloseModal() {
    setActiveTransaction(null)
    dialog.current.close()
  }

  async function handleApproveTransaction() {
    if (!activeTransaction || activeTransaction.status !== 'pending') return

    setIsProcessing(true)
    const res = await approveTransaction(activeTransaction.id)
    setIsProcessing(false)

    if (res.success) {
      handleCloseModal()
      navigate('.')
    }
  }

  async function handleRejectTransaction() {
    if (!activeTransaction || activeTransaction.status !== 'pending') return

    setIsProcessing(true)
    const res = await rejectTransaction(activeTransaction.id)
    setIsProcessing(false)

    if (res.success) {
      handleCloseModal()
      navigate('.')
    }
  }

  return (
    <>
      <Modal ref={dialog}
             title={'Transaction Details'}
             confirmLabel={isProcessing ? 'Processing...' : 'Approve'}
             cancelLabel={isProcessing ? 'Processing...' : 'Reject'}
             handleConfirm={handleApproveTransaction}
             handleCancel={handleRejectTransaction}
             handleClose={handleCloseModal}
             disabled={isProcessing}>
        {activeTransaction && <span>
          <p>Sender: {activeTransaction.sender}</p>
          <p>Recipient: {activeTransaction.recipient}</p>
          <p>Amount: {activeTransaction.amount}</p>
          <p>Timestamp: {activeTransaction.date}</p>
          <p>Status: <span className="capitalize font-semibold">{activeTransaction.status}</span></p>
        </span>}
      </Modal>

      <Suspense fallback={<div className={'text-center text-2xl font-bold mt-10'}>Fetching Admin Data...</div>}>
        <Await resolve={transactionData}>
          {(resolvedTransactionData) => {
            const allTransactions = resolvedTransactionData.transactionData.transactions || []
            const formattedTransactions = allTransactions.map(t => ({
              id: t.id,
              date: getCurrentDateTime(t.created_at),
              sender: t['sender_account'],
              recipient: t['recipient_account'],
              amount: formatRM(t.amount),
              status: t.status
            }))

            const pendingCount = allTransactions.filter(t => t.status === 'pending').length
            const approvedCount = allTransactions.filter(t => t.status === 'approved').length
            const rejectedCount = allTransactions.filter(t => t.status === 'rejected').length

            return (
              <div className='flex flex-col gap-8'>
                <DashboardHeader username={'Admin'}/>

                <section className='flex gap-8 justify-around'>
                  <StatisticalCard dataLabel="Total Transactions"
                                   dataValue={allTransactions.length.toString()}
                                   description="Across all users"/>
                  <StatisticalCard dataLabel="Pending Transfers"
                                   dataValue={pendingCount.toString()}
                                   description={`${approvedCount + rejectedCount} processed`}/>
                  <StatisticalCard dataLabel="Approved/Rejected"
                                   dataValue={`${approvedCount}/${rejectedCount}`}
                                   description={`${allTransactions.length > 0 ? ((approvedCount / allTransactions.length) * 100).toFixed(0) : 0}% approved`}/>
                </section>

                <section>
                  <h2 className='text-2xl font-bold'>Recent Transactions</h2>
                  <br/>
                  <div className='p-4 pb-2 shadow-md border-slate-100 rounded-xl bg-slate-50'>
                    <table className='w-full border-collapse'>
                      <TableHeader headerLabels={headers}/>
                      <tbody>
                      {formattedTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className='text-center p-4 pb-2'>No transactions yet</td>
                        </tr>
                      ) : (
                        formattedTransactions.toReversed().map((data, rowIndex) => {
                          const isLastEntry = rowIndex + 1 === formattedTransactions.length;
                          let rowCssClass = 'hover:bg-slate-100 hover:cursor-pointer '
                          if (isLastEntry) {
                            rowCssClass += 'border-0'
                          } else {
                            rowCssClass += 'border-b border-slate-200'
                          }

                          return (
                            <tr key={'transaction-row' + rowIndex}
                                className={rowCssClass}
                                onClick={() => {
                                  data.status === 'pending' && handleViewTransaction(data)
                                }}>
                              {dataKeys.map((key, colIndex) => {
                                let cellCssClass = 'p-4 '
                                if (isLastEntry) {
                                  if (colIndex === 0) cellCssClass += 'rounded-bl-md '
                                  else if (colIndex === dataKeys.length - 1) cellCssClass += 'rounded-br-md '
                                }
                                colIndex > 0 ? cellCssClass += 'border-l border-slate-200' : ''

                                return <td key={'data-cell' + rowIndex + colIndex}
                                           className={cellCssClass}>{data[key]}</td>
                              })}
                            </tr>
                          )
                        })
                      )}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default AdminDashboard;

export const loader = async () => {
  const transactionData = fetchAllTransactions()

  return ({transactionData})
}