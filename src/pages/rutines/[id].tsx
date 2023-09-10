import FloatingAddButton from '@/components/FloatingAddButton';
import ListExercise from '@/components/ListExercise';
import Modal from '@/components/ui/Modal';
import Title from '@/components/ui/Title';
import { createExercise } from '@/firebase/exercise.service';
import { getRutine } from '@/firebase/rutine.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const RutinePage = () => {
  const [rutine, setrutine] = useState<any>();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [re, setre] = useState(false);
  const reset = () => { setre(!re) }
  useEffect(() => {
    if (!router.isReady) return;
    setloading(true);
    getRutine(router.query.id as string).then((rutine) => {
      setrutine(rutine);
      setloading(false);
    });
  }, [router.isReady, router.query.id, re])
  const [visible, setisVisible] = useState(false)
  const openModal = () => { setisVisible(true) }
  const closeModal = () => { setisVisible(false) }
  return (
    <main >
      <Title loading={loading} >{rutine?.name}</Title>
      <ListExercise
        loading={loading}
        rutine={rutine}
      />
      <FloatingAddButton openModal={openModal} />
      <Modal
        visible={visible}
        openModal={openModal}
        closeModal={closeModal}
      >
        <FormCreateExercise
          setloading={setloading}
          closeModal={closeModal}
          reset={reset}
          idRutine={router.query.id as string}
        />

      </Modal>
    </main>
  )
}

export default RutinePage


const FormCreateExercise = ({ setloading, closeModal, reset, idRutine }: any) => {
  const [nameExercise, setnameExercise] = useState('');
  const create = () => {
    setloading(true)
    createExercise(nameExercise, idRutine).then(() => {
      setloading(false);
      closeModal();
      reset()
    })
  }
  return <>
    <h2 className='text-xl'>Crear rutina</h2>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 mt-5">First name</label>
      <input
        value={nameExercise}
        onChange={(e) => setnameExercise(e.target.value)}
        type="text" id="first_name" className="bg-gray-50 border border-gray-light text-gray text-sm rounded-lg focus:ring-blue-500 focus:border-primary-text block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de rutina " required />
      <div className='flex items-end justify-end'>
        <button className='bg-primary p-2 text-white rounded-xl px-6 mt-4 ' onClick={create}>
          Crear
        </button>
      </div>
    </div>
  </>
}
