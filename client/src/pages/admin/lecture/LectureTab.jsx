import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/apis/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {

    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgess, setMediaProgess] = useState(false);
    const [uploadProgess, setUpdloadProgess] = useState(0)
    const [btnDisable, setBtnDisable] = useState(true);

    const params = useParams();
    const { courseId, lectureId } = params;

    const {data:lectureData} = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture;

    useEffect(() => {
        if(lecture) {
            
            setLectureTitle(lecture.lectureTitle);
            setIsFree(lecture.isPreviewFree);
            setUploadVideoInfo(lecture.videoInfo)
        }
    },[lecture]) 
    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();

    const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removesuccess }] = useRemoveLectureMutation();

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formdata = new FormData();
            formdata.append("file", file);

            setMediaProgess(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formdata, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUpdloadProgess(Math.round((loaded * 100) / total));
                    }
                });

                if (res.data.success) {
                    console.log(res);
                    setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id })
                    setBtnDisable(false);
                    toast.success(res.data.message);
                }


            } catch (error) {
                console.log(error);
                toast.error("video upload failed")
            } finally {
                setMediaProgess(false)
            }
        }
    }

    const editLectureHandler = async () => {
        // alert("working")
        // console.log("Edit lecture",{ lectureTitle, uploadVideoInfo, isFree, courseId, lectureId });
        await editLecture({
            lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree: isFree,
            courseId,
            lectureId
        })
    };

    const removeLectureHandler = async () => {
        await removeLecture(lectureId);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message);
        }
        if (error) {
            toast.error(error.data.message);   
        }

    }, [isSuccess,error])

    useEffect(() => {
        if (removesuccess) {
            toast.success(removeData.message)
        }
    }, [removesuccess])


    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture </CardTitle>
                    <CardDescription>Make changes and click save a Lecture
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler} >
                        {
                            removeLoading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait
                                </> : "Remove Lecture  "
                        }
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input
                        type='text'
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder='Ex. Introduction lecture'
                    />
                </div>

                <div className="my-5">
                    <Label>Video <span className="text-red-500">*</span></Label>
                    <Input
                        type='file'
                        accept='video/*'
                        onChange={fileChangeHandler}
                        placeholder='Ex. Introduction lecture'
                        className="w-fit"
                    />
                </div>

                <div className=" flex items-center space-x-2 my-5">
                    <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
                    <Label htmlFor="airplane-mode">FREE Video</Label> </div>

                {
                    mediaProgess && (
                        <div className="my-4">
                            <Progress value={uploadProgess} />
                            <p>{uploadProgess}% uploaded</p>
                        </div>
                    )
                }

                <div className="mt-4">
                    <Button disabled={isLoading} onClick={editLectureHandler}>  
                           {
                            isLoading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait
                                </> : "Update Lecture"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab