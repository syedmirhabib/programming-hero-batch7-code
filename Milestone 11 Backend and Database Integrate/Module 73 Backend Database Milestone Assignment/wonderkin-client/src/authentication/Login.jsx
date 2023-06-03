import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "./AuthProviders";
import dynamicTitle from "../hooks/dynamicTitle";

import logo from "./../assets/icons/logo.png";

export default function Login() {
  dynamicTitle("Login");

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { userLogin, googleLogin, githubLogin } = useContext(authContext);

  const navigate = useNavigate();
  const notify = (message) => toast.error(message);

  const login = (event) => {
    event.preventDefault();

    userLogin(event.target.email.value, event.target.password.value)
      .then(() => {
        // navigate(from);
        window.location.replace(from);
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/wrong-password).") {
          notify("wrong-password.");
        }
        if (error.message == "Firebase: Error (auth/user-not-found).") {
          notify("user not found.");
        }

        console.log(error);
      });
  };

  const singIn = () => {
    googleLogin().then(() => {
      window.location.replace(from);
    });
  };
  const github = () => {
    githubLogin().then(() => {
      window.location.replace(from);
    });
  };





  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="min-h-screen flex items-center justify-center bg-lime-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 ">

{/* login img */}
          {/* <div>
            <img src="/login.svg" className="w-[600px] max-[850px]:hidden" />
          </div> */}
{/* login img */}



          <div>

{/* Logo and login start*/}

<div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

{/* Logo and login end*/}






{/* Form Start */}
            <form
              className=" card mt-8 space-y-6"
              onSubmit={login}
            >
              



              <div>

{/* email pass text filed start */}

<div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-white-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-white-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>


                {/* email pass text filed end */}


{/* Remember me and forgot */}

          <div className="flex items-center mt-6 justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          
  {/* Remember me and forgot */}

{/* login button start */}


<div className="form-control mt-6 mb-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#406147] hover:bg-[#07500a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-[#07500a] group-hover:text-[#406147]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 0 0-1 1v1.586L5.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 0 0 1.414 1.414L10 12.414V14a1 1 0 0 0 2 0v-1.586l2.293 2.293a1 1 0 0 0 1.414-1.414L11.414 10l4.293-4.293a1 1 0 0 0-1.414-1.414L12 7.586V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1.586l-2.293-2.293A1 1 0 0 0 10 5.586V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Log in
            </button>
          </div>




{/* login button end */}
              



              </div>


            </form>

{/* Form End */}








{/* github and google start */}

<div className="flex items-center justify-between">




          <div className="flex-shrink-0">
            <button

onClick={() => {
  singIn();
}}

              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
            >

<FcGoogle size={25} />

              Sign in with Google
            </button>
          </div>




          <div className="flex-shrink-0">
            <button


onClick={() => {
  github();
}}

              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
            >
            
          
      <IoLogoGithub size={25} />
              Sign in with Github
            </button>
          </div>



        </div>

        {/* github and google end */}


          </div>
        </div>
      </div>





    </div>




  );
}
