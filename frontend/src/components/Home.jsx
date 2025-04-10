import React from 'react'
import '../App.css';
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const data = location.state;
  const { id } = location.state || {};
  console.log(data)

  const navigate = useNavigate();

  const handleFqr = async (e) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (id != 1 & 2) {
      navigate('/Fqr', { state: data });
    }
  }

  return (
    <div>
      <Navbar data={data?.email} />
      <h1>Your Classes</h1>
      <div className="classes">
        <div className="class class1">
          <h3>Maths</h3>
          <p>Present</p>
        </div>
        <div className="class class3">
          <h3>EEE</h3>
          <p>Absent</p>
        </div>
        <div className="class class2">
          <h3>Eng. Phy</h3>
          <p onClick={(e) => handleFqr(e)}>{id === 1
            ? "Present"
            : id === 2
              ? "Incomplete Quiz"
              : "Give Attendence"
          }</p>
        </div>

      </div>
    </div>
  )
}

export default Home

