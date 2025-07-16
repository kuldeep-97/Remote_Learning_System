import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import { Loader, Loader2, Subtitles } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    Subtitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const navigation  =  useNavigate();
  const isPublished = true;
  const isLoading = false;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when your done.
          </CardDescription>
        </div>

        <div className="space-x-2 ">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Publish"}
          </Button>

          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              value={input.Subtitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 7 months"
            />
          </div>

          <div>
            <Label>Descriptioin</Label>
            <RichTextEditor inpute={input} setInpute={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Categroy</Label>
              <Select>
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
            <div> 
              <Label>Course Level</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>
                <SelectLabel>Course Level</SelectLabel>
              
                    <SelectItem value="Beginer">Beginer</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label>Price in (INR)</Label>
                <Input 
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                 onChange={changeEventHandler}
                placeholder="0000"
                className="w-fit"/>
               
            </div>
          </div>
            <div>
                <Label>Course Thumbnail</Label>
                <Input 
                type="file"
                accept="image/*"
                className="w-fit"/>
            </div>
            <div>
                <Button onClick={()=> navigation("/admin/course")} variant="outline" >Cancel</Button>
                <Button disabled={isLoading}>
                    {
                        isLoading ? (
                            <>
                            <Loader2 className="mr-2 h-4 w-3 animate-spin"/>Please wait
                            </>
                        ) : "Save"
                    }
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

// componet folder me vahi component file hoti hai jeseko bar bar use kr sake ya vo file reusable ho ok
