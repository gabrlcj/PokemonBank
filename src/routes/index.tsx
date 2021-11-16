import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { PokemonAbout } from '../pages/PokemonAbout'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemon/:name' element={<PokemonAbout />} />
      </Routes>
    </Router>
  )
}
