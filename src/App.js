import { data as playlists } from './data.json'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import YouTube from 'react-youtube'
import getYouTubeVideoId from './helpers/getYouTubeVideoId'
import useWindowDimensions from './hooks/useWindowDimensions'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import useQuery from './hooks/useQuery'

function App() {
  const query = useQuery()
  let history = useHistory()

  const defaultVideo = playlists[0].videos[0]

  const [activePlaylist, setActivePlaylist] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  const { width, height } = useWindowDimensions()

  // video ratio => height = 0.6 * width

  const opts = {
    height: 0.6 * (width - 30),
    width: width - 30,
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
      <main className={"flex flex-col mt-12 px-4"}>
        <div className={"mt-2 flex justify-center align-center"}>
          <div>
            <h1 className={"text-lg"}>{
              activeVideo
                ? activeVideo.title : defaultVideo.title
            }</h1>
            {activeVideo && (
              <YouTube videoId={getYouTubeVideoId(activeVideo.url)} opts={opts} />
            )}

            {!activeVideo && (
              <YouTube videoId={getYouTubeVideoId(defaultVideo.url)} opts={opts} />
            )}
          </div>
        </div>

        <Sidebar playlists={playlists} />
      </main>
    </>
  )
}

export default App;
