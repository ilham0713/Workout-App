import { BrowserRouter, Routes, Route} from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className = "pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route 
            path="/login" 
            element={<Login/>} 
            />
            <Route 
            path="/register" 
            element={<Register/>} 
            />
          </Routes>
          
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
