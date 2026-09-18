import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Detail from './pages/Detail.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  )
}

export default App
