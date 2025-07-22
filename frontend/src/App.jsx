// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ChatPage from './Pages/ChatPage';
import Home from './Pages/Home';
import React, { useEffect } from 'react';



function App() {
   useEffect(() => {
       AOS.init({
         duration: 1500,
         once: true,
       });
     })


  return (
    <main >
      
     
      

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      
    </main>
    

  );
}

export default App;
