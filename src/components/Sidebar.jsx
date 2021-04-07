import React from 'react'
// import useFetch from 'use-http'
import { data as playlists } from '../data.json'
import PlaylistsDropdown from './PlaylistsDropdown'
import VideoList from './VideoList'
import { useHistory, useLocation } from 'react-router-dom'
import useQuery from '../hooks/useQuery'

export default function Sidebar(props) {
    // When using fetch
    // const { loading, error, data = [] } = useFetch('https://s3-ap-southeast-1.amazonaws.com/pacmannai.com/static/json/playlist.json', {}, [])

    const history = useHistory()
    const query = useQuery()
    let activePlaylist = playlists[0]

    if (query.playlistId) {
        activePlaylist = playlists.filter(playlist => playlist.id === +query.playlistId)[0]
    }
    
    return (
        <section className={"flex flex-col"}>
            {/* When using fetch */}
            {/* {error && 'Error!'}
            {loading && 'Loading...'} */}

            <PlaylistsDropdown
                playlists={playlists}
                activePlaylist={activePlaylist}
            />
            {/* <VideoList  */}
        </section>
    )
}
