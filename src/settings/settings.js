import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Add Property/Header";
import { Leftside } from "../Add Property/Leftside";
import axios from "../Home/api/axios";
import { toast } from "react-toastify";
import "./style.css";

function Profile() {

  const [name, setName] = useState(sessionStorage.getItem("name") );
  const [username, setUsername] = useState(sessionStorage.getItem("username") );
  const [email, setEmail] = useState(sessionStorage.getItem("email") );
  const [phone, setPhone] = useState(sessionStorage.getItem("phone") );
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);

  const [imageFile, setImageFile] = useState([]);

  const handleFileSelect = (event) => {
    const input = event.target;
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // to read the content of the file
      const reader = new FileReader();

      // Read the content of the file as a dataURL
      reader.readAsDataURL(file);
      setImageFile(files);  
      console.log(files);
    }
  };

  const [data, setdata] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(imageFile).forEach((file) => formData.append("image", file ));
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", newPassword);
    formData.append("email", email);
    formData.append("id", sessionStorage.getItem("id"));
    try {
      const response = await axios.post(
        "/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setdata(response.data);
      toast.success("Edit Successfully", { autoClose: 2000 });
       sessionStorage.setItem("name",response.data.name) ;
       sessionStorage.setItem("email",response.data.email) ;
       sessionStorage.setItem("phone",response.data.phone);
       sessionStorage.setItem("image",response.data.userImage);
    } catch (error) {
      toast.error("Edit Failed", { autoClose: 2000 });
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <div>
      <div style={{ paddingTop: "6px" }}></div>
      <br />
      <Header />
      <Leftside />
      <div className="dashboardTitle" style={{ maxWidth: "100%" }}>
        <h1>Your details</h1>
        <h4>
          We'd love to find out more about you. It'll help us make sure our
          website and apps tick the right boxes.
        </h4>
      </div>
      <div className="dashbody">
        <form style={{ marginTop: "-200px" }}>
          <div className="row">
            <img
              className="avatar headerAvatar pull-left"
              //// src={sessionStorage.getItem("image")}
              src={sessionStorage.getItem("image")}
              alt=""
              style={{
                Width: "250px",
                maxWidth: "250px",
                height: "250px",
                maxHeight: "250px",
                borderRadius: "50%",
              }}
            />
            <label
            id="img"
              style={{
                justifyContent: "center",
                paddingTop: "1.9%",
                marginRight: "400px",
              }}
              htmlFor="image-uploader"
              className="max-w-56  bn632-hover bn18"
            >
              Upload new image
              <input
                type="file"
                id="image-uploader"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </label>
          </div>
          <div className="handle-loc">
            <h4>Full Name</h4>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="handle-loc">
            <h4>Phone Number</h4>
            <input
              type="text"
              id="location"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="handle-loc">
            <h4>User Name</h4>
            <input
              className={`${true && "bg-gray-400"}`}
              type="text"
              id="username"
              value={username}
              disabled={true}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="handle-loc">
            <h4>E-mail</h4>
            <input
            className={`${true && "bg-gray-400"}`}
              type="text"
              id="email"
              disabled={true}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
         

          <div className="handle-loc">
            <h4>New Password</h4>
            <input
              type="text"
              id="newPassword"
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="handle-loc">
            <h4>Confirm New Password</h4>
            <input
              type="text"
              id="confirmNewPassword"
              value={confirmNewPassword}
              required
              pattern={newPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="btn mb-28">
            <button className="add" onClick={handlesubmit} style={{ width: "150px",marginBottom:"100px" }}>
              Edit{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
