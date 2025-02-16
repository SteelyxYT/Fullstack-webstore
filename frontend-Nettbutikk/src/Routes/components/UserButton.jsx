import { useEffect, useState } from "react"
import { NavLink } from "react-router"



export default function UserButton() {

    const [loginState, setLoginState] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setLoginState(false)
        } else {
            setLoginState(true)
        }
    }, [])

    return (
        loginState ? <NavLink to="/profile" className={"NavBtn"} end>profile</NavLink> : <NavLink to="/login" className={"NavBtn"} end>Login</NavLink>
    )
}