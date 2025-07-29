import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCoursebyIdQuery, usePublishCourseMutation } from "@/features/apis/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;

  const {data:CoursebyIdData, isLoading:getCoursebyIslooding , refetch} = useGetCoursebyIdQuery(courseId);

  const [publishCourse, {}] = usePublishCourseMutation();

  const course = CoursebyIdData?.course;
  useEffect(()=>{
       if(course){
        setInput({
    courseTitle: course.courseTitle,
    subTitle: course.subTitle,
    description: course.description,
    category: course.category,
    courseLevel: course.courseLevel,
    coursePrice: course.coursePrice,
    courseThumbnail: course.courseThumbnail
        })
       }
  } , [CoursebyIdData])

  const [previewThumbnail, setPreviewThumbnail] = useState("")
   


  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

 const navigation  =  useNavigate();

  const [editCourse, {data, isLoading, isSuccess, error}] = useEditCourseMutation();

  const selectCategory = (value) => {
    setInput({...input, category:value});
  }

    const slectCourseLevel = (value) => {
    setInput({...input, courseLevel:value});
  }

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if(file){
      setInput({...input,courseThumbnail:file});
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
      fileReader.readAsDataURL(file)
    }
    // use file reader : file reader img ko data url convert krta hia , jab device se img get krte hai to vo dairect show  nhi kr skte brwoser pe uss img ko show krne ke liye data url me convert krna pda hai  that resion file reader use hota hai.

  } 

  const updataCourse = async() => {
    console.log(input)
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({formData,courseId})
  };


  const publishStatusHandler = async (action) => {
      try {
        const response = await publishCourse({courseId, query:action});
        if(response.data){
          refetch();
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to publish or unpublish course")
      }
  };


  useEffect(()=> {
    if(isSuccess){
      toast.success(data.message || "Course update")
    }
    if(error) {
      toast.error(error.data.message || "Faild to update course")
    }

  },[isSuccess, error])

  if(getCoursebyIslooding) return <h1>Loading...</h1>

  
  // const isPublished = true;
  // const isLoading = false;

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
          <Button disabled={CoursebyIdData?.course.lectures.length === 0} variant="outline" onClick={()=> publishStatusHandler(CoursebyIdData?.course.isPublished ? "false" : "true" )}>
            {CoursebyIdData?.course.isPublished ? "Unpublished" : "Publish"}
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
              name="subTitle"
              value={input.subTitle}
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
              <Select onValueChange={selectCategory}>
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
              <Select onValueChange={slectCourseLevel}>
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
                <Input onChange={selectThumbnail}
                type="file"
                accept="image/*"
                className="w-fit"/>
                {
                  previewThumbnail && (
                    <img src={previewThumbnail} className="e-64 my-2" alt="Course Thumbnail"/>
                  )
                }
            </div>
            <div>
                <Button onClick={()=> navigation("/admin/course")} variant="outline" >Cancel</Button>
                <Button disabled={isLoading} onClick={updataCourse}>
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
// add exta to 849