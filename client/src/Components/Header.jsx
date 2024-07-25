import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link ,useLocation} from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-red-400 to-pink-300 rounded-lg text-white">
          Mehmet's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={RiSearchLine}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-14 h-10 lg:hidden" color="gray">
        <RiSearchLine />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue">Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      
    </Navbar>
  );
};

export default Header;
