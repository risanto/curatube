import React from "react"
import { createPopper } from "@popperjs/core"

export default function PlaylistsDropdown({ playlists }) {

    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
    const btnDropdownRef = React.createRef()
    const popoverDropdownRef = React.createRef()
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start"
        })
        setDropdownPopoverShow(true)
    }
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false)
    }

    return (
        <>
            <div className="flex mr-6 sm:mr-1">
                <div className="relative inline-flex align-middle">
                    <button
                        className={"flex"}
                        type="button"
                        ref={btnDropdownRef}
                        onClick={() => {
                            dropdownPopoverShow
                                ? closeDropdownPopover()
                                : openDropdownPopover()
                        }}
                    >
                        <p className={"place-self-center mx-1 px-1 hover:underline"}>
                            {playlists[0].name}▼
                        </p>
                    </button>
                    <div
                        ref={popoverDropdownRef}
                        className={
                            (dropdownPopoverShow ? "block " : "hidden ") +
                            "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                        }
                        style={{ minWidth: "12rem" }}
                    >
                        <ul>
                        {playlists.map((playlist, idx) => {
                            if (idx !== 0) {
                                return <li key={idx}><a
                                    href="#pablo"
                                    className={
                                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
                                    }
                                    onClick={e => e.preventDefault()}
                                >
                                    {playlist.name}
                                </a></li>
                            }
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}