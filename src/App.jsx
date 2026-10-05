import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Sponsor from './pages/Sponsor'
import Footer from './components/Footer'
import RegistrationModal from './components/RegistrationModal'

function App() {
  const [showNotice, setShowNotice] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotice(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
   <>
   <Router>
    <Navbar openRegistration={() => setIsRegOpen(true)} />
    <Routes>
      <Route path="/" exact element={<Home openRegistration={() => setIsRegOpen(true)} />} />
      <Route path="/sponsorship-opportunities" element={<Sponsor />} />
    </Routes>
    <Footer/>
   </Router>

   <RegistrationModal isOpen={isRegOpen} onClose={() => setIsRegOpen(false)} />

   {showNotice && (
       <div style={{
           position: 'fixed',
           top: 0, left: 0, right: 0, bottom: 0,
           background: 'rgba(0,0,0,0.6)',
           zIndex: 3000,
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           padding: '20px',
           backdropFilter: 'blur(5px)'
       }} onClick={() => setShowNotice(false)}>
           <div style={{
               background: 'rgba(20, 20, 20, 0.95)',
               borderRadius: '12px',
               padding: '35px 30px',
               maxWidth: '650px',
               width: '100%',
               color: 'white',
               position: 'relative',
               border: '1px solid rgba(255, 255, 255, 0.15)',
               boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
               fontFamily: '"Oxanium", sans-serif',
               lineHeight: '1.6',
               fontSize: '18px',
               textAlign: 'center'
           }} onClick={e => e.stopPropagation()}>
               <button style={{
                   position: 'absolute',
                   top: '15px', right: '15px',
                   background: 'none', border: 'none',
                   color: 'rgba(255, 255, 255, 0.6)',
                   fontSize: '22px', cursor: 'pointer'
               }} onClick={() => setShowNotice(false)}>
                   <i className="fa-solid fa-xmark"></i>
               </button>
               <p style={{ margin: 0, marginTop: '10px' }}>
                   Register in advance for a smoother arrival at the Florida Horse Park. Every guest and participant (parent and child) must be listed on the registration. Registration and ticket may not be transferred to another person.
               </p>
           </div>
       </div>
   )}
   </>
  )
}

export default App
