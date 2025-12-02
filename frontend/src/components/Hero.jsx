import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero = () => {
  return (
    <main className='flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]'>
        <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className='max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0'>
           
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white font-[Poppins, "Inter", sans-serif]'>
          Have a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1ac7b] to-[#e99b63]">Conversation</span><br />
          with Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1ac7b] to-[#e99b63]">Documents</span>
        </h1>
            <p className='text-base sm:text-lg tracking-wider text-grey-400 max-w[25rem] lg:max-w-[30rem]'>
                Upload any document and get
                instant,accurate answers 
                — grounded in your own content.
            </p>
            <div className='flex gap-4 mt-12'>
               <div className='relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#f1ac7b] t0-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
                <div className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1 cursor-pointer'>
                    Get Started
                </div>
            </div>
            <div className='relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#f1ac7b] t0-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
                <div  className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1 cursor-pointer'>
                    Chat
                </div>
            </div>
            </div>
        </div>
         <Spline data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0" data-aos-duration="2500" className='absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full' scene="https://prod.spline.design/oc81ayKMVYXJo4q7/scene.splinecode" />


    </main>
  )
}

export default Hero
