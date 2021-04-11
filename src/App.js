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

  let { width } = useWindowDimensions()

  const [opts, setOpts] = useState({})

  const [videoWidth, setVideoWidth] = useState(null)
  const [videoHeight, setVideoHeight] = useState(null)

  // video ratio => height = 0.6 * width

  useEffect(() => {
    setVideoWidth(width < 1024 ? width - 40 : 1 / 2 * width)
  }, [width])

  useEffect(() => {
    setVideoHeight(0.6 * videoWidth)
  }, [videoWidth])

  useEffect(() => {
    setOpts({
      width: videoWidth,
      height: videoHeight,
      playerVars: {
        autoplay: 1
      }
    })
  }, [videoWidth, videoHeight])

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
    <div className={"h-screen overflow-hidden"}>
      <header>
        <Navbar />
      </header>
      <main className={"h-full flex flex-col lg:flex-row mt-12 px-4 justify-center"}>
        <section className={"mt-2 flex flex-col justify-center align-center lg:justify-start sticky top-0 bg-white z-10"}>
            <h1 className={"text-lg mt-10 lg:mt-4"}>{
              activeVideo
                ? activeVideo.title : defaultVideo.title
            }</h1>
            {activeVideo && (
              <YouTube videoId={getYouTubeVideoId(activeVideo.url)} opts={opts} />
            )}

            {!activeVideo && (
              <YouTube videoId={getYouTubeVideoId(defaultVideo.url)} opts={opts} />
            )}
        </section>
        
        {/* Mobile version*/}
        <section
          className={"block lg:hidden h-full pb-6"}
          style={{ marginTop: videoHeight + 30 }}
        >
          <Sidebar playlists={playlists} fixedSectionHeight={100 + videoHeight}/>
        </section>
        
        {/* Laptop version */}
        <section
          className={"hidden lg:block h-full pb-6 lg:ml-2"}
        >
          <Sidebar playlists={playlists} fixedSectionHeight={50}/>
        </section>
      </main>
    </div>
  )
}

export default App;
