const FloatingAddButton = ({openModal}:any) => {
  return <div className='bg-primary w-12 h-12 rounded-full absolute bottom-2 right-8 flex items-center align-middle justify-center self-center shadow-xl hover:bg-[#3740bb]' onClick={openModal} >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white md:w-5 md:h-5">
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
  </div>
}

export default FloatingAddButton