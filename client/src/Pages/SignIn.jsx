import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart , signInSuccess , signInFailure ,resetError} from "../redux/user/userSlice";
import { useDispatch , useSelector } from "react-redux";
import OAuth from "../Components/OAuth.jsx";

const SignIn = () => { 
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading , error:errorMessage} = useSelector(state => state.user)
  useEffect (() => {
    dispatch(resetError())
  },[dispatch])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please Fill The All Fields'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="min-h-screen mt-10">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-semibold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-red-400 to-pink-300 rounded-lg text-white">
              Mehmet's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            "Welcome to Mehmet's Blog! Explore articles on technology, travel,
            and personal development. Enjoy your reading!"
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>Don't Have an Account?</span>
            <Link to="/sign-up" className="text-blue-400">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-3" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
