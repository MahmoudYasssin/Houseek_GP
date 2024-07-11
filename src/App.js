// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import { Home } from "./Home/Home"
import { useState, useRef, createContext, Profiler } from "react" // here i will use useContext so i create one
import { Add } from "./Add Property/Add"
import Dash from "./dashboard/Dash"
import Partment from "./partment/Partment"
import Fav from "./Favourite/Fav"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Toaster } from 'react-hot-toast';
import Layout from "./Layout"
import RequireAuth from "./custom-hook/RequireAuth"
import Profile from "./settings/settings.js"
import Sitting from "./Profile/profile.js"
import { Charts } from "./dashboard/Charts/Charts.js"
import Payment from "./Payment/Payment.js"
import Completion from "./Payment/Completion.js"
export const Appcontext = createContext()

function App() {
  const [title, settitle] = useState("")
  const [serachResult, setSearchResult] = useState([])
  const [price, setprice] = useState(0)
  const [description, setdescription] = useState("")
  const [address, setaddress] = useState("")
  const [bathrooms, setbathrooms] = useState(0)
  const [bedrooms, setbedrooms] = useState(0)
  const [size, setsize] = useState(0)

  const [selectedOption, setSelectedOption] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [is_bigside_Open, setIs_bigside_Open] = useState(false)
  const dropdownRef = useRef(null)
  const leftsideRef = useRef(null)
  const [issearch, setissearch] = useState(false)

  const [signup, setsignup] = useState(false)
  const [signin, setsignin] = useState(false)

  const [idforuser, setidforuser] = useState(null)
  const [idforadv, setidforadv] = useState(null)

  const [auth, setAuth] = useState({})

  //TOKEN of user
  const [token, settoken] = useState("")

  //Navigate
  const [from, setfrom] = useState("")

  //  favourite
  const [clcikfav, setclickfav] = useState(true)

  // watching
  const [clickonapart, setclickonapart] = useState(false)
  const [timesonapart, settimesonapart] = useState(0)

  // Data of the artical
  const [data, setdata] = useState([])
  const [tabledata, settabledata] = useState(data)

  // Charts
  const [DonuatOptions, setDonuatOptions] = useState({})
  
  // Payment apartmentId,username
  const [paydetail, setpaydetail] = useState({})

  // const [username, setusername]=useState("Ziad")
  const Role={
    user:"USER",
    admin:"ADMIN",
  }

  return (
    <div className="App">
      <Appcontext.Provider
        value={{
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
          is_bigside_Open,
          setIs_bigside_Open,
          dropdownRef,
          leftsideRef,
          issearch,
          setissearch,
          serachResult,
          setSearchResult,
          signup,
          setsignup,
          signin,
          setsignin,
          auth,
          setAuth,
          token,
          settoken,
          from,
          setfrom,
          idforadv,
          setidforadv,
          clickonapart,
          setclickonapart,
          data, setdata,
          tabledata, settabledata,
          DonuatOptions, setDonuatOptions
          ,paydetail, setpaydetail
        }}
      >
        <ToastContainer theme="colored" position="top-center"></ToastContainer>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>


        <Router>
          {/* <Navbar/>      here navigation be fixed in any page that make me move automatically  */}
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Links */}
              <Route path="/" element={<Home />} />
              <Route path="/part" element={<Partment />} />

              {/* Admin Links  */}
              <Route element={<RequireAuth allowedRoles={[Role.admin]} />}>
                <Route path="/Dash" element={<Dash />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[Role.admin]} />}>
                <Route path="/Charts" element={<Charts />} />
              </Route>

             
              <Route path="/payment" element={<Payment />} />

              {/* User and Admin Links  */}
              <Route element={<RequireAuth allowedRoles={[Role.admin,Role.user]}/>}>

                <Route path="/Fav" element={<Fav />} />
                <Route path="/add" element={<Add />} />
                <Route path="/completion" element={<Completion />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<Sitting />} />

              </Route>

              {/* <Route path="*" element={<h1>Not found</h1>} /> */}
            </Route>
          </Routes>
        </Router>
      </Appcontext.Provider>
    </div>
  )
}

export default App
