import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const FooterCom = () => {
  return (
    <Footer container className="border border-t-5 border-pink-200">
      <div className="">
        <div className="">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-red-400 to-pink-300 rounded-lg text-white">
                Mehmet's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3 sm: gap-6">
            <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup>
                    <Footer.Link 
                    href="https://www.linkedin.com/in/pektasmehmet/"
                    target='blank'
                    rel="noopener noreferrer"
                    >
                        Linkedin
                    </Footer.Link>
                    <Footer.Link 
                    href="https://github.com/mehmetpektass"
                    target='blank'
                    rel="noopener noreferrer"
                    >
                        GitHub
                    </Footer.Link>
                </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
