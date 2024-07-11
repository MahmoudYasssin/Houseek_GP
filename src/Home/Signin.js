import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-hot-toast'; 
import axios from "./api/axios";
import useAuth from "../custom-hook/useAuth";
import FormInput from "./FormInput";

const Signin = () => {
  const {
    setAuth,
    token,
    settoken,
    signup,
    signin,
    setsignup,
    setsignin,
    from,
    setfrom,
  } = useAuth();
  
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  let navigate = useNavigate();
  const location = useLocation();
  setfrom(location.state?.from?.pathname || "/");
  
  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "User Name",
      label: "User Name",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
  ];

  const LOGIN_URL = "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      settoken(response?.data?.token);
      const roles = response?.data?.roles;
      const user = response?.data?.userName;
      const pwd = response?.data?.password;
      const id = response?.data?.id;
      sessionStorage.setItem("username", user);
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("token", response?.data?.token);
      sessionStorage.setItem("name", response?.data?.name);
      sessionStorage.setItem("email", response?.data?.email);
      sessionStorage.setItem("phone", response?.data?.phone);
      sessionStorage.setItem("image", response?.data?.userImage);
      sessionStorage.setItem("role", response?.data?.role);
      setAuth({ user, pwd, roles, token, id });
      toast.success("Welcome Back", {
        autoClose: 2000,
      });
      setsignin(!signin);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response", {
          autoClose: 2000,
        });
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password", {
          autoClose: 2000,
        });
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized", {
          autoClose: 2000,
        });
      } else {
        toast.error("Login Failed", {
          autoClose: 2000,
        });
      }
      navigate(from, { replace: true });
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    // <div className="flex justify-center items-center h-screen z-50 relative">
      // <div
      //   className={`fixed overflow-auto top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center ${
      //     signin ? "py-0" : ""
      //   }`}
      // >
        <form
          onSubmit={handleSubmit}
          className={`bg-white pt-8 pr-16 pl-16 pb-10 rounded-lg mt-24 mx-auto relative max-h-[390px] ${signin && "animate-jump-in animate-once animate-duration-700"}`}
        >
          <h1 className="text-black text-center text-2xl font-bold">Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              className="block w-full p-2 border border-gray-300 rounded-md mt-2"
            />
          ))}
          <button
            type="submit"
            className="w-full h-12 py-2 bg-teal-600 text-white rounded-md font-bold text-lg mt-4 mb-5"
          >
            Submit
          </button>
          <p className="text-center">
            First time in Houseek?{" "}
            <span
              className="text-teal-600 cursor-pointer"
              onClick={() => {
                setsignup(!signup);
                setsignin(!signin);
              }}
            >
              Register
            </span>
          </p>
        </form>
      // </div>
    // </div>
  );
};

export default Signin;
