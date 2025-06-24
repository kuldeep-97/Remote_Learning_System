import { Button } from "@/components/ui/button";
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
import { useState } from "react";


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
  password: "" 
});

// I/P file se data get krne ke liye ek change hadler bnayege

const changeInputHandler = (e,type) => {

  // const name = e.target.name;
  // const value = e.target.value;
  // eshi value ko distructure krke dala hai 
   const {name,value} = e.target;

   if(type === "signup"){
    setSignupInput({...signupInput, [name]:value}); 
   }else{
    setLoginInput({...loginInput,[name]:value});
   }
};

 // data get ke liye ek fn bnayenge
  const handleRegistration = (type) => {
     const inputData  = type === "signup" ? signupInput : loginInput;
     console.log(inputData)
  }

  return (
    <div className="flex  item-center w-full justify-center mt-10 ">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

         {/* Signup Form */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're 
                 done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input onChange={(e)=> 
                changeInputHandler(e,"signup")}
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
                  onChange={(e)=> changeInputHandler(e,"signup")}
                  name="email"
                  value={signupInput.email}
                  type="email"
                  placeholder="xyz@gmail.com"
                  required
                />

              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input  onChange={(e)=> changeInputHandler(e,"signup")}
                type="password"
                name="password"
                value={signupInput.password}
                 placeholder="xyz" 
                 required />
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={() => handleRegistration("signup")} >signup</Button>
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
                  onChange={(e)=> changeInputHandler(e,"login")}
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
                 onChange={(e)=> changeInputHandler(e,"login")}
                 name="password"
                 value={loginInput.password}
                 type="password" 
                 placeholder="xyz" 
                 required />
              </div>
            </CardContent>
            <CardFooter>
              <Button  onClick={() => handleRegistration("login")}>Login</Button>
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
