import PerchesCourse from "@/components/PerchesCourse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/apis/purchaseApi";
import { BadgeInfo, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from 'react-player';


const CourseDetail = () => {

    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Failed to load course details</h1>

    const { course, purchased } = data;
    // console.log(purchased);

    const handleCountinCueourse = () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`)
        }
    }

    // const purchasedCourse = false;
    // console.log("video check",course.lectures[0].videoUrl);


    return (
        <div className="mt-20 space-y-5">
            <div className="bg-[#2D2F31] text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
                    <p className="text-base md:text-lg">{course.subTitle}</p>
                    <p>Created By {"  "} <span>{course?.creator.name}</span></p>

                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={16} />
                        <p>Last updated {course.createdAt.split("T")[0]}</p>

                    </div>
                    <p>Students enrolled: {course?.enrolledStudents.length}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-xl md:text-2xl">Description</h1>
                    <p dangerouslySetInnerHTML={{ __html: course.description }} />

                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>
                                lectures
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {
                                course.lectures.map((lecture, index) => (
                                    <div className="flex items-center gap-3 text-sm" key={index}>
                                        <span>
                                            {
                                                true ? (<PlayCircle size={18} />) : <Lock size={16} />
                                            }
                                        </span>
                                        <p>{lecture.lectureTitle}</p>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <div className="w-full aspect-video mb-4">
                                {course.lectures?.length > 0 && course.lectures[0].videoUrl ? (
                                    <ReactPlayer
                                        width="100%"
                                        height="100%"
                                        url={course.lectures[0].videoUrl}
                                        controls={true}
                                    />
                                ) : (
                                    <p className="text-center text-gray-500">Lecture not uploaded</p>
                                )}
                            </div>

                            <h1>{course?.lectures?.[0]?.lectureTitle}
</h1>
                            <Separator className="my-2" />
                            <h1 className="text-lg md:text-xl font-semibold" >Course Prize</h1>
                        </CardContent>
                        <CardFooter className="flex justify-center p-4">
                            {
                                purchased ? (
                                    <Button onClick={handleCountinCueourse} className="w-full">Continue Course</Button>
                                ) : (
                                    <PerchesCourse courseId={courseId} />
                                )
                            }
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail; 