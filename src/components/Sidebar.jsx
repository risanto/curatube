import React, { useState, useEffect } from 'react'
import PlaylistsDropdown from './PlaylistsDropdown'
import VideoList from './VideoList'
import useQuery from '../hooks/useQuery'

export default function Sidebar({ playlists, fixedSectionHeight, screenWidth, videoHeight }) {
    const query = useQuery()
    const [activePlaylist, setActivePlaylist] = useState(playlists[0])

    useEffect(() => {
        if (query.playlistId) {
            setActivePlaylist(playlists.filter(playlist => playlist.id === +query.playlistId)[0])
        }
        // eslint-disable-next-line
    }, [query.playlistId])

    const [height, setHeight] = useState(`calc(100% - ${fixedSectionHeight}px)`)

    useEffect(() => {
        if (screenWidth >= 1024) return setHeight(videoHeight)

        if (activePlaylist.videos.length < 1) setHeight('1000px')
        else setHeight(`calc(100% - ${fixedSectionHeight}px)`)

        // eslint-disable-next-line
    }, [activePlaylist, screenWidth])

    return (
        <div className={"h-full laptop:mt-4 laptop:w-96"}>
            <div className={"py-2 sticky top-2 laptop:top-12 bg-white"}>
                <PlaylistsDropdown
                    playlists={playlists}
                    activePlaylist={activePlaylist}
                />
            </div>

            {height && videoHeight && (
                <div
                    style={{ height }}
                    className={`overflow-auto`}
                >
                    <VideoList videos={activePlaylist.videos} playlist={activePlaylist} />
                </div>
            )}
        </div>
    )
}
