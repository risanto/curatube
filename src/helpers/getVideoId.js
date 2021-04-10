export default function getVideoId(url) {
    const splittedUrl = url.split('/')
    return splittedUrl[splittedUrl.length-1]
}