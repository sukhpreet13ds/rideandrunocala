import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
function App() {

  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
    <Footer/>
   </Router>
   </>
  )
}

export default App
