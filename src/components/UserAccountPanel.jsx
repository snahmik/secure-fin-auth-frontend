import React, {useEffect, useRef, useState} from 'react';
import Button from "./Button.jsx";
import FormModal from "./FormModal.jsx";
import UserInput from "./UserInput.jsx";
import {formatRM} from "../utils/formatterUtils.js";
import store, {userAccountActions} from "../store/index.js";
import {validateTransferAmount, validateTransferRecipient} from "../utils/formValidationUtils.js";

const UserAccountPanel = ({accountBalance, formActionData}) => {
  const depositDialog = useRef()
  const transferDialog = useRef()
  const [amountErrors, setAmountErrors] = useState([])
  const [transferErrors, setTransferErrors] = useState([])

  useEffect(() => {
    setAmountErrors([])
    setTransferErrors([])

    if (formActionData?.success) {
      switch (formActionData?.type) {
        case 'deposit':
          depositDialog.current.close();
          return
        case 'transfer':
          transferDialog.current.close();
          return
      }
    }

    formActionData?.error.forEach((error) => {
      switch (error?.type) {
        case 'amount':
          setAmountErrors((prevState) => [...prevState, error.message])
          break
        case 'transfer':
          setTransferErrors((prevState) => [...prevState, error.message])
          break
      }
    })
  }, [formActionData]);

  function handleDepositCancelled() {
    depositDialog.current.close()
    setAmountErrors([])
  }

  function handleTransferCancelled() {
    transferDialog.current.close()
    setAmountErrors([])
    setTransferErrors([])
  }

  return (
    <>
      <FormModal ref={depositDialog}
                 confirmLabel={"Deposit"}
                 handleCancel={handleDepositCancelled}
                 title={'Deposit'}>
        <input type="text"
               name={'type'}
               defaultValue={'deposit'}
               hidden/>
        <UserInput label={'Amount'}
                   placeholder={'RM 200'}
                   name={'amount'}
                   errorMessages={amountErrors}
                   onChange={() => {
                     setAmountErrors([])
                   }}/>
      </FormModal>

      <FormModal ref={transferDialog}
                 confirmLabel={"Transfer"}
                 handleCancel={handleTransferCancelled}
                 title={'Fund Transfer'}>
        <input type="text"
               name={'type'}
               defaultValue={'transfer'}
               hidden/>
        <UserInput label={'Recipient Account'}
                   placeholder={'12345678'}
                   name={'recipient'}
                   errorMessages={transferErrors}
                   onChange={() => {
                     setTransferErrors([])
                   }}/>
        <UserInput label={'Transfer Amount'}
                   placeholder={'RM 200'}
                   name={'amount'}
                   errorMessages={amountErrors}
                   onChange={() => {
                     setAmountErrors([])
                   }}/>
      </FormModal>

      <section className='rounded-2xl bg-primary text-slate-100 shadow-sm p-6 flex flex-col gap-6'>
        <p className='text-md font-medium uppercase'>Available Balance</p>
        <h3 className='text-4xl font-bold'>{formatRM(accountBalance)}</h3>
        <div className='flex gap-4'>
          <div className={'w-fit'}>
            <Button label={'Perform Deposit'}
                    buttonType={'primary'}
                    isOnPrimary={true}
                    size={'lg'}
                    onClick={() => depositDialog.current.open()}/>
          </div>
          <div className={'w-fit'}>
            <Button label={'Transfer Funds'}
                    buttonType={'secondary'}
                    isOnPrimary={true}
                    size={'lg'}
                    onClick={() => transferDialog.current.open()}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAccountPanel;

export async function formAction({request}) {
  const activeUserId = store.getState().auth.activeUserId;
  const formData = await request.formData()

  const type = formData.get('type')
  const amount = formData.get('amount')

  let error = []

  error.push(...validateTransferAmount(amount))

  switch (type) {
    case 'deposit':
      if (error.length > 0) {
        return {success: false, error}
      }

      store.dispatch(userAccountActions.deposit({timestamp: Date.now(), sender: activeUserId, amount: Number(amount)}))
      return {success: true, type: 'deposit'}

    case 'transfer':

      const recipientAcc = formData.get('recipient')
      error.push(...validateTransferRecipient(recipientAcc))

      if (error.length > 0) {
        return {success: false, error}
      }

      store.dispatch(userAccountActions.transfer({timestamp: Date.now(),sender: activeUserId,recipient: recipientAcc, amount: Number(amount)}))
      return {success: true, type: 'transfer'}
  }
}
