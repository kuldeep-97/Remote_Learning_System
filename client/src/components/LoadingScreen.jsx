import { Loader } from "lucide-react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <Loader className="animate-spin h-28 w-28 text-black-900 " />
      <p className="mt-4 text-lg font-semibold text-gray-800">
        Loauding please waite...
      </p>
    </div>
  );
};

export default LoadingScreen;
