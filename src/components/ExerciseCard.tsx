import Link from "next/link";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import OptionIcon from "./icons/OptionIcon";
import { deleteExercise } from "@/firebase/exercise.service";
const ExerciseCard = ({
  id,
  name,
  active,
  reset,
}: {
  id: string;
  name: string;
  active: boolean;
  reset: any;
}) => {
  let style = " ";
  if (active) {
    style = " !font-bold !text-primary";
  }
  const items = [
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];
  const [isOpen, setisOpen] = useState(false);
  const onOpen = () => setisOpen(true);
  const onClose = () => setisOpen(false);
  return (
    <div>
      <li className="flex rounded-xl  shadow px-4 py-4 pt-3 text-lg md:w-[500px] bg-white gap-1 dark:bg-transparent justify-between  border-2 border-primary dark:text-white">
        <Link key={id} href={`/exercises/${id}`} className="flex flex-1">
          <div className="flex flex-col gap-2 flex-1">
            <div>
              <p
                className={"font-semibold text-black dark:text-white " + style}
              >
                {name}
              </p>
              {/* <p className='inline text-gray-light-light'>Peso Levantado:</p><p className='inline pl-2 text-gray-light'>40</p> */}
            </div>
            <div className="flex gap-2">
              <Tag name="Peso" />
              <Tag name="Repeticiones" />
            </div>
          </div>
        </Link>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" className="w-8 p-0 m-0" variant="light">
                <OptionIcon className="h-7 w-7  dark:text-slate-500" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
              <DropdownItem color={"default"}>Editar ejercicio</DropdownItem>
              <DropdownItem
                color={"danger"}
                className="text-danger"
                onClick={() => {
                  onOpen();
                  // setcurrentIdRutine(rutine.id);
                  // openModal()
                }}
              >
                Eliminar ejercicio
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <OptionIcon className="" /> */}
        </div>
      </li>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <p>Estas seguro de eliminar ?</p>
            
          </ModalBody>
          <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{
                  deleteExercise(id).then(()=>{
                    reset()
                    onClose()
                  })
                }}>
                  Ok
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const Tag = ({ name }: { name: string }) => {
  return (
    <div className="rounded-full bg-primary p-1 px-3 text-black text-xs">
      {name}
    </div>
  );
};
export default ExerciseCard;
