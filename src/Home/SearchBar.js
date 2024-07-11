import { IoMdArrowDropdown,IoMdArrowDropup, } from "react-icons/io";

import { Appcontext } from "../App"
import {useRef, useState, useEffect, useContext } from "react";

import { toast } from 'react-hot-toast'; 


function SearchBar() {
  
  const { setissearch, setSearchResult, signin, signup, setsignup, setsignin } = useContext(Appcontext)
  
  
  const [location, setlocation] = useState('');
  const [typesell, settypesell] = useState('For Sell');
  const [pricemin, setpricemin] = useState(0);
  const [pricemax, setpricemax] = useState(0);
  const [areamin, setareamin] = useState(0);
  const [areamax, setareamax] = useState(0);
  const [beds, setbeds] = useState(0);
  const [baths, setbaths] = useState(0);
  // 
  const [areaminvalue, setareaminvalue] = useState('');
  const [areamaxvalue, setareamaxvalue] = useState('');
  const [priceminvalue, setpriceminvalue] = useState('');
  const [pricemaxvalue, setpricemaxvalue] = useState('');
  const [ispriceopen, setispriceopen] = useState(false);
  const [issellopen, setissellopen] = useState(false);
  const [isareaopen, setisareaopen] = useState(false);
  const [isbedopen, setisbedopen] = useState(false);
  const [isbathopen, setisbathopen] = useState(false);
  
  const handleareamin = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setareaminvalue(formattedValue);
   setareamin(parseInt(e.target.value.replace(/,/g, '')));
  };
  const handleareamax = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setareamaxvalue(formattedValue);
    setareamax(parseInt(e.target.value.replace(/,/g, '')));
  };
  const handlepricemin = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setpriceminvalue(formattedValue);
   setpricemin(parseInt(e.target.value.replace(/,/g, '')));
  };
  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  const handlepricemax = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setpricemaxvalue(formattedValue);
    setpricemax(parseInt(e.target.value.replace(/,/g, '')));
  };
  

  const buy = useRef(null);
  const price = useRef(null);
  const bed = useRef(null);
  const bath = useRef(null);
  const area = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buy.current && !buy.current.contains(event.target) && event.target.id !== 'buy') {
        setissellopen(false);
      }
      if (price.current && !price.current.contains(event.target) && event.target.id !== 'price') {
        setispriceopen(false);
      }
      if (bed.current && !bed.current.contains(event.target) && event.target.id !== 'bed') {
        setisbedopen(false);
      }
      if (bath.current && !bath.current.contains(event.target) && event.target.id !== 'bath') {
        setisbathopen(false);
      }
      if (area.current && !area.current.contains(event.target) && event.target.id !== 'area') {
        setisareaopen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault()
    let Url = "http://localhost:8070/apartment/sell/search"
    //location,area,bathrooms,bedrooms,minPrice,maxPrice,propertyType
    const formData = new FormData()
    
    formData.append("minArea", areamin)
    formData.append("maxArea", areamax)
    formData.append("location", location)
    formData.append("bedrooms", beds)
    formData.append("bathrooms", baths)
    formData.append("minPrice", pricemin)
    formData.append("maxPrice", pricemax)
    formData.append("propertyType", typesell)

    // console.log("EVERYTHING",area,typesell,bedroom,bathroom,minPrice,maxPrice,location)

    setissearch(true)

    fetch(Url, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json()
        setSearchResult(data)
        if (data.length === 0){
          toast.error('No Results!')
        }
        else
        {
          toast.success("Done")
        }
      })
      .catch((err) => console.log("Axios Error: ", err))
  }

  return (


    <div className='  z-50'>
     <div className='m-auto w-[658px] bg-black p-5  bg-opacity-70 mt-44 rounded '>

      {/* First Row */}
      <div className='flex  mb-3 space-x-4 animate-fadeIn duration-4000 linear'>
      {/* Sell */}
        <div id="buy" className='bg-white w-[140px] relative p-3 rounded cursor-pointer flex justify-between ' onClick={(e)=>{e.target.id==="no"? setissellopen(issellopen) : setissellopen(!issellopen)}}>
          {typesell==="For Sell" ? "Buy": "Rent" }
         {issellopen ? <IoMdArrowDropup className='relative -right-[5px] top-[2px] text-xl' /> :<IoMdArrowDropdown className='relative -right-[5px] top-[4px] text-xl' /> }
        {issellopen && <div ref={buy} id='no' className='animate-custom duration-4000 linear z-10 cursor-default bg-white p-3 rounded text-black absolute -left-10 top-14'>
          <h5 id='no' className='mb-3 font-medium'>Purpose</h5>
          <div id='no' className='text-black border-solid border-sky-black border-[1px] p-1 rounded bg-white space-x-1 flex justify-between'>
            <button id='no' onClick={()=>{settypesell("For Sell")}} className= { typesell==="For Sell" ? 'text-green-600 bg-zinc-200 px-7 py-1 rounded hover:bg-zinc-200' :"px-7 py-1 rounded hover:bg-zinc-200" }>Buy</button>
            <button id='no' onClick={()=>{settypesell("For Rent")}} className= { typesell==="For Rent" ? 'text-green-600 bg-zinc-200 px-7 py-1 rounded hover:bg-zinc-200':"px-7 py-1 rounded hover:bg-zinc-200" }>Rent</button>
          </div>
        </div>}
        </div>
        {/* Location */}
        <div className='flex justify-center '>
      <input
        className='p-3 outline-none w-[300px]   '
        type="text"
        placeholder="Enter Location"
        onChange={(e)=>{setlocation(e.target.value)}}
        />
        {/* <span className='bg-white relative '>
        <FaLocationDot className="mt-4 mr-2 " />
        </span> */}
        </div>
        {/* Area */}
      <div id="area" className='bg-white max-w-[140px]  relative p-3 max-h-12 rounded cursor-pointer grow flex justify-between ' onClick={(e)=>{e.target.id==="no"? setisareaopen(isareaopen) : setisareaopen(!isareaopen)}}>
          <div  id="area" className='overflow-hidden whitespace-nowrap overflow-ellipsis max-h-5'>
          {  (areamax===0 && areamin===0) && `${"Area(Sq.M.)"}`  }
          {  (areamax===0 && areamin!==0 ) && `${ areaminvalue } - Any`  }
          {  (areamax!==0 && areamin===0 ) && ` 0 - ${ areamaxvalue } `  }
          {  (areamax!==0 && areamin!==0 ) && `${ areaminvalue } - ${areamaxvalue}`  }
          </div>
         <span className='bg-white absolute top-0 h-12 -right-2 rounded-r'>
         {isareaopen ? <IoMdArrowDropup className='relative right-[7px] top-[12px] text-xl' /> :<IoMdArrowDropdown className='relative right-[7px]  top-[14px] text-xl' /> }
        </span>
        {isareaopen && 
        <div ref={area} className='  z-10 grid grid-cols-2 gap-2 w-[340px] rounded-xl bg-white absolute -left-36 top-16'>
        
          <div id='no' className='cursor-default bg-white p-3 rounded text-black '>
            <h5 id='no' className='mb-3 '>Minimum Sq. M.</h5>
              <input
              className='p-2 border-solid w-36 border-sky-black border-[1px] rounded outline-none focus:border-cyan-900'
              type="text"
              value={areaminvalue}
              onChange={handleareamin}
              placeholder="0"
              id='no'
              />
          </div>
          <div id='no' className='cursor-default bg-white p-3 rounded text-black '>
            <h5 id='no' className='mb-3 '>Maximum Sq. M.</h5>
            <input
              className='p-2 border-solid w-36 border-sky-black border-[1px] rounded outline-none focus:border-cyan-900'
              type="text"
              value={areamaxvalue}
              onChange={handleareamax}
              placeholder="Any"
              id='no'
              />
          </div>
        
        </div>
        }
      </div>
    </div>
    {/* Second Row */}
    <div className='flex '>
      {/* Beds */}
      <div id="bed" className='bg-white mr-4 w-[140px]  relative p-3 rounded cursor-pointer flex justify-between ' onClick={(e)=>{e.target.id==="no"? setisbedopen(isbedopen) : setisbedopen(!isbedopen)}}>
      {beds > 0 && beds !== 8 ? `${beds} ${beds === 1 ? 'Bed' : 'Beds'}` : beds === 8 ? "8+ Beds" : "Beds"} 
         {isbedopen ? <IoMdArrowDropup className='relative -right-[5px] top-[2px] text-xl' /> :<IoMdArrowDropdown className='relative -right-[5px] top-[4px] text-xl' /> }
        {isbedopen && <div ref={bed} id='no' className=' z-10 cursor-default bg-white p-3 rounded text-black absolute -left-10 top-16'>
          <h5 id="bed no" className='mb-3 font-medium'>Beds</h5>
          <div id='no' className='text-black  p-1 rounded bg-white flex flex-wrap w-[290px] gap-2'>
            <button id='no' onClick={(e)=>{setbeds(1)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl'>1</button>
            <button id='no' onClick={(e)=>{setbeds(2)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 rounded-2xl'>2</button>
            <button id='no' onClick={(e)=>{setbeds(3)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 rounded-2xl'>3</button>
            <button id='no' onClick={(e)=>{setbeds(4)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 rounded-2xl'>4</button>
            <button id='no' onClick={(e)=>{setbeds(5)}} className=  'border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 rounded-2xl'>5</button>
            <button id='no' onClick={(e)=>{setbeds(6)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 rounded-2xl'>6</button>
            <button id='no' onClick={(e)=>{setbeds(7)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 rounded-2xl'>7</button>
            <button id='no' onClick={(e)=>{setbeds(8)}} className=  ' border-solid border-sky-black border-[2px]  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-4 py-1 rounded-2xl'>8+</button>
          </div>
        </div>}
        </div>
      {/* Baths */}
      <div id="bath" className='bg-white mr-4 w-[140px] relative p-3 rounded cursor-pointer flex justify-between ' onClick={(e)=>{e.target.id==="no"? setisbathopen(isbathopen) : setisbathopen(!isbathopen)}}>
      {baths > 0 && baths !== 6 ? `${baths} ${baths === 1 ? 'Bath' : 'Baths'}` : baths === 6 ? "6+ Baths" : "Baths"} 
         {isbathopen ? <IoMdArrowDropup className='relative -right-[5px] top-[2px] text-xl' /> :<IoMdArrowDropdown className='relative -right-[5px] top-[4px] text-xl' /> }
        {isbathopen && <div ref={bath} id='no' className=' z-10 cursor-default bg-white p-3 rounded text-black absolute -left-10 top-16'>
          <h5 id="bath no "  className='mb-3 font-medium'>Baths</h5>
          <div id='no' className='text-black  p-1 rounded bg-white flex flex-wrap w-[250px] gap-2'>
            <button id='no' onClick={(e)=>{setbaths(1)}} className= { ` border-solid border-sky-black border-[2px] ${baths===1 && "text-green-600 border-green-600"}  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl`}>1</button>
            <button id='no' onClick={(e)=>{setbaths(2)}} className=   { ` border-solid border-sky-black border-[2px] ${baths===2 && "text-green-600 border-green-600"}  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl`}>2</button>
            <button id='no' onClick={(e)=>{setbaths(3)}} className=   { ` border-solid border-sky-black border-[2px] ${baths===3 && "text-green-600 border-green-600"}  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl`}>3</button>
            <button id='no' onClick={(e)=>{setbaths(4)}} className=   { ` border-solid border-sky-black border-[2px] ${baths===4 && "text-green-600 border-green-600"}  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl`}>4</button>
            <button id='no' onClick={(e)=>{setbaths(5)}} className=   { ` border-solid border-sky-black border-[2px] ${baths===5 && "text-green-600 border-green-600"}  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl`}>5</button>
            <button id='no' onClick={(e)=>{setbaths(6)}} className=   { ` border-solid border-sky-black border-[2px] ${baths===6 && "text-green-600 border-green-600"}  focus:text-green-600 focus:border-green-600 focus:bg-zinc-200 hover:bg-zinc-200 px-5 py-1 h-[32px] rounded-2xl`}>6+</button>
          </div>
        </div>}
        </div>
        {/* Price */}
      <div id="price" className='bg-white  max-w-[140px]  relative p-3 max-h-12 rounded cursor-pointer grow flex justify-between ' onClick={(e)=>{e.target.id==="no"? setispriceopen(ispriceopen) : setispriceopen(!ispriceopen)}}>
          <div id="price" className='overflow-hidden whitespace-nowrap overflow-ellipsis max-h-5'>
          {  (pricemax===0 && pricemin===0) && `${"Price"}`  }
          {  (pricemax===0 && pricemin!==0 ) && `${formatNumber(pricemin)} - Any`  }
          {  (pricemax!==0 && pricemin===0 ) && ` 0 - ${formatNumber(pricemax)} `  }
          {  (pricemax!==0 && pricemin!==0 ) && `${formatNumber(pricemin)} - ${formatNumber(pricemax)}`  }
          </div>
         <span className='bg-white absolute top-0 h-12 -right-2 rounded-r'>
         {ispriceopen ? <IoMdArrowDropup className='relative right-[7px] top-[12px] text-xl' /> :<IoMdArrowDropdown className='relative right-[7px]  top-[14px] text-xl' /> }
        </span>
        {ispriceopen && 
        <div ref={price} className=' z-10 grid grid-cols-2 gap-2 w-[340px] rounded-xl bg-white absolute -left-36 top-16'>
        
          <div id='no' className='cursor-default bg-white p-3 rounded text-black '>
            <h5 id='no' className='mb-3 '>Minimum </h5>
              <input
              className='p-2 border-solid w-36 border-sky-black border-[1px] rounded outline-none focus:border-cyan-900'
              type="text"
              value={priceminvalue}
              onChange={handlepricemin}
              placeholder="0"
              id='no'
              />
          </div>
          <div id='no' className='cursor-default bg-white p-3 rounded text-black '>
            <h5 id='no' className='mb-3 '>Maximum </h5>
            <input
              className='p-2 border-solid w-36 border-sky-black border-[1px] rounded outline-none focus:border-cyan-900'
              type="text"
              value={pricemaxvalue}
              onChange={handlepricemax}
              placeholder="Any"
              id='no'
              />
          </div>
        
        </div>
        }
      </div>
        {/* Button */}
      <button onClick={handlesubmit} className='font-bold active:bg-blue-900 bg-blue-600 text-white text-center max-w-[146px] ml-[23px] p-3 max-h-12 rounded cursor-pointer  grow ' >
         Find
      </button>
    </div>
        </div>
        </div>

   
   );
}

export default SearchBar;
