import { useState, useEffect } from "react"
import "./Appss.css"
import FormInput from "./FormInput"
import axios from "./api/axios"
import { toast } from 'react-hot-toast'; 
import { useNavigate } from "react-router-dom"
import useAuth from "../custom-hook/useAuth"

const Signup = () => {
  const {
    setAuth,
    token,
    settoken,
    signup,
    signin,
    setsignup,
    setsignin,
    from,
  } = useAuth()
  const [values, setValues] = useState({
    userName: "",
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9 ]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Full Name",
      pattern: "^[A-Za-z0-9 ]{3,20}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Invalid Email Address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      label: "Phone",
        pattern:`^01[0-2]{1}[0-9]{8}$`,
      errorMessage: "Phone number is invalid",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ]
  let navigate = useNavigate()
  console.log(from)
  const REGISTER_URL = "/register"
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(values)
    sessionStorage.setItem("email", values.email)
    sessionStorage.setItem("phone", values.phone)
    sessionStorage.setItem("name", values.name)
    try {
      const response = await axios.post(REGISTER_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      console.log(response?.data)
      console.log(JSON.stringify(response))
      // settoken(response?.data?.token);
      // setToken(response?.data?.token)  ;
      console.log("second time response ", response?.data?.token)

      settoken(response?.data?.token)

      const user = response?.data?.userName
      const pwd = response?.data?.password
      const id = response?.data?.id

      setAuth({ user, pwd, token, id })
      setsignup(!signin)

      sessionStorage.setItem("username", user);
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("token", response?.data?.token);
      sessionStorage.setItem("name", response?.data?.name);
      sessionStorage.setItem("email", response?.data?.email);
      sessionStorage.setItem("phone", response?.data?.phone);
      sessionStorage.setItem("image", response?.data?.userImage);
      sessionStorage.setItem("role", response?.data?.role);

      toast.success("Registered Successfully", { autoClose: 2000 })
      // Clear state and controlled inputs
      // Need 'value' attribute on inputs for this
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response", {
          autoClose: 2000,
        })
      } else if (err.response?.status === 409) {
        toast.error("Username Taken", {
          autoClose: 2000,
        })
      } else {
        toast.error("Registration Failed", {
          autoClose: 2000,
        })
      }
    }
  }
  useEffect(() => {
    // This effect will run after the component renders and whenever TOKEN changes
    console.log("Updated TOKEN:", token)
  }, [token])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className={` appss ${signin && "animate-jump-in animate-once animate-duration-700"} `}>
      <form onSubmit={handleSubmit} className={`pt-10 pb-10 ${signin && "animate-jump-in animate-once animate-duration-700"} `}>
        <h1 className="text-2xl font-bold">Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        <p>
          Already have an account?{" "}
          <code
            onClick={() => {
              setsignup(!signup)
              setsignin(!signin)
            }}
          >
            {" "}
            Login
          </code>
        </p>
      </form>
    </div>
  )
}

export default Signup
