import { Appcontext } from "../App"
import { useContext, useEffect, useState } from "react"
import axios from "../Home/api/axios"
import { toast } from "react-toastify"


export const Form = () => {
  const {
    title,
    settitle,
    price,
    setprice,
    description,
    setdescription,
    address,
    setaddress,
    bathrooms,
    setbathrooms,
    bedrooms,
    setbedrooms,
    size,
    setsize,
    selectedOption,
    setSelectedOption,
    isOpen,
    setIsOpen,
    dropdownRef,
    token,
    settoken,
  } = useContext(Appcontext)

  const options = ["For Sale", "For Rent"]

  const [imageFile, setImageFile] = useState([])
  const [proofImages, setimagesProof] = useState([])

  const handleFileSelect = (event) => {
    const input = event.target
    const files = input.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      //  to read the content of the file
      const reader = new FileReader()

      // Read the content of the file as a dataURL
      reader.readAsDataURL(file)
      setImageFile(files)
      console.log(files)
    }
  }

  const handleFile = (event) => {
    const input = event.target
    const files = input.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      //  to read the content of the file
      const reader = new FileReader()

      // Read the content of the file as a dataURL
      reader.readAsDataURL(file)
      setimagesProof(files)
      console.log(files)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const save = async () => {
    
    const formData = new FormData()
    Array.from(imageFile).forEach((file) => formData.append("images", file))
    Array.from(proofImages).forEach((file) =>
      formData.append("proofImages", file)
    )

    formData.append("title", title)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("location", address)
    formData.append("area", size)
    formData.append("bedrooms", bedrooms)
    formData.append("bathrooms", bathrooms)
    formData.append("propertyType", selectedOption)
    formData.append("user_id", sessionStorage.getItem("id"))

    console.log(formData)
    console.log("TOKEN",sessionStorage.getItem("token"))

    try {
      const response = await axios.post("/apartment/sell/save", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
        toast.success("Success",{autoClose:2000})

      console.log(response.status)
    } 
    catch (error) {
      console.log("ERROR",error)
      // if(response?.status === 401)
      // {
      //   toast.error("Failed",{autoClose:2000})
      // }
      // console.error(error)
    }
  }
  
  return (
    <div className="dashbody">
      <form >
        <div className="row">
          <div className="handle-title">
            <h4>title</h4>
            <input
              id="type"
              required
              onChange={(e) => {
                settitle(e.target.value)
              }}
            />
          </div>
          <div className="handle-price">
            <h4>price</h4>
            <div className="sign">
              <span>$</span>
              <input
                type="number"
                id="price"
                required
                onChange={(e) => {
                  setprice(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="handle-description">
          <h4>description</h4>
          <textarea
            onChange={(e) => {
              setdescription(e.target.value)
            }}
            style={{borderRadius:"10px"}}
            id="description"
            required
          ></textarea>
        </div>
        <div className="handle-loc">
          <h4>address</h4>
          <input
            type="text"
            id="location"
            required
            onChange={(e) => {
              setaddress(e.target.value)
            }}
          />
        </div>
        <div className="row" id="xv">
          <div className="handle-bed" style={{paddingRight:"5px"}}>
            <h4>bedrooms</h4>
            <input
              type="number"
              id="bed"
              required
              onChange={(e) => {
                setbedrooms(e.target.value)
              }}
            />
          </div>
          <div className="handle-bath" style={{paddingRight:"5px"}}>
            <h4>bathrooms</h4>
            <input
              type="number"
              id="bath"
              required
              onChange={(e) => {
                setbathrooms(e.target.value)
              }}
            />
          </div>
          <div className="handle-size" style={{paddingRight:"5px"}}>
            <h4>area</h4>
            <input
              type="number"
              onChange={(e) => {
                setsize(e.target.value)
              }}
              id="size"
              required
            />
          </div>
          <div className="handle-Type">
            <h4>type</h4>
            <div required className="dropdown" ref={dropdownRef}>
              <div className="select-box" onClick={toggleDropdown} style={{borderRadius:"10px"}}>
                {selectedOption || (
                  <span style={{ color: "grey" }}>Sale or Rent</span>
                )}
                <i className="fa-solid fa-angle-down"></i>
              </div>
              {isOpen && (
                <div className="options">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="option"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="last-row ">
          <h4>images</h4>
          <div className="handle-images"style={{borderRadius:"10px"}}>
            <label required for="image-uploader" style={{borderRadius:"10px",width:"50%"}}>
              <i className="fa-solid fa-folder-open"></i>
              <span>browse images</span>
            </label>
            <input
              type="file"
              id="image-uploader"
              required
              accept="image/*"
              multiple
              onChange={handleFileSelect} style={{borderRadius:"10px"}}
            />
          </div>
        </div>
        <div className="last-row ">
          <h4>Apartment Ownership & Personal ID</h4>
          <div className="handle-images"  style={{borderRadius:"10px"}}>
            <label required for="image"style={{borderRadius:"10px",width:"50%"}}>
              <i className="fa-solid fa-folder-open"></i> 
              <span>browse images</span>
            </label>
            <input
              type="file"
              id="image"
              required
              accept="image/*"
              multiple
              onChange={handleFile}
              style={{borderRadius:"10px"}}
            />
          </div>
        </div>

        <div className="btn">
          <button className="add" onClick={save}>
            add property
          </button>
        </div>
        {/* {console.log("proof images", imageFile)} */}
      </form>
    </div>
  )
}
