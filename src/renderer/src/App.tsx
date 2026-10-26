import { Homepage } from './components/Homepage'
import { TitleBar } from './components/TitleBar'
import { useContentZoom } from './hooks/zoom'

function App(): React.JSX.Element {
  const zoom = useContentZoom()
  return (
    <div className="flex h-screen flex-col">
      <TitleBar />
      <main className="flex-1 overflow-hidden" style={{ zoom }}>
        <Homepage />
      </main>
    </div>
  )
}

export default App
