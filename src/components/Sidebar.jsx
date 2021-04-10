import React from 'react'
import PlaylistsDropdown from './PlaylistsDropdown'
import VideoList from './VideoList'
import useQuery from '../hooks/useQuery'

export default function Sidebar({ playlists }) {    
    const query = useQuery()
    let activePlaylist = playlists[0]
    
    if (query.playlistId) {
        activePlaylist = playlists.filter(playlist => playlist.id === +query.playlistId)[0]
    }

    return (
        <section className={"flex flex-col"}>
            <PlaylistsDropdown
                playlists={playlists}
                activePlaylist={activePlaylist}
            />
            <VideoList videos={activePlaylist.videos} playlist={activePlaylist} />
        </section>
    )
}
