import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { RetellWebClient } from 'retell-client-js-sdk';
import Wave from './Wave';
import { Link, useNavigate } from 'react-router-dom';
import { FcEndCall } from "react-icons/fc";

function WebCall() {
  var count =0;
  const [status, setStatus] = useState('Initializing...');
  const retellClientRef = useRef(null);
  const [error, setError] = useState(null);
  const [transcript, setTranscript]= useState(['Lets start'])
  const [speaking, setSpeaking]= useState(false);
  const [disconnect,setDisconnect]= useState(false);
  const navigate= useNavigate();
  
  const backend= process.env.REACT_APP_BACKEND_URL;
  async function fetchAccessToken() {
    if(count==0){
    try {
      let i =0;
      const response = await axios.post(`${backend}/api/create-web-call`, {
        agentId: process.env.REACT_APP_AGENT_ID,
        apiKey: process.env.REACT_APP_API_KEY
      });
      console.log(response)
      setStatus('Access token received!');
      const retellWebClient = new RetellWebClient();
      await retellWebClient.startCall({ accessToken: response.data.accessToken });
      retellClientRef.current=retellWebClient;
      retellWebClient.on("agent_start_talking", async() => {
          setSpeaking(true);
        });
        
        // When agent is done talking for the utterance
        // useful for animation
        retellWebClient.on("agent_stop_talking", async() => {
          setSpeaking(false);
          

        });
        retellWebClient.on("update",(update) => {
          try {
            setTranscript(update.transcript[update.transcript.length-1].content);
            
          } catch (error) {
            console.log(error)
            
          }
          
        })

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch access token or start call');
    }
  }}

  useEffect(() => {
    fetchAccessToken();
    count++;
  }, []);

  const end= ()=>{
    console.log('ending');
    retellClientRef.current.stopCall();
    navigate('/')
    alert('Call Ended')
  };

  return (
    <div className="WebCall" style={styles.container}>
      <div style={styles.title}>Interview in Progress..</div>
      <div style={{
                margin:'30px auto',
                width: '100px',    /* Adjust size as needed */
                height: '100px',
                borderRadius: '50%', /* Makes the div a circle */
                border: '2px solid blue', /* Optional: Border for visibility */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', /* Centers the wave animation */
                overflow: 'hidden',
                background:'blue'
        }}>

            <Wave isSpeaking={speaking} />
          </div>
      
      <div style={{margin:'50px', 'padding':'5px', color:'blue', fontWeight:'bolder'}}>{transcript}</div>
      <button onClick={end} style={{'margin':'4px', 'backgroundColor':'white','borderRadius':'40px','height':'50px', 'width':'50px','cursor':'pointer'}}>
        <FcEndCall style={{'color':'white', 'backgroundColor':'white','height':'30px', 'width':'30px'}}/>
      </button>
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
      fontSize: '24px',
      fontWeight: 'bold',
      color:'blue',
      padding: '10px',
    },
  };


export default WebCall;
