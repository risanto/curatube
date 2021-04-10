import { data as playlists } from './data.json'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import YouTube from 'react-youtube'
import getYouTubeVideoId from './helpers/getYouTubeVideoId'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import useQuery from './hooks/useQuery'

function App() {
  const query = useQuery()
  let history = useHistory()

  const defaultVideo = playlists[0].videos[0]

  const [activePlaylist, setActivePlaylist] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  const opts = {
    height: '780',
    width: '1280',
    playerVars: {
      autoplay: 1
    }
  }

  useEffect(() => {
    if (!query.videoId) {
      history.push(`/?playlistId=${playlists[0].id}&videoId=${playlists[0].videos[0].id}`)
      window.location.reload()
    }

    setActivePlaylist(playlists.filter(playlist => playlist.id === +query.playlistId)[0])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activePlaylist) {
      setActiveVideo(activePlaylist.videos.filter(video => video.id === +query.videoId)[0])
    }

  }, [activePlaylist, query.videoId])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={"flex"}>
        {activeVideo && (
          <>
            <h1>{activeVideo.title}</h1>
            <YouTube videoId={getYouTubeVideoId(activeVideo.url)} opts={opts} />
          </>
        )}

        {!activeVideo && (
          <>
            <h1>{defaultVideo.title}</h1>
            <YouTube videoId={getYouTubeVideoId(defaultVideo.url)} opts={opts} />
          </>
        )}

        <Sidebar playlists={playlists} />
      </main>
    </>
  )
}

export default App;
