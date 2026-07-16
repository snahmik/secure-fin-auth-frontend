import React, {useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";
import {Form} from "react-router";
import Button from "./Button.jsx";

const Modal = ({
  ref,
  confirmLabel = 'Confirm',
  handleConfirm,
  cancelLabel = 'Cancel',
  handleCancel,
  handleClose,
  disabled,
  title,
  children,
}) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal()
    },
    close: () => {
      dialog.current.close()
    },
  }))

  return (createPortal(
      <dialog ref={dialog} onClose={handleCancel} className="m-auto rounded-xl px-6 py-4 shadow-md min-w-1/4 open:flex open:consum flex-col gap-2 backdrop:bg-black/60">
        <div className="flex flex-col">
          <button className="self-end cursor-pointer focus:border-0" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h3 className={'text-lg font-semibold'}>{title}</h3>
        </div>
        {children}
        <div className="flex gap-3 mt-3">
          <Button label={cancelLabel}
                  buttonType={'action'}
                  isPrimary={false}
                  size="md"
                  onClick={handleCancel}
                  disabled={disabled}
                  type={'reset'}/>
          <Button label={confirmLabel}
                  buttonType={'action'}
                  isPrimary={true}
                  size="md"
                  disabled={disabled}
                  onClick={handleConfirm}/>
        </div>
      </dialog>
      , document.getElementById('modal'))
  );
};

export default Modal;