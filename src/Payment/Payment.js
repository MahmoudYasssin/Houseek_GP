import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import "./payment.css";
import { Leftside } from "../Add Property/Leftside";
import { Header } from "../Add Property/Header";
import useAuth from "../custom-hook/useAuth";

const stripePromise = loadStripe("pk_test_51PVCcSCMzl8Rx0lB3WTFGqnmZOq9YNjDkRH8UaymBHycHsvw1fbQyq0Oqj5RAp2lTfYrHHjKbxrgys4684HNO7rB00WNOlkgOn");

function Payment() {
  const {paydetail}=useAuth()
  const [clientSecret, setClientSecret] = useState("");
  const [id,setid]=useState(paydetail.apartmentId)
  const [username,setusername]=useState(sessionStorage.getItem("username"))
  
  useEffect(()=>{
    setid(paydetail.apartmentId)
  },[paydetail.apartmentId])
  
  console.log("paaaaaay",id,username)

  useEffect(() => {
    fetch(`http://localhost:8070/api/payment/create-payment-intent?apartmentId=${id}&userName=${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({}) // Pass any necessary data for creating a payment intent
    })
    .then((response) => response.json())
    .then((data) => {
      setClientSecret(data.clientSecret);
    })
    .catch((error) => {
      console.error("Error creating payment intent:", error);
    });
  }, []);
  

  return (
    <>
    <div style={{ paddingTop: "6px" }}></div>
      <br></br>
      <Header />
      <Leftside />
      <br></br>
      <br></br>
    <div className="body">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
      </>
  );
}

export default Payment;
