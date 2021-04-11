import React from 'react'
import VideoThumbnail from './VideoThumbnail'

export default function VideoList({ videos, playlist }) {
    return (
        <ul>
            {!videos.length && (
                <h1 className={"text-center mt-8"}>There are no videos in this playlist.</h1>
            )}
            {videos.map(video => {
                return (
                    <li key={video.id}>
                        <VideoThumbnail video={video} playlist={playlist} />
                        <hr/>
                    </li>
                )
            })}
        </ul>
    )
}