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
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { createMuscle, getMuscles } from "@/firebase/muscles.service";
import CheckIcon from "@/components/icons/CheckIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import CheckOutlineIcon from "@/components/icons/CheckOutlineIcon";

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
    <>
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
    </>
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

  const [muscles, setmuscles] = useState<any[]>([]);
  useEffect(() => {
    getMuscles().then((muscles) => {
      setmuscles(muscles as any[]);
    });
  }, []);
  const updateMuscles = (muscle: string) => {
    setmuscles([...muscles, muscle]);
  };
  const [selectedMuscles, setselectedMuscles] = useState<any[]>([]);
  const onTogleMuscle = (muscle: any) => {
    if (selectedMuscles.includes(muscle)) {
      setselectedMuscles(selectedMuscles.filter((m) => m?.id !== muscle?.id));
      console.log(selectedMuscles);
    } else {
      setselectedMuscles([...selectedMuscles, muscle]);
      console.log(selectedMuscles);

    }
  };

  const create = () => {
    setloading(true);
    createExercise(nameExercise, idRutine,selectedMuscles).then(() => {
      setloading(false);
      closeModal();
      reset();
    });
  };
  return (
    <>
      <h2 className="text-xl">Crear ejercicio</h2>
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
        <div className="flex gap-2 flex-wrap">
          {muscles.map((muscle, index) => {
            return (
              <MuscleTag
                key={index}
                muscle={muscle}
                active={selectedMuscles.includes(muscle)}
                onTogleMuscle={onTogleMuscle}
              />
            );
          })}
          <AddNewMuscle updateMuscles={updateMuscles} />
        </div>

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

const MuscleTag = ({ muscle, active, onTogleMuscle}: any) => {
  const [seleted, setseleted] = useState(active);
  if (seleted) {
    return (
      <div
        onClick={() => {
          onTogleMuscle(muscle)
          setseleted(false);
        }}
        className="flex gap-1 rounded-xl bg-primary text-black px-3 py-1 justify-center align-middle"
      >
        <CheckIcon className="h-4 w-4 text-black" />

        <h3 className="text-sm"> {muscle.name}</h3>
      </div>
    );
  }
  return <div
    onClick={() => {
      onTogleMuscle(muscle)
      setseleted(true);
    }}
    className="flex gap-1 rounded-xl border-primary border px-3 py-1 justify-center align-middle"
  >
    <CheckOutlineIcon className="h-4 w-4 text-white" />

    <h3 className="text-sm"> {muscle.name}</h3>
  </div>;
};
const AddNewMuscle = ({ updateMuscles }: any) => {
  const [showCreateInput, setshowCreateInput] = useState(false);
  const [name, setname] = useState("Musculo nuevo");
  const [loading, setloading] = useState(false);
  if (showCreateInput) {
    return (
      <div className="bg-primary rounded-full flex ">
        <input
          type="text"
          className="bg-primary text-black w-[200px] h-5 rounded-full focus:border-black"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        {loading ? (
          <Spinner className=" text-black" />
        ) : (
          <div
            onClick={() => {
              setloading(true);
              createMuscle(name).then((e) => {
                updateMuscles(e);
                setshowCreateInput(false);
                setloading(false);
              });
            }}
          >
            <CheckIcon className="h-5 w-5 text-black" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className="bg-primary rounded-full w-5 h-5"
      onClick={() => {
        setshowCreateInput(true);
      }}
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
  );
};
