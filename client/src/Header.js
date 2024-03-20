import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Header = () => {
   const {setUserInfo, userInfo} = useContext(UserContext);
   useEffect(()=>{
        fetch(`${window.location.origin}/profile`, {
         credentials:'include',
        }).then(response => {
          response.json().then(userInfo => {
            setUserInfo(userInfo);
          })
        })
   },[])

  

  function logout(){
    fetch(`${window.location.origin}/logout`, {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
  }


const username = userInfo?.username;

  return (
        <header>
        <Link to="/" className="logo"  >Users Data</Link>
             <nav>
             {username && (
               <>
                 <a className='loga' onClick={logout}>Logout</a>
               </>
             )}
             {!username && (
               <>
               <Link to="/login" >Login</Link>
               <Link to="/register" >Sign up</Link>
               </>
             )}
             </nav>
          </header>
  )
}

export default Header
