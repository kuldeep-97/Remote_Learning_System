
# Tech Stack : 
  - MERN stack
  * Stack Menegment :
     - Redux Toolket : Rtk Query : Rtk query Poweful hai Optimize krta hia apis ko mean no of apis jo bhi unesasury apis calls hoti hai unkl redus krti hai mtlab jab required hota hai tabhi apis call krta hai 

   * Pyment intrgation : ke liye strive use kra hai 



# Client 

* Frontend UI = Shadcn UI useing this project for building web 
  pages
* NodeJs version : 20.18.0

1) npm create vite@latest 
2) npm install
3) npm install tailwindcss @tailwindcss/vite  X Erorr
   ya  : npm install -D tailwindcss postcss autoprefixer

4) Add this import header in your main css file , src/index.css in our case

 @import "tailwindcss";  
  ya fir :  @tailwind base;
            @tailwind components;
            @tailwind utilities;

5) tailwind.config.js me code Add krna hai 

6) JS ke liye jsconfig file creat krna hai or usme code add krna hai

7) vite.cofig me code add krna hai

8) npx shadcn@latest init           

9) npx shadcn@latest add button

10) application start : npm run dev


<!-- xxxxxxxxxxx  ERRoR Big Pura din ki ek kr de esne XXXXXXXXXXXXXXXXXXXXX -->

> Tailwind Css ke versio me problem thi v4 me 
> solution usko doungrat krliya 


# App build start know 
 
 1) Build pages home page login singup etc 
     _ Use best folder structuring
     client/src/pages/ pages


 * ) Component resusabiligy : ek hi componet ko multiplel TIME  kahi bhia kisi bhai componet me  use krna skte hai 





# Server

 1) npm -y init 
 2) creat index.js file 
 3) npm i express mongoose cors dotenv 
    bcryptjs jsonwebtoken nodemon

    *  bcryptjs : password secure krne ke liye Hasing alogrithm 
       ka use kta hai or ye ek packege fome me bcrypt  hai 

 4) Creat server using Express : 
 5) .enb : me sequer file rkhte hai 
 6) Data base connection ko connet kre 
 7) Made a Schema creat
 8) Ragestration Busness logics : Backend Apis : controller folder me Busness logics write krte hia 

# Data Base : 
 
  * DB Connection: 
   1) Creat database folder : 
     - dbconnect.js file 
   2) Creat db Shaema : 
     - do trike ke user hai : mtlab do trike ke account managment system hai : student , instructor.

 * Authentication : token jwt 



# Api's Test : 
 * All api's are properly work then ab api ko frontend se intrigaet ya connect kr hai 


# Front end Intrigation :


# RTK Query : api intrigation 
 * Rtk query is a powerful data fetching and caching tool. 
 * caching : same profile ko bar bar re-fetching se privent krta hai and jo un-nesasory api call se bchata hai 
* Redux setup 



# Navbar 





# cloudinarly : therd party laibrary 
  * use photo and video storage 


 # github : 
 git remote add origin https://github.com/kuldeep-97/Remote_Learning_System.git

git branch -M main

git push -u origin main


# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
