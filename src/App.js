import YouTube from 'react-youtube'
import Sidebar from '../src/components/Sidebar'
import Navbar from '../src/components/Navbar'

function App() {
  const opts = {
    height: '780',
    width: '1280',
    playerVars: {
      autoplay: 1
    }
  }

  function onReady(event) {
    event.target.pauseVideo()
  }

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className={"flex"}>
        <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} />
        <Sidebar />
      </main>
    </>
  )
}

export default App;
