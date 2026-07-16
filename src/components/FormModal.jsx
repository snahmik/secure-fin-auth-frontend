import React, {useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";
import Button from "./Button.jsx";
import {Form, useNavigation} from "react-router";

const FormModal = ({
  ref,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  handleCancel,
  title,
  children,
  method = 'post'
}) => {
  const dialog = useRef()
  const form = useRef()
  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal()
    },
    close: () => {
      dialog.current.close()
      form.current.reset()
    },
  }))

  return (createPortal(
      <dialog ref={dialog} onClose={handleCancel} className="m-auto rounded-xl px-6 py-4 shadow-md min-w-1/4 open:flex open:consum flex-col gap-2 backdrop:bg-black/60">
        <h3 className={'text-lg font-semibold'}>{title}</h3>
        <Form ref={form} className="flex flex-col gap-2" method={method}>
          {children}
          <div className="flex gap-3 mt-3">
            <Button label={isSubmitting ? 'Processing...' : cancelLabel}
                    isPrimary={false}
                    isOnPrimary={false}
                    size="md"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    type={'reset'}/>
            <Button label={isSubmitting ? 'Processing...' : confirmLabel}
                    isPrimary={true}
                    isOnPrimary={false}
                    size="md"
                    disabled={isSubmitting}/>
          </div>
        </Form>
      </dialog>
      , document.getElementById('modal'))
  );
};

export default FormModal;