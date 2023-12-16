import { useRef } from "react"


const Navbar = () => {
    const dark = useRef(null)
  return (
    <div className='navbar bg-slate-700'>
    <ul className="flex space-x-6  ">
        <li><a className="no-underline text-zinc-400 hover:text-white transition" href="Home">Home</a></li>
        <li><a className="no-underline text-zinc-400 hover:text-white transition" href="About">About</a></li>
        <li><a onClick={()=> {
            const html = document.querySelector("html");
            html.classList.toggle("dark")
        }} ref={dark} className="no-underline text-zinc-400 hover:text-white transition" >Mode</a></li>
    </ul>

    </div>
  )
}

export default Navbar