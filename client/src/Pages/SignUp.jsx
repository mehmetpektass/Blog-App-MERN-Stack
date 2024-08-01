import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-10">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link
            to="/"
            className="font-semibold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-red-400 to-pink-300 rounded-lg text-white">
              Mehmet's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">"Welcome to Mehmet's Blog! Explore articles on technology, travel, and personal development. Enjoy your reading!"</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-3">
            <div className="">
              <Label value="Your Username"/>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your Email"/>
              <TextInput type="email" placeholder="name@company.com" id="email" />
            </div>
            <div className="">
              <Label value="Your Password"/>
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone='purpleToBlue' type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>Have an Account?</span>
            <Link to='/sign-in' className="text-blue-400" >Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
