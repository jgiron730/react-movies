import React from 'react'
import { RiMovie2Line } from "react-icons/ri";
import { NavLink,Link } from 'react-router-dom'
import { Nav } from './CompStyle'
function Menu() {
    return (
        <Nav>
            <Link to="/">
                <RiMovie2Line />
            </Link>
            <ul>
                <li><NavLink activeClassName="aqui" exact to="/">Trending</NavLink></li>
                <li><NavLink activeClassName="aqui" to="/top/popular">TV Popular</NavLink></li>
                <li><NavLink activeClassName="aqui" to="/top/top_rated">Lastest</NavLink></li>
            </ul>
        </Nav>
    )
}

export default Menu
