import React from 'react'
import VideoThumbnail from './VideoThumbnail'

export default function VideoList({ videos, playlist }) {
    return (
        <ul>
            {videos.map(video => {
                return <li key={video.id}><VideoThumbnail video={video} playlist={playlist}/></li>
            })}
        </ul>
    )
}