import React, {useRef} from 'react';
import Button from "./Button.jsx";
import FormModal from "./FormModal.jsx";
import UserInput from "./UserInput.jsx";


const UserAccountPanel = () => {
  const depositDialog = useRef()
  const transferDialog = useRef()

  function handleDepositButtonPressed(){
    depositDialog.current.open()
  }

  function handleDepositCancelled(){
    console.log("Deposit cancelled")
    depositDialog.current.close()
  }

  function handleTransferButtonPressed(){
    transferDialog.current.open()
  }

  function handleTransferConfirmed(){
    console.log("Transfer confirmed")
  }

  function handleTransferCancelled(){
    console.log("Transfer cancelled")
    transferDialog.current.close()
  }

  return (
    <>
      <FormModal ref={depositDialog} confirmLabel={"Deposit"} handleCancel={handleDepositCancelled} title={'Deposit'}>
        <input type="text" name={'type'} defaultValue={'deposit'} hidden/>
        <UserInput label={'Amount'} placeholder={'RM 200'} name={'amount'}/>
      </FormModal>

      <FormModal ref={transferDialog} confirmLabel={"Transfer"} handleConfirm={handleTransferConfirmed} handleCancel={handleTransferCancelled} title={'Fund Transfer'}>
        <input type="text" name={'type'} defaultValue={'transfer'} hidden/>
        <UserInput label={'Recipient Account'} placeholder={'12345678'} name={'recipient'}/>
        <UserInput label={'Transfer Amount'} placeholder={'RM 200'} name={'amount'}/>
      </FormModal>

      <section className='rounded-2xl bg-primary text-slate-100 shadow-sm p-6 flex flex-col gap-6'>
        <p className='text-md font-medium uppercase'>Available Balance</p>
        <h3 className='text-4xl font-bold'>RM 1,250.00</h3>
        <div className='flex gap-4'>
          <div className={'w-fit'}>
            <Button label={'Perform Deposit'}
                    buttonType={'primary'}
                    isOnPrimary={true}
                    size={'lg'}
            onClick={handleDepositButtonPressed}/>
          </div>
          <div className={'w-fit'}>
            <Button label={'Transfer Funds'}
                     buttonType={'secondary'}
                    isOnPrimary={true}
                    size={'lg'}
            onClick={handleTransferButtonPressed}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAccountPanel;
