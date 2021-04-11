import React from 'react'
import PlaylistsDropdown from './PlaylistsDropdown'
import VideoList from './VideoList'
import useQuery from '../hooks/useQuery'

export default function Sidebar({ playlists, fixedSectionHeight }) {
    const query = useQuery()
    let activePlaylist = playlists[0]

    if (query.playlistId) {
        activePlaylist = playlists.filter(playlist => playlist.id === +query.playlistId)[0]
    }

    return (
        <>
            <div className={"py-2 sticky top-2 bg-white"}>
                <PlaylistsDropdown
                    playlists={playlists}
                    activePlaylist={activePlaylist}
                />
            </div>
            <div
                style={{ height: `calc(100% - ${fixedSectionHeight}px)` }}
                className={`overflow-scroll`}
            >
                <VideoList videos={activePlaylist.videos} playlist={activePlaylist} />
            </div>
        </>
    )
}
