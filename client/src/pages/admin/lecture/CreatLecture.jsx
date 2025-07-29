import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectLabel } from "@/components/ui/select";
import { useCreateCourseMutation, useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/apis/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {

    const [lectureTitle, setlectureTitle] = useState("")
    // const isLoadingg = false;
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;

    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();

    const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);
    // console.log(lectureData);

    const creatLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    };

    useEffect(() => {
        if (isSuccess) {
            refetch(); 
            toast.success(data.message);
        }
        if (error) {
            toast.error(error.data.message);
        }
    }, [isSuccess, error])



    return (
        <div className="flex-1 mx-10">
            <div className="mb-4">
                <h1 className="font-bold text-xl">
                    Lets add Lecture, and some basic details for your new course
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
                        name="lectureTitle"
                        value={lectureTitle}
                        onChange={(e) => setlectureTitle(e.target.value)}
                        placeholder="Your Title Name"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>
                        Back to course
                    </Button>
                    <Button disabled={isLoading} onClick={creatLectureHandler}>
                        {isLoading ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </>
                        ) : (
                            "Create lecture"
                        )}
                    </Button>
                </div>
                <div className="mt-10">
                    {
                        lectureLoading ? (
                            <p>Loading lecture...</p>
                        ) : lectureError ? (
                            <p>Failed to load lectures.</p>
                        ) : lectureData.lectures.length === 0 ? (
                            <p>No lectures available</p>
                        ) : (
                            lectureData.lectures.map((lecture, index) => (
                                <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
                            ))
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default CreateLecture;