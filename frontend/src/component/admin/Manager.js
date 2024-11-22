import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import URL from '../../utills/utills';

const Manager = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { Man } = location.state;

  const [booked, setBooked] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const bookedRes = await axios.get(`${URL}/admin/singlebranchbooking/${Man?.branch}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const completedRes = await axios.get(`${URL}/admin/singlebranchcompletedtour/${Man?.branch}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (bookedRes?.data?.success && completedRes?.data?.success) {
          setBooked(bookedRes?.data?.data);
          setCompleted(completedRes?.data?.data);
        }
      } catch (error) {
        console.log("while geting tours of this manager's branch", error);
      }
    }
    getTours();
  }, []);

  return (
    <>
      <div className='mainmanager'>
        <div className='managerinfo'>
          <img src={Man?.profile_pic} alt="profile" />
          <h3>{Man?.Username}</h3>
          <div className='other'>
            <p>Branch: <span>{Man?.branch}</span> </p>
            <p>Mobile: <span>{Man?.mobile}</span> </p>
            <p>Email: <span>{Man?.email}</span> </p>
            <p>Code: <span>{Man?.code}</span> </p>
            <p>Address: <span>{Man?.address}</span> </p>
          </div>
        </div>
        <div className='workinfo'>
          <div className='allitems'>
            <h1 className='avstock' >Booked Tours</h1>
            <div className='tabled'  >

              <table className='sotable'>
                <thead>
                  <tr className='table-th'>
                    <th className='table-head'>S.N.</th>
                    <th className='table-head'>Name</th>
                    <th className='table-head'>Booking Date</th>
                    <th className='table-head'>Mobile</th>
                    <th className='table-head'>People</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    booked && booked.map((curElem, index) => (

                      <tr className='table-row'>
                        <td className='table-data'> {index + 1}</td>
                        <td className='table-data'>{curElem?.name} </td>
                        <td className='table-data'>{curElem?.Booking_Date} </td>
                        <td className='table-data'>{curElem?.mobile}</td>
                        <td className='table-data'>{curElem?.people}</td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='allitems'>
            <h1 className='avstock' >Recently Completed Tours</h1>
            <div className='tabled' style={{ height: '60vh' }} >

              <table className='sotable'>
                <thead>
                  <tr className='table-th'>
                    <th className='table-head'>S.N.</th>
                    <th className='table-head'>Name</th>
                    <th className='table-head'>Booking Date</th>
                    <th className='table-head'>Email</th>
                    <th className='table-head'>People</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    completed && completed.map((curElem, index) => (

                      <tr className='table-row'>
                        <td className='table-data'> {index + 1}</td>
                        <td className='table-data'>{curElem?.customerName} </td>
                        <td className='table-data'>{curElem?.Booking_Date} </td>
                        <td className='table-data'>{curElem?.customerEmail}</td>
                        <td className='table-data'>{curElem?.people}</td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='asworkbtn'>
            <button className='aswork' style={{ padding: '2vh 3vw' }} onClick={() => navigate('/AdminPanel')}> Back </button>
          </div>
          <br /> <br /> <br /> <br />
        </div>
      </div>
    </>
  )
}

export default Manager
