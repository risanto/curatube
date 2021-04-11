import React, { useEffect } from 'react'
import { createPopper } from '@popperjs/core'
import { Link } from 'react-router-dom'

import useComponentVisible from '../hooks/useComponentVisible'
import useQuery from '../hooks/useQuery'

export default function PlaylistsDropdown({ playlists, activePlaylist }) {
    const query = useQuery()
    const { ref, btnRef, isComponentVisible, setIsComponentVisible} = useComponentVisible(false) // starts invisible

    const btnDropdownRef = btnRef // the component that influences popover dropdown's appearance
    const popoverDropdownRef = ref // the component that'll appear/disappear

    // close popover whenever playlist is changed
    useEffect(() => {
        setIsComponentVisible(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.playlistId])

    useEffect(() => {
        // place the popover dropdown belows the button whenever it's visible
        if (isComponentVisible) {
            createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "bottom-start"
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComponentVisible])

    return (
        <>
            <button
                className={"flex"}
                type="button"
                ref={btnDropdownRef}
            >
                <p className={"place-self-center hover:underline border px-2"}>
                    {activePlaylist.name}▼
                        </p>
            </button>

            <div ref={popoverDropdownRef}>
                {isComponentVisible && (
                    <div
                        className={
                            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                        }
                        style={{ minWidth: "12rem" }}
                    >
                        <ul>
                            {playlists.length && playlists.map((playlist) => {
                                if (playlist.id !== activePlaylist.id) {
                                    return <li key={playlist.id}>
                                        <Link
                                            to={`/?playlistId=${playlist.id}`}
                                            className={
                                                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap"
                                            }
                                        >
                                            {playlist.name}
                                        </Link>
                                    </li>
                                }

                                return <li key={playlist.id}></li>
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}