import React, { useState, useEffect } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function Home({handleDataFromChild}) {
  const {id}= useParams();
  handleDataFromChild(id);
  return (
    <div className="App" style={styles.container}>
      <div  style={styles.title}>AI VOICE ASSISTANT</div>
      <h2 style={{margin:'50px 10px'}}>Our Course Companion voice assistant is designed to make your learning experience interactive and engaging. This AI-powered assistant asks you a 
        series of thoughtful, basic questions related to the course you're enrolled in</h2>
      <h1 style={{color:'green'}}>Click the green button to start the call and begin your interactive learning session!</h1>
      <Link to='/webcall'><button style={{'backgroundColor':'#61ff33','borderRadius':'40px','height':'50px', 'width':'50px','cursor':'pointer'}}>
      <FaPhoneAlt style={{'color':'ffffff', 'backgroundColor':'61ff33','height':'30px', 'width':'30px'}}/></button></Link>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display:'flex',
    flexDirection:'column',
    padding:'80px',
    alignItems:'center',
    background: `url('https://img.freepik.com/free-vector/sound-wave-gray-digital-background-entertainment-technology_53876-119613.jpg') no-repeat center center fixed`, // Background image
    backgroundSize: 'cover', // Ensures the image covers the entire background
    color: 'black', // Text   color to ensure readability over the background
    minHeight: '100vh', // Ensures the container takes up the full viewport height
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    color:'red',
    padding: '10px',
  },
};


export default Home;

