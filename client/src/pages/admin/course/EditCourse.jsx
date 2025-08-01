import { Button } from "@/components/ui/button";
import { retry } from "@reduxjs/toolkit/query";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse =  () => {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">Add detail information regarding course</h1>
                <Link to="lecture">
                <Button className="hover:text-blue-700" variant='link'>Go to lectures page</Button>
                </Link>
            </div>
            <CourseTab></CourseTab>
        </div>
    )
}

export default EditCourse;