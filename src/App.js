import { data as playlists } from './data.json'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import YouTube from 'react-youtube'
import getVideoId from './helpers/getVideoId'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import useQuery from './hooks/useQuery'

function App() {
  const query = useQuery()
  let history = useHistory()
  let videoId = query.videoId

  const opts = {
    height: '780',
    width: '1280',
    playerVars: {
      autoplay: 1
    }
  }

  useEffect(() => {
    if (!videoId) {
      history.push(`/videoId=${getVideoId(playlists[0].videos[0].url)}&playlistId=${playlists[0].id}`)
    }
  }, [])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={"flex"}>
        <YouTube videoId={videoId} opts={opts} />
        <Sidebar playlists={playlists} />
      </main>
    </>
  )
}

export default App;
