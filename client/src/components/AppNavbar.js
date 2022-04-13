import React from "react";
import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import useAuth from "../hooks/useAuth";

const AppNavbar = () => {
    const { user, logout } = useAuth()

    return (
        <Navbar variant='primary' bg='light' sticky='top' >
            <Container>
                <Navbar.Brand href='/' >Urser</Navbar.Brand>
                <Nav className='ms-auto'>
                    {user
                        ?
                        <Dropdown align='end'>
                            <Dropdown.Toggle className='text-light'>
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to='/profile' className='d-flex justify-content-between align-items-center' >
                                    Profile
                                    <FontAwesomeIcon icon={faUser} />
                                </Dropdown.Item>
                                <Dropdown.Item onClick={logout} className='d-flex justify-content-between align-items-center' >
                                    Sign Out
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        <Button as={NavLink} to='/login'>Login</Button>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;