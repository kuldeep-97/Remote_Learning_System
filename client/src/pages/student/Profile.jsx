import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { Input } from "postcss";
// import {  } from "@radix-ui/react-dialog";
import React from "react";
import Course from "./Course";

const Profile = () => {
  const isLoading = false;
  const inrolledCourses = [1, 2];
  return (
    <div className=" max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="h-24 w-24 md:h-32 md:w-32 rounded-full mt-4"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-7 mt-6">
          <div className="mb-2">
            <h1 className="font-semibold text-gray-1000 dark:text-gray-200">
              Name:{" "}
              <span className="font-normal text-gray-800 dark:text-gray-200 ml-2">
                Kuldeep Kumawat
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-1000 dark:text-gray-200">
              Email:{" "}
              <span className="font-normal text-gray-800 dark:text-gray-200 ml-2">
                kuldeepkumawat1250@gmail.com
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-1000 dark:text-gray-200">
              Role:{" "}
              <span className="font-normal text-gray-800 dark:text-gray-200 ml-2">
                Instructor{" "}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                size="sm"
                className=" mt-2 bg-black text-white px-2 py-1 rounded-lg"
              >
                Edit Profile{" "}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. and Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <input type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2
                        className="mr-2 h-4
                                w-3 animate-spin"
                      />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Course</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {inrolledCourses.length === 0 ? (
            <h1>You have not enrolled yet</h1>
          ) : (
            inrolledCourses.map((Coursee, index) => <Course key={index} />)
          )} 
        </div>
      </div>
    </div>
  );
};

export default Profile;
