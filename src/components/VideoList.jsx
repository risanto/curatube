import React from 'react'
import VideoThumbnail from './VideoThumbnail'

export default function VideoList({ videos }) {
    return (
        <>
            {videos.map(video => {
                return <VideoThumbnail video={video} />
            })}
        </>
    )
}