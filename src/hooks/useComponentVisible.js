import { useState, useEffect, useRef } from 'react'

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref = useRef(null)

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    })

    return { ref, isComponentVisible, setIsComponentVisible }
}