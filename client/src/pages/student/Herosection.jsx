import React from "react";

const Herosection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-20 px-4 text-center mt-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find The Best Courses For You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form action="" className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
            <input  placeholder="Serach Courses here" type="text" name="" id="" 
            className="flex-grow border-none outline-none focus-visible:ring-0 px-6 py3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600" />
            <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</button>
        </form>
         <button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200 py-1 px-3">Explor Courses</button>
      </div>
    </div>
  );
};

export default Herosection;

