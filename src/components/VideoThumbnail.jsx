import React from 'react'
import { Link } from 'react-router-dom'
import getYouTubeVideoId from '../helpers/getYouTubeVideoId'

export default function VideoThumbnail({ video, playlist }) {
    const youTubeVideoId = getYouTubeVideoId(video.url)
    const thumbnail = `https://img.youtube.com/vi/${youTubeVideoId}/maxresdefault.jpg`

    return (
        <Link to={`/?playlistId=${playlist.id}&videoId=${video.id}`}>
            <div className={"flex py-2"}>
                <img src={thumbnail} alt={video.title} width={120} height={90} />
                <h1 className={"ml-2"}>{video.title}</h1>
            </div>
        </Link>
    )
}