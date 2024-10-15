import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ButtonTheme from "../ButtonTheme";
import MenuBurgerIcon from "../icons/MenuBurgerIcon";
import UserAvatarButton from "./components/UserAvatarButton";

const Header = () => {
  const router = useRouter();
  const [visible, setisVisible] = useState(false);
  const openModal = () => {
    setisVisible(true);
  };
  const closeModal = () => {
    setisVisible(false);
  };
  return (
    <header className="flex justify-between pt-8 px-6  md:hidden md:max-w-[1000px] md:m-auto md:bg-white md:rounded-xl md:my-6 md:pt-2 md:px-6 ">
      {/* <Modal visible={visible} openModal={openModal} closeModal={closeModal}>
        <BodyModal closeModal={closeModal} />
      </Modal> */}
      <div className="flex justify-center items-center">
        {
          <Link
            href="/dashboard"
            className=" font-bold text-[1.6rem] md:p-0 md:text-[1.8rem] dark:text-white"
          >
            <h1>Fit count</h1>
          </Link>
        }
        <span className="pl-8 items-end justify-end p-0 m-0 hidden md:block dark:text-white">
          Home / {getTitle(router.asPath)}
        </span>
      </div>

      <div className="flex justify-center items-center gap-4">
        <ButtonTheme />
        <UserAvatarButton />
        {router.asPath === "/dashboard" ? <MenuBurgerIcon /> : <BackButton />}
      </div>
    </header>
  );
};

const getTitle = (path: string) => {
  if (path === "/rutines") {
    return "Rutines";
  }
  if (path === "/exercises") {
    return "Exercises";
  }
  if (path === "/rutines/new") {
    return "New Rutine";
  }
  if (path === "/exercises/new") {
    return "New Exercise";
  }
  if (path === "/rutines/[id]") {
    return "Rutine";
  }
  if (path === "/exercises/[id]") {
    return "Exercise";
  }
  if (path === "/rutines/[id]/edit") {
    return "Edit Rutine";
  }
  if (path === "/exercises/[id]/edit") {
    return "Edit Exercise";
  }
  return "Dashboard";
};

const BackButton = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleBackButtonClick}
      className="ml-0 md:hidden dark:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
    </button>
  );
};

// const BodyModal = ({ closeModal }: any) => {
//   const { loading, rutines } = useAllRutinesContext();

//   return (
//     <>
//       <div className="overflow-y-scroll h-[80vh] dark:bg-black">
//         <ListRutines
//           rutines={rutines}
//           loading={loading}
//           closeModal={closeModal}
//         />
//       </div>
//     </>
//   );
// };
export default Header;
