import { Articels } from "./Articals"
import { Footer } from "./Footer"
import { Landing } from "./Landing"
import { Underland } from "./underland"
import { useEffect, useContext, useRef } from "react"
import "./home.css"
import { Appcontext } from "../App"
import Signup from "./Signup"
import Signin from "./Signin"
export const Home = () => {
  const signupRef = useRef(null)
  const signinRef = useRef(null)
  const { signup, signin, setsignup, setsignin } = useContext(Appcontext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        signupRef.current &&
        !signupRef.current.contains(event.target) &&
        event.target.id !== "Sign-up"
      ) {
        setsignup(false)
      }
      if (
        signinRef.current &&
        !signinRef.current.contains(event.target) &&
        event.target.id !== "Sign-in"
      ) {
        setsignin(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div>
      <Landing />
      {signup && (
        <div className="position-fixed">
          <div className=" " ref={signupRef}>
            <Signup />
          </div>
        </div>
      )}
      {signin && (
        <div className={`position-fixed `}>
          <div className=" " ref={signinRef}>
            <Signin />
          </div>
        </div>
      )}
      <Underland />
      <Articels />
      <Footer />
    </div>
  )
}
