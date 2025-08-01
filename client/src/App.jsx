import path from "path";
import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import Login from "./pages/login";
import Herosection from "./pages/student/Herosection";
import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "../src/pages/admin/Sidebar"
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/creatLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PerchaseCourseProtecedRoute";
import { ThemeProvider } from "./components/ThemeProvider";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Herosection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>,
      },
      {
        path: "my-learning",
        element:<ProtectedRoute><MyLearning /></ProtectedRoute> ,
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute> ,
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
      },
      {
        path: "course-progress/:courseId",
        element: <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
             <CourseProgress />
          </PurchaseCourseProtectedRoute>
         </ProtectedRoute>
      },

      // admin routes start from here
      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute> ,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },

        ]
      }
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
         <RouterProvider router={appRouter} />
      </ThemeProvider>
      {/* <Button>Let's build LMS : fire</Button> */}
     
    </main>
  );
}

export default App;


// : daynamic route    