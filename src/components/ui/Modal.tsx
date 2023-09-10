const Modal = ({ children, visible, openModal, closeModal }: any) => {

  return <>
    {visible &&
      <div className='w-screen h-screen fixed inset-0 '>
        <div className='w-screen h-screen fixed inset-0 bg-[rgba(49,49,49,0.8)] z-0' onClick={closeModal} />
        <div className="absolute -translate-x-2/4 -translate-y-2/4 leading-[1.4] max-w-[600px] min-w-[320px] px-7 py-3.5 rounded-xl left-2/4 top-[40%] bg-white">
          {children}
        </div>
      </div>}
  </>
}

export default Modal