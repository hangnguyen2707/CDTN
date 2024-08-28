import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { getAllPackages } from "../../store/actions/package";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPackages());
    const handleScroll = () => {
      var header = document.getElementById('header');
      var nav = document.getElementById('nav');
      var links = document.querySelectorAll('#nav a');
      
      if (header && nav) {
        if (window.scrollY > header.offsetHeight) {
          nav.style.backgroundColor = 'white';
          links.forEach(link => {
            link.style.color = 'black';
          });
        } else {
          nav.style.backgroundColor = 'transparent';
          links.forEach(link => {
            link.style.color = 'white';
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  
  return (
    <div id='header'>
      <nav id="nav">
        <ul className="menuNav">
          <li>
            <div className="logo">
              <Link to='/'>
                <h2>FUTA Express</h2>
              </Link>
            </div>
          </li>
          
          
          
          {!isLogged && <li>
            <Link to='/login'>
              Đăng nhập
            </Link>
          </li>}
          {isLogged && userData && <li onClick={() => dispatch(actions.logout())}>

            <Link to='/login'>
              <div>Đăng xuất</div>
            </Link>
          </li>}
        </ul>
      </nav>
      <br></br>
      <div className="post">
        <h1>Welcome to FUTA Express!</h1>
      </div>
    </div>
  )
}

export default Header