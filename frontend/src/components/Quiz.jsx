import React from 'react'
import '../App.css';
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const Fqr = () => {
    const location = useLocation();
    const data = location.state;
    console.log(data)

    const navigate = useNavigate();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 500 },
            false
        );

        scanner.render(
            (decodedText, decodedResult) => {
                console.log("QR Code:", decodedText);
                navigate('/Quiz', { state: data });
            },
            (error) => {
                console.warn("QR error:", error);
            }
        )
        return () => {
            scanner.clear();
        };
    }, []);
    
    const handleFullScreen = () => {
        const elem = document.documentElement;
      
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      };
      
return (
    <div>
        <Navbar data={data?.email} />
        <div id="reader" onClick={handleFullScreen}/>
    </div>
)
};

export default Fqr

