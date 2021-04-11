import React, { useEffect, useRef } from 'react'
import { createPopper } from '@popperjs/core'
import { Link } from 'react-router-dom'
import useComponentVisible from '../hooks/useComponentVisible'

export default function PlaylistsDropdown({ playlists, activePlaylist }) {
    const { ref, isComponentVisible, btnRef } = useComponentVisible(false) // starts invisible

    const btnDropdownRef = btnRef // the component that influences popover dropdown's appearance
    const popoverDropdownRef = ref // the component that'll appear/disappear

    useEffect(() => {
        // place the popover dropdown belows the button whenever it's visible
        if (isComponentVisible) {
            createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "bottom-start"
            })
        }

    }, [isComponentVisible])

    return (
        <div className="flex mt-2">
            <div className="relative inline-flex align-middle">
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
            </div>
        </div>
    )
}