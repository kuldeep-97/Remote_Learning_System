import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
// import Lecture from "../admin/lecture/Lecture";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from "@/features/apis/progressApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


const CourseProgress = () => {

    const params = useParams();
    const courseId = params.courseId;
    const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

    const [updateLectureProgress] = useUpdateLectureProgressMutation();

    const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
    const [inCompleteCourse, { data: markIncompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

    useEffect(() => {
        // console.log(markCompleteData)

        if (completedSuccess) {
            refetch();
            toast.success(markCompleteData.message);
        }
        if (inCompletedSuccess) {
            console.log(markIncompleteData)

            refetch();
            toast.success(markIncompleteData.message)
        }
    }, [completedSuccess, inCompletedSuccess])


    const [currentLecture, setCurrentLecture] = useState(null);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Failed to load course details</p>

    // console.log(data);

    const { courseDetails, progress, completed } = data.data;
    const { courseTitle } = courseDetails;

    console.log("completornot", completed);

    // initialze the first lecture is hot exist 
     const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

    // const isCompleted = false

     const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

    // console.log(isLectureCompleted);

    const handleLectureProgress = async (lectureId) => {
        await updateLectureProgress({ courseId, lectureId });
        refetch();
    };

    // Handle select a speecifice lecture to watch
    const handleSelecLectrue = (lecture) => {
        setCurrentLecture(lecture);
        handleLectureProgress(lecture._id);
    }


    const handleCompleteCourse = async () => {
        await completeCourse(courseId);

    }

    const handleInCompleteCourse = async () => {
        console.log("CourseID:", courseId);
        console.log(data);
        await inCompleteCourse(courseId);
    }


    return (

        <div className="max-w-7xl mx-auto p-4 mt-20">
            {/* Display course name */}
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">{courseTitle}</h1>
                <Button onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
                    variant={completed ? "outline" : "default"} >
                    {completed ? (
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Completed</span> {" "}
                        </div>
                    ) : (
                        "Mark as completed"
                    )}</Button>
            </div>


            <div className="flex flex-col md:flex-row gap-6">
                {/* Video section */}
                <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
                    <div>
                        {/* video fetch */}
                       {(currentLecture?.videoUrl || initialLecture?.videoUrl) ? (
  <video
    src={currentLecture?.videoUrl || initialLecture?.videoUrl}
    controls
    className="w-full h-auto rounded-lg"
    // onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}  
  />
) : (
  <p className="text-red-500">No video available</p>
)}

                        {/* video */}
                    </div>


                    {/* Display current watching lecture title  */}
                    <div className="mt-2">
                        <h3 className="font-medium text-lg">
                            {
                                `Lecture ${courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture?._id)) + 1} : ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`
                            }
                        </h3>
                    </div>
                </div>


                <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 md:pt-0">
                    <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
                    <div className="flex-1 overflow-y-auto">
                        {
                            courseDetails?.lectures.map((lecture) => (
                                <Card
                                    key={lecture._id}
                                    onClick={() => handleSelecLectrue(lecture)}
                                    className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id
                                        ? "bg-gray-200 dark:dark:bg-gray-800"
                                        : ""
                                        } `}>
                                    <CardContent className="flex items-center justify-between p-4 ">
                                        <div className="flex items-center">
                                            {
                                                isLectureCompleted(lecture._id) ? (<CheckCircle2 size={24} className="text-green-500 mr-2" />) : (<CirclePlay size={24} className="text-gray-500 mr-2" />)
                                            }
                                            <div>
                                                <CardTitle className="text-lg font-medium">{lecture.lectureTitle}</CardTitle>
                                            </div>

                                        </div>
                                        {isLectureCompleted(lecture._id) && (
                                            <Badge
                                                variant={"outline"}
                                                className="bg-green-200 text-green-600"
                                            >
                                                Completed
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseProgress 