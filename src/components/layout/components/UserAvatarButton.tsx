import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import Image from "next/image";
import { signOutWithGoogle } from "@/firebase/auth";

const UserAvatarButton = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user?.photoURL || "/images/exercise.png"}
          alt="Profile picture"
          width="35"
          height="35"
          className="rounded-full "
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account: {user?.displayName} </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOutWithGoogle();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarButton;
