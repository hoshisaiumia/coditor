import { Homepage } from './components/Homepage'
import { TitleBar } from './components/TitleBar'

function App(): React.JSX.Element {
  return (
    <div className="flex h-screen flex-col">
      <TitleBar />
      <main className="flex-1 overflow-hidden">
        <Homepage />
      </main>
    </div>
  )
}

export default App
