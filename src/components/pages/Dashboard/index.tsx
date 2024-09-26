import CheckIcon from "@/components/icons/CheckIcon";
import LineIcon from "@/components/icons/LineIcon";
import { createRutine } from "@/firebase/rutine.service";
import { useExerciseStatus } from "@/hooks/dashboard/useExerciseStatus";
import { useRutineStatus } from "@/hooks/dashboard/useRutineStatus";
import { useWeekStatus } from "@/hooks/dashboard/useWeekStatus";
import Link from "next/link";
import { useState } from "react";

export const RutineTable = () => {
  const { dataTable } = useRutineStatus();
  const columns = [
    {
      Header: "Nombre",
      accessor: "name", // accessor is the "key" in the data
    },
    {
      Header: "Estado",
      accessor: "status",
    },
    {
      Header: "Ultima modificacion",
      accessor: "lastModification",
    },
    {
      Header: "Progreso",
      accessor: "progress",
    },
  ];
  return (
    <div className="mb-6 shadow-md rounded-2xl max-h-[40vh]  w-full ">
      <div className="overflow-x-auto rounded-2xl  max-h-[40vh]  w-full   shadow-tremor-card  dark:border-slate-600 dark:border-[1px]">
        <table
          className={`w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  lg:w-full`}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-3 py-1 md:px-6 md:py-3 text-[#A3AED0] font-medium"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row: any, i: any) => (
              <tr key={i} className="bg-white dark:bg-[#02081B]">
                <th
                  scope="row"
                  className="px-3 py-3 md:px-6 md:py-3 font-medium text-gray-900 whitespace-nowrap text-[#2B3674] dark:text-white"
                >
                  <Link href={row.link}>{row.name}</Link>
                </th>
                <td className="px-3 py-3 md:px-6 md:py-3font-bold text-[#2B3674] dark:text-white">
                  <div className=" gap-2 hidden md:flex">
                    <StatusIcon status={row.status} />
                    {/* <CheckIcon className='h-5 w-5 text-[#05CD99]' />  */}

                    {row.status}
                  </div>
                  <div className=" gap-2 flex md:hidden">
                    <StatusIcon status={row.status} />
                  </div>
                </td>
                <td className="px-3 py-3 md:px-6 md:py-3font-bold text-[#2B3674] dark:text-white">
                  {row.lastModification}
                </td>
                <td className="px-3 py-3 md:px-6 md:py-3 font-bold text-[#2B3674] dark:text-white">
                  <div className="w-full">
                    <ProgressBar total={100} value={row.progress} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const StatusIcon = ({ status }: any) => {
  switch (status) {
    case "Completado":
      return <CheckIcon className="h-5 w-5 text-[#05CD99]" />;
    case "No iniciado":
      return <LineIcon className="h-5 w-5 text-[#A3AED0]" />;
    // return <Xicon className='h-5 w-5 text-[#EE5D50]' />
    case "En progreso":
      return <LineIcon className="h-5 w-5 text-[#FFCE20]" />;
  }
};

export const ExerciceTable = () => {
  const { dataTable } = useExerciseStatus();

  const columns = [
    {
      Header: "No",
      accessor: "progress",
    },
    {
      Header: "Nombre",
      accessor: "name", // accessor is the "key" in the data
    },
    {
      Header: "1 Rep x Kg",
      accessor: "record1",
    },
    {
      Header: "2 Rep x Kg",
      accessor: "record1",
    },
    {
      Header: "Modification",
      accessor: "lastModification",
    },
  ];
  return (
    <div className="mb-6 shadow-md rounded-2xl w-full ">
      <div className="overflow-x-auto rounded-2xl shadow-tremor-card  max-h-[40vh] dark:border-slate-600 dark:border-[1px] w-full">
        <table
          className={`w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-6 py-3 text-[#A3AED0] font-medium"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row: any, i: any) => (
              <tr key={i} className="bg-white dark:bg-[#02081B]">
                <td className="px-6 py-4 font-bold text-[#2B3674] dark:text-white">
                  <p>{i + 1}</p>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-[#2B3674] dark:text-white"
                >
                  <Link href={row.link}>{row.name}</Link>
                </th>
                <td className="px-6 py-4 font-bold text-[#2B3674] dark:text-white">
                  <div className="flex gap-2">
                    {/* <StatusIcon status={row.status} /> */}
                    {/* <CheckIcon className='h-5 w-5 text-[#05CD99]' />  */}

                    {row.record1}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-[#2B3674] dark:text-white">
                  <div className="flex gap-2">
                    {/* <StatusIcon status={row.status} /> */}
                    {/* <CheckIcon className='h-5 w-5 text-[#05CD99]' />  */}

                    {row.record2}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-[#2B3674] dark:text-white">
                  {row.record2 - row.record1 > 0 ? (
                    <span className="text-[#05CD99]">
                      +{row.record2 - row.record1}
                    </span>
                  ) : (
                    <span className="text-[#EE5D50]">
                      {row.record2 - row.record1}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ProgressBar = ({ total, value }: any) => {
  // Calcular el porcentaje completado
  const progress = (value / total) * 100;

  return (
    <div className="w-full bg-[#EFF4FB] rounded-lg overflow-hidden h-3">
      <div className="h-3 bg-[#C5F541]" style={{ width: `${progress}%` }}></div>
    </div>
  );
};
export const DayWorkout = ({ day, active }: any) => {
  return (
    <div className="flex flex-col justify-center ">
      <span className="text-gray-light text-xs md:text-base font-semibold text-center dark:text-white">
        {day}
      </span>
      {active ? (
        <div className="bg-primary w-8 h-8 rounded-full flex justify-center items-center mt-5 md:w-12 md:h-12 md:mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="5"
            stroke="currentColor"
            className="w-3 h-3 text-white md:w-5 md:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      ) : (
        <div className="bg-gray-light w-8 h-8 rounded-full flex justify-center items-center mt-5 md:w-12 md:h-12 md:mt-8">
          <div className="bg-white rounded-full w-2 h-2"></div>
        </div>
      )}
    </div>
  );
};
export const Statistic = () => {
  return (
    <div className="bg-white max-w-[200px] flex p-2 rounded-lg gap-3 justify-center items-center shadow md:p-5 md:max-w-none">
      <div className="w-10 h-10 bg-secondary rounded-lg flex justify-center items-center">
        <div className="bg-primary w-3 h-3 rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="font-regular text-gray-light text-xs md:text-lg">
          Peso levantado
        </span>
        <span className="font-bold text-base">250Kg</span>
      </div>
    </div>
  );
};

export const FormCreateRutine = ({ setloading, closeModal, reset }: any) => {
  const [nameRutine, setnameRutine] = useState("");
  const create = () => {
    setloading(true);
    createRutine(nameRutine).then(() => {
      setloading(false);
      closeModal();
      reset();
    });
  };
  return (
    <>
      <h2 className="text-xl">Crear rutina</h2>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          First name
        </label>
        <input
          value={nameRutine}
          onChange={(e) => setnameRutine(e.target.value)}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-light text-gray text-sm rounded-lg focus:ring-blue-500 focus:border-primary-text block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nombre de rutina "
          required
        />
        <div className="flex items-end justify-end">
          <button
            className="bg-primary p-2 text-white rounded-xl px-6 mt-4 "
            onClick={create}
          >
            Crear
          </button>
        </div>
      </div>
    </>
  );
};

export const WeekActivity = () => {
  const { reportWeek } = useWeekStatus();
  return (
    <div className="flex bg-white rounded-lg flex-col shadow px-3 pb-6 md:pt-1 mb-8   relative md:px-8 md:py-6 md:pt-6 md:mb-6 z-0 flex-1 w-full dark:bg-[#02081B] dark:border-slate-600 dark:border-[1px]">
      <div className="flex justify-between mt-4 gap-3">
        <DayWorkout day="Lun" active={reportWeek[1]} />
        <DayWorkout day="Mar" active={reportWeek[2]} />
        <DayWorkout day="Mie" active={reportWeek[3]} />
        <DayWorkout day="Jue" active={reportWeek[4]} />
        <DayWorkout day="Vie" active={reportWeek[5]} />
        <DayWorkout day="Sab" active={reportWeek[6]} />
        <DayWorkout day="Dom" active={reportWeek[0]} />
      </div>
      <div className="bg-gray-light h-[3px] w-[95%] md:w-[88%] absolute top-10 md:top-[4.5rem] rounded-full"></div>
    </div>
  );
};
