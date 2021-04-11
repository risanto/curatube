import { useState, useEffect, useRef } from 'react'

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)

    const ref = useRef(null) // component that will appear/disappear
    const btnRef = useRef(null) // if there's a button that also influences ref's visibility

    const handleClick = (event) => {
        // toggle ref's visibility when a button is clicked
        if (btnRef.current.contains(event.target) && btnRef.current !== event.target) {
            return isComponentVisible 
                ? setIsComponentVisible(false)
                : setIsComponentVisible(true)
        }

        // whenever it's clicked outside of ref component will be invisible
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
        }
    }

    // Add/remove click event to the whole document
    useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    })

    return { ref, btnRef, isComponentVisible, setIsComponentVisible}
}