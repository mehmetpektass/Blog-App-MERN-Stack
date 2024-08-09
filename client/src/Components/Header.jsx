import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useSelector , useDispatch} from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";

const Header = () => {
  const path = useLocation().pathname;
  const disptch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme)
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
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => disptch(toggleTheme())}>
          {theme === 'light' ? <FaMoon/> : <FiSun/>}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon="false"
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm" >@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate" >{currentUser.email}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
