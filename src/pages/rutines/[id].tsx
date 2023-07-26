import ListExercise from '@/components/ListExercise';
import Title from '@/components/ui/Title';
import { getRutine } from '@/firebase/rutine.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const RutinePage = () => {
  const [rutine, setrutine] = useState<any>();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!router.isReady) return;
    setloading(true);
    getRutine(router.query.id as string).then((rutine) => {
      setrutine(rutine);
      setloading(false);
    });
  }, [router.isReady, router.query.id])
  return (
    <div className='px-8 py-6'>
      <Title loading={loading} >{rutine?.name}</Title>
      <ListExercise
        loading={loading}
        rutine={rutine}
      />
    </div>
  )
}

export default RutinePage