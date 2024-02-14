import React from "react";

const Header=(props:any)=>{
    return(
        <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0 flex flex-row">
          <div className="h-10 w-40 self-center mr-2">
            <img className="h-10 w-40 self-center" src="/logo.png" />
          </div>
        </div>

        <div className="sm:mb-0 self-center"></div>
      </nav>
    )
}

export default Header;