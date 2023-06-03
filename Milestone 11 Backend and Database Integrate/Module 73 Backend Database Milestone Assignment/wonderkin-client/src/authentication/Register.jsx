import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "./AuthProviders";
import dynamicTitle from "../hooks/dynamicTitle";

export default function Register() {
  dynamicTitle("Register");
  const { userRegister } = useContext(authContext);
  const navigate = useNavigate();

  const notify = (message) => toast.error(message);

  const register = (event) => {
    event.preventDefault();

    userRegister(event.target.email.value, event.target.password.value)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: event.target.name.value,
          photoURL: event.target.photo.value,
        });

        navigate("/");
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          notify("Email already exits.");
        }
        if (
          error.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          notify("Password should be at least 6 characters.");
        }
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

      <div className="hero min-h-screen ">
        <div className="hero-content flex">
          <div className="">
            <img src="/register.svg" className="w-[640px] max-[850px]:hidden" />
          </div>

          <div>
            <h1 className="text-5xl text-center mb-5 font-bold text-[#406147]">
              Sign Up
            </h1>

            <form
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
              onSubmit={register}
            >
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    id="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    id="password"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo Url"
                    id="photo"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <Link to="/login" className="label-text-alt link">
                      Already have an account ?
                    </Link>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-ghost text-white bg-[#406147] hover:bg-[#07500a] border-none">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
