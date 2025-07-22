import React from 'react'
import { MdOutlineMenu } from 'react-icons/md';

const Header = () => {
     const toggleMobileMenu = () =>{
    const mobileMenu = document.getElementById("mobileMenu")

    if(mobileMenu.classList.contains("hidden")){
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  }
  return (
     <header className='flex justify-between items-center py-4 px-4 lg:px-20'>
        <h1 data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className='text-3xl md:text-4xl lg:text-5xl font-light m-0'>DocChat</h1>
        
      <nav className='hidden md:flex items-center gap-12'>
           <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000" className="text-base tracking-wider transition-colors hover:text-grey-300 z-50" href="/">HOME</a>
           <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="text-base tracking-wider transition-colors hover:text-grey-300 z-50" href="/chat">CHAT</a>
           <a data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="2000" className="text-base tracking-wider transition-colors hover:text-grey-300 z-50" href="#">ABOUT</a>
           
         </nav>
         {/* <button className='hidden md:block bg-[#a7a7a7] text-black py-2 px-5 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50'>
           Signup
         </button> */}
         <button onClick={toggleMobileMenu} className="md:hidden text-3xl p-2 z-50"><MdOutlineMenu size="30px" color="white" />
     </button>
         <div id="mobileMenu" className=" hidden fixed top-16 bottom-0 right-0 left-0 md:hidden z-40 bg-opacity-70 backdrop-blur-md">
           <nav className="flex flex-col gap-6 items-center">
              <a className="text-base tracking-wider transition-colors hover:text-grey-300 z-50" href="#">HOME</a>
           <a className="text-base tracking-wider transition-colors hover:text-grey-300 z-50" href="#">CHAT</a>
           <a className="text-base tracking-wider transition-colors hover:text-grey-300 z-50" href="#">ABOUT</a>
           
           </nav>
         </div>
        
       

     </header>
  )
}

export default Header
