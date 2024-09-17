import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";

const FooterCom = () => {
  return (
    <Footer container className="border border-t-5 border-pink-200">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <div className="flex items-center space-x-1">
                <span className="text-4xl font-bold text-gray-800 tracking-wide  dark:text-white">
                  Innovate
                </span>
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-600">
                  &
                </span>
                <span className="text-4xl font-bold text-gray-800 tracking-wide  dark:text-white">
                  Develop
                </span>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="flex flex-col">
              <Footer.Title title="About" />
              <Footer.LinkGroup>
                <Footer.Link href="/about" rel="noopener noreferrer">
                  About
                </Footer.Link>
                <Footer.Link href="/projects" rel="noopener noreferrer">
                  Projects
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="flex flex-col ml-5">
              <Footer.Title title="For More" />
              <Footer.LinkGroup>
                <Footer.Link
                  href="https://www.linkedin.com/in/pektasmehmet/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/mehmetpektass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-center">
          <Footer.Copyright
            href="#"
            by="Mehmet's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center ml-3">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
