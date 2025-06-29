import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, School } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const user = true;

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b  dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto  hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>

        {/* User icons and dark mode icon : Drop down */}
        <div className="flex items-center gap-7">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Profile</DropdownMenuItem>

                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>

                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>Dasboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode></DarkMode>
        </div>
      </div>
      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNevbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNevbar = () => {
    const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-100 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode/>
        </SheetHeader>

        <Separator className="mr-2"/>
        <nav className="flex flex-col space-y-5 ">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <span>Log out</span>
        </nav>
       
       {
        role === "instructor" && (
            <SheetFooter>
            <SheetClose>
                 <Button type="submit">Dashboard</Button>
            </SheetClose>
        </SheetFooter>
        )
       }
      
      </SheetContent>
    </Sheet>
  );
};
