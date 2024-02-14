import React,{  } from "react";


const Spinner=(props:any)=>{
    return(
        <div className="flex items-center justify-center min-h-screen bg-[#DFCCFB]  min-w-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    )
}

export default Spinner