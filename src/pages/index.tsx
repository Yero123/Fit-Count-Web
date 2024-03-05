import { useEffect, useState } from "react";
import { createRutine, getRutines } from "@/firebase/rutine.service";
import Title from "@/components/ui/Title";
import ListRutines from "@/components/ListRutines";
import FloatingAddButton from "@/components/FloatingAddButton";
import Modal from "@/components/ui/Modal";
import { getDaysWorkedByWeek, passSessions } from "@/firebase/sessions.service";
import { useAllRutinesContext } from "@/contexts/AllRutinesContext";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Image from "next/image";
import CheckIcon from "@/components/icons/CheckIcon";
import Xicon from "@/components/icons/Xicon";
import LineIcon from "@/components/icons/LineIcon";

import { Card, Text, Metric, Button } from "@tremor/react";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { BarChartExample3 } from "@/components/charts/BarChart";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";
import ButtonTheme from "@/components/ButtonTheme";
import { Rutine, Session } from "@/models";
import {
  DayWorkout,
  ExerciceTable,
  RutineTable,
} from "@/components/pages/Dashboard";
import Layout from "@/components/layout";

export default function Home() {
  const { loading, reportWeek, rutines, setloading, reset } =
    useAllRutinesContext();

  return (
    <Layout>
      <div>
        <Title loading={loading}>Rutinas</Title>
        <div className="xl:flex-nowrap flex gap-8 flex-wrap">
          <RutineTable />
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
            <div className="bg-gray-light h-[3px] w-[88%] absolute top-7 md:top-[4.5rem] rounded-full"></div>
          </div>
        </div>
        <div className=" flex-wrap flex lg:flex-nowrap gap-8 min-h-[40vh]">
          <BarChartExample3 />
          <ExerciceTable />
        </div>
      </div>
    </Layout>
  );
}
