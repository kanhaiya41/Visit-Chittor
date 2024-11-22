import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../utills/utills'
import toast from 'react-hot-toast'

const GuideBooking = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const branch = location.state;

  const [input, setInput] = useState({
    name: '',
    email: '',
    mobile: '',
    people: '',
    Booking_Date: '',
    Branch: branch
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const Book = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/customer/booking`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/tour/${branch}`);
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('while book guide', error);
    }
  }

  return (
    <div className='guidebooking'>
      <div id="signInBox" className="sign-in-box">
        <h2>Book Guide Now : </h2>
        <form>
          <label >Your Name:</label>
          <input type="text" id="email" name="name" required
            onChange={changeEventHandler} value={input.name}
          />

          <label >Email:</label>
          <input type="email" id="email" name="email" required
            onChange={changeEventHandler} value={input.email}
          />

          <label >Mobile:</label>
          <input type="number" id="email" name="mobile" required
            onChange={changeEventHandler} value={input.mobile}
          />

          <label >People with you:</label>
          <input type="number" id="people" name="people" required
            onChange={changeEventHandler} value={input.people}
          />

          <label htmlFor=""> Booking Date </label>
          <input type="date" required name='Booking_Date' onChange={changeEventHandler} value={input.Booking_Date} />

          {/* {
            loading ? <button>
              <img src="/img/loader.png" className='Loader' alt="loader" />
            </button>
              : */}
          <button type="submit"
            onClick={Book}
          >Book Now</button>
          {/* } */}
        </form>

      </div>
    </div>
  )
}

export default GuideBooking
