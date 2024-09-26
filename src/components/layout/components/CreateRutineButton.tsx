import { useAllRutinesContext } from "@/contexts/AllRutinesContext";
import { createRutine } from "@/firebase/rutine.service";
import useMainStore from "@/store/MainStore";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import React, { useState } from "react";

const CreateRutineButton = () => {
  const [isOpen, setisOpen] = useState(false);
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const rutineQuery = useMainStore((state) => state?.rutineQuery);
  return (
    <>
      <Button
        variant="secondary"
        className="w-full mt-6"
        onClick={() => {
          setisOpen(true);
        }}
      >
        Add Rutine
      </Button>
      <Dialog open={isOpen} onClose={(val) => setisOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Crear Rutina
          </h3>
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Digite el nombre:
          </p>
          <input className="w-full mt-2 p-2 border-2 border-tremor-default dark:border-dark-tremor-default" 
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <Button loading={loading} className="mt-8 w-full" onClick={() =>{
            setloading(true);
            createRutine(name).then(() => {
                setisOpen(false);
                setname("");
                rutineQuery?.refetch();
            })
          }}>
            Confirmar
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default CreateRutineButton;
