import Link from "next/link";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import OptionIcon from "./icons/OptionIcon";
const ExerciseCard = ({
  id,
  name,
  active,
}: {
  id: string;
  name: string;
  active: boolean;
}) => {
  let style = " ";
  if (active) {
    style = " !font-bold !text-black";
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
  return (
    <div>
      <li className="flex rounded-xl shadow px-6 py-2 text-lg bg-[#DCFFA4] gap-1 dark:bg-primary flex-col">
        <div className="flex gap-2">
          <Tag name="Peso" />
          <Tag name="Repeticiones" />
        </div>
        <div>
          <Link key={id} href={`/exercises/${id}`}>
            <p className={"font-semibold text-slate-500" + style}>{name}</p>
          </Link>

          {/* <p className='inline text-gray-light-light'>Peso Levantado:</p><p className='inline pl-2 text-gray-light'>40</p> */}
        </div>
      </li>
      {/* <div>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">

            <OptionIcon className="h-6 w-6 dark:text-slate-500" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={items}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={item.key === "delete" ? "text-danger" : ""}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div> */}
    </div>
  );
};

const Tag = ({ name }: { name: string }) => {
  return (
    <div className="rounded-full bg-white p-1 px-2 text-[#75BC00] text-xs">
      {name}
    </div>
  );
};
export default ExerciseCard;
