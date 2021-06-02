import React from 'react'
import Logo from './images/logo.svg'

const Header = ({header}) => {
    return (
        <div className="header">
            <img src={Logo} width={70} height={70}/>
            <h1>TODO list</h1>
        </div>
    )
}

export default Header