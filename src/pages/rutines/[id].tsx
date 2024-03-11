import FloatingAddButton from "@/components/FloatingAddButton";
import ListExercise from "@/components/ListExercise";
import Layout from "@/components/layout";

import Title from "@/components/ui/Title";
import { createExercise } from "@/firebase/exercise.service";
import { getRutine } from "@/firebase/rutine.service";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {Input} from "@nextui-org/react";
import { getMuscles } from "@/firebase/muscles.service";

const RutinePage = () => {
  const [rutine, setrutine] = useState<any>();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [re, setre] = useState(false);
  const reset = () => {
    setre(!re);
  };
  useEffect(() => {
    if (!router.isReady) return;
    setloading(true);
    getRutine(router.query.id as string).then((rutine) => {
      setrutine(rutine);
      setloading(false);
    });
  }, [router.isReady, router.query.id, re]);
  const [isOpen, setisOpen] = useState(false);
  const onOpen = () => setisOpen(true);
  const onClose = () => setisOpen(false);

  return (
    <Layout>
      <div className="flex md:w-[500px] justify-between">
        <Title loading={loading}>{rutine?.name}</Title>
        <div
          className="bg-primary w-8 h-8 rounded-full  flex items-center align-middle justify-center self-center shadow-xl hover:bg-[#3740bb]
          dark:text-black
          "
          onClick={onOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white md:w-5 md:h-5 dark:text-black"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <ListExercise loading={loading} rutine={rutine} reset={reset} />
      {/* <FloatingAddButton openModal={openModal} /> */}
      <Modal isOpen={isOpen} onOpenChange={onOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <FormCreateExercise
              setloading={setloading}
              closeModal={onClose}
              reset={reset}
              idRutine={router.query.id as string}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default RutinePage;

const FormCreateExercise = ({
  setloading,
  closeModal,
  reset,
  idRutine,
}: any) => {
  const [nameExercise, setnameExercise] = useState("");
  const create = () => {
    setloading(true);
    createExercise(nameExercise, idRutine).then(() => {
      setloading(false);
      closeModal();
      reset();
    });
  };
  const [muscles, setmuscles] = useState<any[]>([]);
  useEffect(() => {
    getMuscles().then((muscles) => {
      setmuscles(muscles as any[]);
    })
  }, [])
  const [selectedMuscles, setselectedMuscles] = useState([])
  return (
    <>
      <h2 className="text-xl">Crear rutina</h2>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          First name
        </label>
        <Input
          value={nameExercise}
          onChange={(e) => setnameExercise(e.target.value)}
          type="text"
          id="Nombre"
          placeholder="Nombre de rutina "
          required
        />
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Musculos
        </label>
        {
          muscles.map((muscle, index) => {
            return <div key={index} className="flex gap-2">
              <input type="checkbox" />
              <h3> {muscle.name}</h3>
            </div>
          })
        }
        <div className="flex items-end justify-end">
          <button
            className="bg-primary p-2 text-white rounded-xl px-6 mt-4 dark:text-black"
            onClick={create}
          >
            Crear
          </button>
        </div>
      </div>
    </>
  );
};
