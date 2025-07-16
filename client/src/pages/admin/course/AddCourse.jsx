import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useCreateCourseMutation } from "@/features/apis/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();
  const navigate = useNavigate();
  //   const isLoading = false;

  const getSelectedCategory = (value) => {
    // alert(value)
    setCategory(value);
  };

  const createCourseHandler = async () => {
    //  console.log(courseTitle, Category)
    await createCourse({ courseTitle, category });
  };

  // for displaying toast message
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, and some basic details for your new course
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, nobis!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="React JS">React JS</SelectItem>
                <SelectItem value="Node JS">Node JS</SelectItem>

                <SelectItem value="Express JS">Express JS</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="Redux">Redux</SelectItem>
                <SelectItem value="Zustand">Zustand</SelectItem>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="Full Stack Developer">
                  Full Stack Developer
                </SelectItem>
                <SelectItem value="MERN Stack Developer">
                  MERN Stack Developer
                </SelectItem>
                <SelectItem value="Block Chain Developer">
                  Block Chain Developer
                </SelectItem>
                <SelectItem value="Paython">Paython</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Css">Css</SelectItem>
                <SelectItem value="Html">Html</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
