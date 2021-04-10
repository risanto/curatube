import React from 'react'

export default function Navbar() {
    return <nav className={"flex justify-between shadow fixed top-0 z-10 w-full p-2 bg-white"}>
        <div>
            <button className={"flex"}>
                <img src={"/play.svg"} alt={"MyTube logo."} height={25} width={25} />
                <h1>MyTube</h1>
            </button>
        </div>
        <div>
            Profile
        </div>
    </nav>
}