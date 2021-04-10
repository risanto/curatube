import React from 'react'
import { Link } from 'react-router-dom'
import getVideoId from '../helpers/getVideoId'

export default function VideoThumbnail({ video, playlist }) {
    const videoId = getVideoId(video.url)
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    return (
        <Link to={`/?videoId=${videoId}&playlistId=${playlist.id}`}>
            <img src={thumbnail} width={120} height={90} />
            <h1>{video.title}</h1>
        </Link>
    )
}