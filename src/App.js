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
    if (!query.playlistId) {
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
      <main className={"h-full flex flex-col laptop:flex-row mt-12 laptop:mt-0 px-4 justify-center laptop:items-center"}>
        <section className={"flex flex-col justify-center laptop:justify-start sticky top-2 bg-white z-10"}>
          <h1 className={"text-lg mt-10 laptop:mt-4"}>{
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

        {videoHeight && (
          <>
            {/* Mobile version*/}
            <section
              className={"laptop:hidden h-full pb-6"}
              style={{ marginTop: videoHeight }}
            >
              <Sidebar playlists={playlists} fixedSectionHeight={100 + videoHeight} screenWidth={width} videoHeight={videoHeight} />
            </section>

            {/* Laptop version */}
            <section
              className={"hidden laptop:block h-full pb-6 laptop:mt-4 laptop:ml-2 laptop:flex laptop:flex-col laptop:justify-center laptop:w-96"}
            >
              <Sidebar playlists={playlists} fixedSectionHeight={50} screenWidth={width} videoHeight={videoHeight} />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App;
