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
        <section>
            <div className={"mt-3 sticky top-2 bg-white"}>
                <PlaylistsDropdown
                    playlists={playlists}
                    activePlaylist={activePlaylist}
                />
            </div>
            <VideoList videos={activePlaylist.videos} playlist={activePlaylist} />
        </section>
    )
}
