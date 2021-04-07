import React from "react"

export default function VideoThumbnail({ video }) {
    const splittedVideoUrl = video.url.split('/')
    const thumbnail = `https://img.youtube.com/vi/${splittedVideoUrl[splittedVideoUrl.length-1]}/maxresdefault.jpg`

    return (
        <div>
            <img src={thumbnail} width={120} height={90}/>
            <h1>{video.title}</h1>
        </div>
    )
}