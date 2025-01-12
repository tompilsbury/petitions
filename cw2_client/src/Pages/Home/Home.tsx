import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Utils/AuthProvider';
import './Home.css'

function Home() {
  const navigate = useNavigate();
  const {token} = useAuth();
  useEffect(() => {
    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
    
  },[])
  return (
    <></>
  )
}

export default Home