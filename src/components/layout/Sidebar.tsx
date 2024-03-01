import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SaveIcon from "../icons/SaveIcon";
import ChartIcon from "../icons/ChartIcon";
import CarpetIcon from "../icons/CarpetIcon";
import { useAllRutinesContext } from "@/contexts/AllRutinesContext";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { Button } from "@tremor/react";
import CreateRutineButton from "./components/CreateRutineButton";
import OptionIcon from "../icons/OptionIcon";

const Sidebar = () => {
  const router = useRouter();
  const { rutines } = useAllRutinesContext();

  return (
    <div className="hidden md:flex min-w-[150px] px-10 bg-[#FAFAFA] h-[100vh] flex-col dark:bg-[#02081B]">
      <Link
        href="/"
        className="pl-4 font-bold text-[1.6rem] md:p-0 md:text-[2rem] mt-6 dark:text-white"
      >
        <h1>Fit count</h1>
      </Link>
      <div className="flex flex-col mt-12 gap-6">
        <SidebarItem
          title="Dashboard"
          icon={<SaveIcon className="h-4 w-4 self-center dark:text-white" />}
          active={router.asPath === "/"}
          href="/"
        />
        {/* <SidebarItem title='Rutines'
          icon={<ChartIcon className='h-4 w-4 self-center dark:text-white' />}
          active={router.asPath === '/rutines' || router.asPath.split('/')[1] === 'rutines'}
          href='/rutines'
        />
        <SidebarItem title='Exercise'
          icon={<CarpetIcon className='h-4 w-4 self-center dark:text-white' />}
          active={router.asPath === '/exercises' || router.asPath.split('/')[1] === 'exercises'}
          href='/exercises'
        /> */}
      </div>
      <div className="w-full h-[0.1rem] mt-12 bg-slate-400 dark:bg-slate-600" />
      <div className="mt-12 flex flex-col gap-6 min-w-[200px]">
        {rutines.map((rutine: any, index: any) => {
          const hasExerecises = rutine.exercises.some(
            (exercise: any) => router.asPath === `/exercises/${exercise.id}`
          );
          const isActive =
            router.asPath === `/rutines/${rutine.id}` || hasExerecises;
          return (
            <details key={index} className="flex gap-3">
              <summary className="flex ">
                <div
                  className={`rounded-full h-7 w-7  flex items-center justify-center `}
                >
                  {
                    <ArrowDownIcon className="h-4 w-4 self-center dark:text-white" />
                  }
                </div>
                <div className="flex justify-between flex-1">
                  <Link href={`/rutines/${rutine.id}`}>
                    <p
                      className={`font-bold text-lg self-center ${
                        isActive ? "dark:text-primary" : " dark:text-slate-400"
                      } 
                    ${isActive ? "text-slate-900" : " text-slate-500"}
                     hover:text-slate-900 dark:text-slate-400 dark:hover:text-white `}
                    >
                      {rutine.name}
                    </p>
                  </Link>
                  <OptionIcon className="h-6 w-6 dark:text-slate-500" />
                </div>
              </summary>
              <div className="flex flex-col gap-3 pt-3">
                {rutine.exercises.map((exercise: any, index: any) => {
                  const isActive =
                    router.asPath === `/exercises/${exercise.id}`;
                  return (
                    <details key={index} className="flex gap-3">
                      <summary className="flex pl-8 gap-3">
                        {/* <div className={`rounded-full h-7 w-7  flex items-center justify-center `} >
                            {
                              <CarpetIcon className='h-4 w-4 self-center dark:text-white' />
                            }
                          </div> */}
                        <Link href={`/exercises/${exercise.id}`}>
                          <p
                            className={`font-bold text-base self-center ${
                              isActive
                                ? "dark:text-primary"
                                : " dark:text-slate-400"
                            }  ${
                              isActive ? "text-slate-900" : " text-slate-500"
                            } text-slate-500 hover:text-slate-900  dark:hover:text-white `}
                          >
                            {exercise.name}
                          </p>
                        </Link>
                      </summary>
                    </details>
                  );
                })}
              </div>
            </details>
          );
        })}
        <CreateRutineButton />
      </div>
    </div>
  );
};

const SidebarItem = ({
  title,
  icon,
  active,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  href: string;
}) => {
  return (
    <div className="flex gap-3">
      <div
        className={`rounded-full ${
          active ? "bg-primary" : ""
        } h-7 w-7  flex items-center justify-center `}
      >
        {icon}
      </div>
      <Link href={href}>
        <p
          className={`font-bold text-lg self-center  hover:text-slate-900 ${
            active ? "text-slate-900" : "text-slate-500"
          }
          ${
            active ? "dark:text-white" : "dark:text-slate-500"
          }  dark:hover:text-white 
        `}
        >
          {title}
        </p>
      </Link>
    </div>
  );
};
export default Sidebar;
