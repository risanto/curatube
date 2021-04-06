import YouTube from 'react-youtube'
import Sidebar from '../src/components/Sidebar'

function App() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1
    }
  }

  function onReady(event) {
    event.target.pauseVideo()
  }

  return (
    <>
      <main className={"flex"}>
        <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} />
        <Sidebar />
      </main>
    </>
  )
}

export default App;
