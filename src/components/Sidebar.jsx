import React from 'react'
// import useFetch from 'use-http'
import { data as playlists } from '../data.json'
import PlaylistsDropdown from './PlaylistsDropdown'
import VideoList from './VideoList'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

export default function Sidebar(props) {
    // When using fetch
    // const { loading, error, data = [] } = useFetch('https://s3-ap-southeast-1.amazonaws.com/pacmannai.com/static/json/playlist.json', {}, [])

    const history = useHistory()
    const location = useLocation()
    const query = new URLSearchParams(location.search)

    // history.push(`/?playlist=${playlists[0].name}`)

    console.log(queryString.parse(location.search))

    return (
        <section className={"flex flex-col"}>
            {/* When using fetch */}
            {/* {error && 'Error!'}
            {loading && 'Loading...'} */}

            <PlaylistsDropdown playlists = {playlists}/>
            {/* <VideoList  */}
        </section>
    )
}
