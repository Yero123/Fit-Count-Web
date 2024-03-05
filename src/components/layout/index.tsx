import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Image from 'next/image'
import { useThemeContext } from '@/contexts/ThemeProvider'
import { Button } from '@tremor/react'
import ButtonTheme from '../ButtonTheme'
import { useRouter } from 'next/router'
import { useAllRutinesContext } from '@/contexts/AllRutinesContext'
const Layout = ({
  children
}: any) => {
  const router = useRouter()
  const { rutines } = useAllRutinesContext();
  const getTitle = () => {
    if (router.asPath === '/rutines') {
      return 'Rutinas'
    }
    if (router.asPath === '/exercises') {
      return 'Ejercicios'
    }
    if (router.asPath.split('/')[1] === 'rutines') {
      if (rutines.length === 0) return "Rutina"
      const rutine = rutines?.find((rutine: any) => router.asPath === `/rutines/${rutine.id}`)
      return "Rutina" + " / " + rutine?.name
    }
    if (router.asPath.split('/')[1] === 'exercises') {
      if (rutines.length === 0) return "Ejercicios"
      let nameExercise = ""
      const rutine = rutines.find((rutine: any) => {
        const exercise = rutine.exercises.find((exercise: any) => router.asPath === `/exercises/${exercise.id}`)
        if (exercise) nameExercise = exercise.name
        return exercise
      })
      return rutine?.name + " / " + nameExercise ?? ""
    }
    if (router.asPath === '/rutines/new') {
      return 'New Rutine'
    }
    if (router.asPath === '/exercises/new') {
      return 'New Exercise'
    }
    if (router.asPath === '/rutines/[id]') {
      return 'Rutine'
    }
    if (router.asPath === '/exercises/[id]') {
      return 'Exercise'
    }
    if (router.asPath === '/rutines/[id]/edit') {
      return 'Edit Rutine'
    }
    if (router.asPath === '/exercises/[id]/edit') {
      return 'Edit Exercise'
    }
    return 'Dashboard'
  }
  return (
    <section className='md:flex bg-white dark:bg-[#02081B]'>
      <Sidebar />
      <Header />
      <div className='flex w-full flex-1 px-6 md:px-12 pt-3 md:pt-8 flex-col'>
        <div className=' justify-between w-full h-min align-middle 2xl:mb-4 hidden md:flex'>
          <p className='text-center p-0 m-0  dark:text-white'>Home / {getTitle()}</p>
          <div className='flex justify-center items-center gap-4'>
            <ButtonTheme />
            <Image src="/images/yero.png" alt="Profile picture" width="35" height="35" className='rounded-full pt-1' />
          </div>
        </div>
        {
          children
        }
      </div>

    </section>
  )
}

export default Layout