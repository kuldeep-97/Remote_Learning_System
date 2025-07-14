import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/apis/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Input fild se data grap krna hai to
  // I/p var ko get krne ke liye state var bnayege

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: LoginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate()

  // I/P file se data get krne ke liye ek change hadler bnayege

  const changeInputHandler = (e, type) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // eshi value ko distructure krke dala hai
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  // data get ke liye ek fn bnayenge
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    // console.log(inputData);
    const action = type === 'signup' ? registerUser : loginUser;
     await action(inputData);
  };
 

  useEffect(()=>{
     
    // alert("")
  
    if(registerIsSuccess && registerData){
      toast.success(registerData?.message || "Signup successfull.")
    }
    if(registerError){
      toast.error(registerError?.message || "Signup Fail.")
    }
    if(loginData && loginIsSuccess){
      toast.success(loginData?.data?.message || "Login successfull.")
      navigate("/");
    }
      if(LoginError){
      toast.error(LoginError?.data?.message || "Login Failed.")
    }

  },[loginIsLoading, registerIsLoading, loginData, registerData, LoginError, registerError,])


  return (
    <div className="flex  item-center w-full justify-center mt-20 ">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* Signup Form */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="name"
                  value={signupInput.name}
                  type="text"
                  placeholder="Enter you name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>

                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="email"
                  value={signupInput.email}
                  type="email"
                  placeholder="xyz@gmail.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="password"
                  name="password"
                  value={signupInput.password}
                  placeholder="xyz"
                  required
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button  onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ): "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login Form */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your account here. After signup , you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="email"
                  value={loginInput.email}
                  type="email"
                  placeholder="xyz@gmail.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="password"
                  value={loginInput.password}
                  type="password"
                  placeholder="xyz"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button  onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                  </>
                  ) : "Login"
                }
              </Button>  
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

// add this : npx shadcn@latest add tabs

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";

// const Login = () => {
//   const [signupInput, setSignupInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loginInput, setLoginInput] = useState({
//     email: "",
//     password: "",
//   });

//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;

//     if (type === "signup") {
//       setSignupInput({ ...signupInput, [name]: value });
//     } else {
//       setLoginInput({ ...loginInput, [name]: value });
//     }
//   };

//   return (
//     <div className="flex justify-center w-full mt-10">
//       <Tabs defaultValue="signup" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="signup">Signup</TabsTrigger>
//           <TabsTrigger value="login">Login</TabsTrigger>
//         </TabsList>

//         {/* Signup Form */}
//         <TabsContent value="signup">
//           <Card>
//             <CardHeader>
//               <CardTitle>Signup</CardTitle>
//               <CardDescription>Create your account here.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   name="name"
//                   value={signupInput.name}
//                   type="text"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   name="email"
//                   value={signupInput.email}
//                   type="email"
//                   placeholder="xyz@gmail.com"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   name="password"
//                   value={signupInput.password}
//                   type="password"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button>Signup</Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Login Form */}
//         <TabsContent value="login">
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>Access your account here.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   name="email"
//                   value={loginInput.email}
//                   type="email"
//                   placeholder="xyz@gmail.com"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   name="password"
//                   value={loginInput.password}
//                   type="password"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button>Login</Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Login;
