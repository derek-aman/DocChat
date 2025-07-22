import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../components/Hero';
import Header from '../components/Header';
import { useEffect } from 'react';
import Footer from '../components/Footer';

import FileUploadCard from '../components/FileUploadCard';
import About from '../components/About';



const Home = () => {
    useEffect(() => {
      AOS.init({
        duration: 1500,
        once: true,
      });
    })

  return (
    
    <main >
      <img className='absolute top-0 right-0 opacity-60 -z-10' src="/gradient.png" alt="Gradient-img" />
      {/* blur effect */}
      <div className='h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10'></div>

      
      
      <Header />
      <Hero/>
      <FileUploadCard />
      
      <About/>
      <Footer/>
      
    </main>
  )
}

export default Home
