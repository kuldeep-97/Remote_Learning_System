import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.js";


export const getCourseProgress = async (req,res) => {

    try {
        const {courseId}  =  req.params;
        const userId = req.id;

        // step 1 fetch the user course progress
        let courseProgress = await CourseProgress.findOne({courseId, userId}).populate("courseId");

        const courseDetails = await Course.findById(courseId).populate("lectures");

        if(!courseDetails){
            return res.status(404).json({
                message: "Course not found"
            })
        }

        // step-2 if no progress found , return course details with an emtpy progress
        if(!courseProgress){
            return res.status(200).json({
                data:{
                    courseDetails,
                    progress:[],
                    completed:false
                }
            })
        }

        // step-3 return the use's course progress alog with course details 
         return res.status(200).json({
                data:{
                    courseDetails,
                    progress:courseProgress.lectureProgress,
                    completed:CourseProgress.completed
                }
            })
    } catch (error) {
        console.log(error);
    }

};


export const updateLectureProgress = async (req,res) => {
    try {
        const {courseId, lectureId} = req.params;
        const userId = req.id;

        // fetch or create course progress 
         let courseProgress = await CourseProgress.findOne({courseId, userId})

        // if no progress exist create a new record 
        if(!courseProgress){
        
        courseProgress = new CourseProgress({
           userId,
           courseId,
           completed:false,
           lectureProgress:[]
           })
         }

        // find the lecture progress in the course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId  );

        if(lectureIndex !== -1){
            // if lecture alerady update its status
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            // Add new lecture porgress
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true
            });
        }

        // if all lectue is completed
        const lectureProgressLength = courseProgress.lectureProgress.filter((lectuerprog)=> lectuerprog.viewed).length;

        const course = await Course.findById(courseId);
        if(course.lectures.length === lectureProgressLength) courseProgress.completed=true;

        await courseProgress.save();

        return res.status(200).json({
            message:"Lecture progress updated succefully"
        });

    } catch (error) {
        console.log(error);
    }
};


export const markAsCompleted = async (req, res) => {
  try {
    //  console.log(" markAsCompleted reached");
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as completed." });
  } catch (error) {
    console.log(error);
  }
};


export const markAsInCompleted = async (req, res) => {
    try {
        //  console.log(" markAsIINCompleted reached");
      const { courseId } = req.params;
      const userId = req.id;
  
      const courseProgress = await CourseProgress.findOne({ courseId, userId });
      if (!courseProgress)
        return res.status(404).json({ message: "Course progress not found" });
  
      courseProgress.lectureProgress.map(
        (lectureProgress) => (lectureProgress.viewed = false)
      );
      courseProgress.completed = false;
      await courseProgress.save();
      return res.status(200).json({ message: "Course marked as incompleted." });
    } catch (error) {
      console.log(error);
    }
    
  };