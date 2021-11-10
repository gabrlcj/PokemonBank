import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { PokemonProvider } from './context/pokemon'

export function App() {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </PokemonProvider>
  )
}
