import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 bg-black text-3xl flex justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500 font-montserrat">
     <Link to="/"> <span>
        Filmy<span className="text-white">Meta</span>
      </span></Link>
     <Link to="/addmovie">
      <hl className="text-xl text-white flex items-center cursor-pointer">
        <Button>
          <AddIcon className="mr-1" color="secondary"/>
          <span className="text-white"> Add New </span>
        </Button>
      </hl>
     </Link>
    </div>
  );
};

export default Header;
