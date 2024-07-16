import React, { useRef, useEffect } from 'react'
import AppLogo from '../../assets/AppLogo.png'
import { navBarUserItems } from '../../staticdata/navBarItems'
import { adminNavBarItems } from '../../staticdata/navBarItems'
import { Link, NavLink } from 'react-router-dom'
import profileImg from '../../assets/profileImage.jpg'
import { BiMenu } from 'react-icons/bi'
import { SignedIn, SignedOut, UserButton, useClerk, useUser, useAuth } from "@clerk/clerk-react";
import { useSelector } from 'react-redux'


const isNotActiveStyle = 'flex items-center font-normal px-5 text-gray-900 hover:text-gray-600 transition-all duration-200 ease-in-out capitalize hover:font-bolder';
const isActiveStyle = 'flex items-center px-5 gap-3  font-extrabold border-b-4 transition-all duration-200 ease-in-out capitalize';




// JSX PART BEGINS
const Header = () => {
    const { userall } = useSelector((state) => state.users) //Retrieving user details from redux
    //Retrieving data after login using CLERK
    const { isLoaded, isSignedIn, user } = useUser();
    const { getToken } = useAuth();

    //Hooks for useRef 
    const navbarReference = useRef(null)
    const menubarReference = useRef(null)

    const extractToken = async () => {
        let tokenClerk = await getToken();
        localStorage.setItem('token', tokenClerk)
    }


    const deleteToken = async () => {
        localStorage.removeItem('token')
    }

    const freezeHeader = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                navbarReference?.current?.classList?.add("freeze_header")
            } else {
                navbarReference?.current?.classList?.remove("freeze_header")
            }
        })
    }


    function SignUpButton() {
        const clerk = useClerk();

        return (
            <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
                Register
            </button>
        );
    }

    function SignInButton() {
        const clerk = useClerk();
        return (
            <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>
                Login
            </button>
        );
    }


    useEffect(() => {
        extractToken()
        freezeHeader()
        if (!isLoaded || !isSignedIn) {
            deleteToken()
            return undefined;
        }

        return () => window.removeEventListener('scroll', freezeHeader)
    })

    const toggleMenu = () => menubarReference.current.classList.toggle("show_menu")



    return (
        <header className='header flex items-center' ref={navbarReference}>
            <div className="container">
                <div className='flex flex-row items-center justify-between'>
                    {/* For LOGO */}
                    <Link to="/">
                        <div>
                            <img src={AppLogo} alt="appLogo" className='h-24 w-24 rounded-xl py-1' />
                        </div>
                    </Link>



                    {/* Navbar Items */}
                    <div className='navigation' ref={menubarReference} onClick={toggleMenu}>
                        {userall?.isAdmin ?
                            <ul className='menu flex flex-row items-center gap-2'>
                                {adminNavBarItems.map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <NavLink to={data.path} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>{data.name}</NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                            : (
                                <ul className='menu flex flex-row items-center gap-2'>
                                    {navBarUserItems.map((data, index) => {
                                        return (
                                            <li key={index}>
                                                <NavLink to={data.path} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>{data.name}</NavLink>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )


                        }

                    </div>

                    <div className='flex items-center'>
                        <div className='hidden'>
                            <img src={profileImg} alt='profilepic' className='h-12 w-12 rounded-full mx-3' />
                        </div>
                        {/* For Login and Register buttons */}
                        <SignedOut>
                            <div className='flex flex-row justify-center mx-2 py-2'>
                                <Link to="/" className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-none bg-blue-900 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>
                                    <SignInButton />
                                </Link>
                            </div>

                            <div className='flex flex-row items-center mx-2 py-2'>
                                <Link to="/" className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-none bg-blue-900 hover:bg-gray-900 focus:ring-4 focus:ring-white hover:text-white hover:transition-all hover:duration-700 hover:ease-in-out'>
                                    <SignUpButton />
                                </Link>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className='flex py-2'>
                                <h2 className='items-center justify-center mr-2 leading-6 font-Murecho text-sm md:text-[12px] font-bold'>Hi, {user?.fullName}</h2>
                            </div>
                            <UserButton afterSignOutUrl='/' />
                        </SignedIn>
                    </div>

                    {/* Menu button for small screen */}
                    <span onClick={toggleMenu} className='show_menu md:hidden'>
                        <BiMenu className='w-6 h-6 cursor-pointer' />
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header