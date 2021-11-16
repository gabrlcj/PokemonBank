import { AppRoutes } from './routes'
import { PokemonProvider } from './context/pokemon'

export function App() {
  return (
    <PokemonProvider>
      <AppRoutes />
    </PokemonProvider>
  )
}
