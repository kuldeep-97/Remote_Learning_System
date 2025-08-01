import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader, 
  TableRow,
} from "@/components/ui/table"
import { useGetCreatorCoursesQuery } from "@/features/apis/courseApi";
import { Edit } from "lucide-react";

import React from "react";
import { Link,  useNavigate } from "react-router-dom";


// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ]

const CourseTable = () => {
    const navigate = useNavigate()
    const {data, isLoading} = useGetCreatorCoursesQuery();

    if(isLoading) return <h1>Loading...</h1>
    //  console.log("data", data)
    

    return (
        <div>
            {/* <Link to="/admin/courses/create"> <Button>Creat a new course</Button></Link> */}
             <Button className="mb-3" onClick={()=> navigate('create')}>Creat a new course</Button>
           
             <Table>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.courses.map((course) => (
          <TableRow key={course?._id}>
            <TableCell>{course?.coursePrice || "NA"}</TableCell>
            <TableCell><Badge>{course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
            <TableCell className="font-medium">{course?.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Button onClick={()=> navigate(`${course?._id}`)}><Edit /></Button>
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>
    </Table> 
        </div>
    )
}
export default CourseTable  ;