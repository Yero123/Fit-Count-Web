import { useExerciseContext } from "@/contexts/DoExerciseContext";
import { useState } from "react";
import { Button, DatePicker } from "@tremor/react";

const FormSet = () => {
  const {
    loading,
    weight,
    repetitions,
    handleAddSession,
    handleChangeWeight,
    handleChangeRepetitions,
    inEditMode,
    handleEditSession,
    handleDeleteSession,
    date,
    setdate
  } = useExerciseContext();
  if (loading)
    return (
      <div className=" bg-white absolute bottom-4 flex justify-between align-middle w-[90%] dark:bg-[#02081B] dark:border-slate-600 dark:border-[1px]">
        <div className="flex flex-col shadow-md p-4 gap-1 bg-white dark:bg-[#02081B] dark:border-slate-600 dark:border-[1px]">
          <label htmlFor="kilogramos">Kilogramos</label>
          <input
            type="number"
            className="p-2 bg-zinc-100 max-w-[100px] animate-pulse  rounded-lg border-2 border-secondary dark:bg-[#02081B] dark:border-slate-600 dark:border-[1px]"
            value={0}
          />
        </div>
        <div className="flex flex-col shadow-md p-4 gap-2 bg-white dark:bg-[#02081B] dark:border-slate-600 dark:border-[1px]">
          <label htmlFor="repetitions">Repetitions</label>
          <input
            type="number"
            className="p-2 bg-zinc-100 max-w-[100px] animate-pulse bg-gray-light rounded-lg border-2 border-secondary dark:bg-[#02081B] dark:border-slate-600 dark:border-[1px]"
            value={0}
          />
        </div>
        <button className="w-20 h-20 bg-primary text-white font-bold self-center rounded-xl dark:text-black"></button>
      </div>
    );
  return (
    <div className="absolute bottom-4 flex justify-between align-middle w-[90%] md:max-w-[400px] self-center self items-center flex-col">
      <div className="flex w-full min-w-[300px]  max-w-[400px]">
        <div className="flex flex-col shadow-md p-4 gap-2 bg-white dark:bg-[#02081B] ">
          <label className="dark:text-white" htmlFor="kilogramos">
            Kilogramos
          </label>
          <input
            type="number"
            className="p-2 bg-zinc-100 max-w-[100px] dark:bg-[#02081B]  rounded-lg border-2 border-secondary dark:text-white"
            value={weight}
            onChange={handleChangeWeight}
          />
        </div>
        <div className="flex flex-col shadow-md p-4 gap-2 bg-white dark:bg-[#02081B] ">
          <label className="dark:text-white" htmlFor="repetitions">
            Repetitions
          </label>
          <input
            type="number"
            className="p-2 bg-zinc-100 max-w-[100px]  dark:bg-[#02081B] rounded-lg border-2 border-secondary dark:text-white"
            value={repetitions}
            onChange={handleChangeRepetitions}
          />
        </div>
        <button
          className="w-20 h-20 bg-primary text-white font-bold self-center rounded-xl dark:text-black"
          onClick={inEditMode ? handleEditSession : handleAddSession}
        >
          {inEditMode ? "Editar" : "+"}
        </button>
      </div>
      {inEditMode && <div className="flex justify-between w-full align-bottom min-w-[300px] max-w-[400px]">
        <div className="flex flex-col shadow-md p-4 gap-2 bg-white dark:bg-[#02081B] ">
          <label className="dark:text-white" htmlFor="kilogramos">
            Fecha
          </label>
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={(e) => setdate(new Date(e.target.value))}
            className="p-2 bg-zinc-100 max-w-[250px] dark:bg-[#02081B]  rounded-lg border-2 border-secondary dark:text-white"
          />
        </div>
        <Button onClick={handleDeleteSession} className="w-[150px] bg-red-500 dark:bg-red dark:border-red-500 font-bold  rounded-xl dark:text-black self-end mb-6">
          Eliminar
        </Button>
      </div>}
    </div>
  );
};

export default FormSet;
