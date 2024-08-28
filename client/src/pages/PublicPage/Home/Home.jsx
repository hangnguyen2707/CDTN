import { useEffect } from 'react';
import React from 'react';
import './Home.css';
import { useDispatch } from 'react-redux'
import { getAllPackages } from "../../../store/actions/package";

export const Home = () => {
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  return (
    <div id="home">
   
    </div>
  )
}
