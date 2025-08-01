import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
// import { Badge } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import React from "react";
import { Link } from "react-router-dom";

const Course = ({course}) => {
  if (!course || !course._id) return <div>Loading...</div>;


  return (

    <Link to={`/course-detail/${course._id}`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
>
      <div className="relative">
        <img
          src={course.courseThumbnail}
          className="w-full h-36 object-cover rounded-t-lg"
          alt="course"
        />
      </div>

      <CardContent className="px-4 py-3 space-y-2">
        <h1 className="hover:underline font-bold text-lg truncate">
          {/* Next.js Complete Course in Hinglish 2025 */}
          {course.courseTitle}
        </h1>
        <div className="flex itmes-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={ course.creator?.photoUrl || "https://github.com/shadcn.png"}
                className="w-8 h-8 rounded-3xl"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm"> {course.creator?.name}</h1>
          </div>
          {/* add to badge */}
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs ">
            {course.courseLevel}
          </Badge>
        </div>
        <div>
            <span className="text-lg font-bold">{course.coursePrice}</span>
        </div>
      </CardContent> 
    </Card>
    </Link>
  );
};

export default Course;

// truncate : text width ke acordidng adjest ho jayega ok
