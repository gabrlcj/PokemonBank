import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PokemonProvider } from './context/pokemon'
import { Home } from './pages/Home'

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
