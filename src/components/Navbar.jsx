import React from 'react'

export default function Navbar() {
    return <nav className={"flex justify-between shadow fixed top-0 z-50 w-full p-2 bg-white laptop:px-8"}>
        <div>
            <button className={"flex"}>
                <img src={"/play.svg"} alt={"MyTube logo."} height={25} width={25} />
                <h1 className={"place-self-center"}>MyPlaylists</h1>
            </button>
        </div>
        <div className={"border-l pl-2"}>
            <img src={"/user.svg"} alt={"User icon."} height={30} width={30} />
        </div>
    </nav>
}