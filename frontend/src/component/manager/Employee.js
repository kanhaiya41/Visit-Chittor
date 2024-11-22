import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../../utills/utills'

const Employee = () => {

  const navigate = useNavigate();

  const { selected } = useSelector(store => store.user);

  const [assigned, setAssigned] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const assignedRes = await axios.get(`${URL}/manager/getSingleguideAssignedTours/${selected?.Username}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const completedRes = await axios.get(`${URL}/manager/getSingleguideCompletedTours/${selected?.Username}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (assignedRes?.data?.success && completedRes?.data?.success) {
          setAssigned(assignedRes?.data?.assigned);
          setCompleted(completedRes?.data?.completed);
        }
      } catch (error) {
        console.log('while getting single guide tours', error);
      }
    }
    getTours();
  }, []);

  return (
    <>
      <div className='mainmanager'>
        <div className='managerinfo'>
          <img src={selected?.profile_pic} alt="profile" />
          <h3>{selected?.Username}</h3>
          <div className='other'>
            <p>Branch: <span>{selected?.branch}</span> </p>
            <p>Mobile: <span>{selected?.mobile}</span> </p>
            <p>Email: <span>{selected?.email}</span> </p>
            <p>Code: <span>{selected?.code}</span> </p>
            <p>Address: <span>{selected?.address}</span> </p>
          </div>
        </div>

        <div className='workinfo'>
          <div className='allitems'>
            <h1 className='avstock' >Assigned Tours</h1>
            <div className='tabled' style={{ height: '60vh' }} >

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
                    assigned && assigned.map((curElem, index) => (
                      <tr className='table-row'>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        > {index + 1}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.name}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.Booking_Date} </td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.mobile}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.people}</td>


                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className='asworkbtn'>
            <button className='aswork' onClick={() => navigate('/Employeework')}>Assign Work</button>
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
                    <th className='table-head'>completion Date</th>
                    <th className='table-head'>Mobile</th>
                    <th className='table-head'>People</th>
                  </tr>

                </thead>
                <tbody>
                  {
                    completed && completed.map((curElem, index) => (
                      <tr className='table-row'>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        > {index + 1}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.customerName}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.Booking_Date}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.completionData} </td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.mobile}</td>
                        <td className='table-data'
                        // onClick={() => navigate('/manager-info')}
                        >{curElem?.people}</td>
                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='asworkbtn'>
            <button className='aswork' onClick={() => navigate('/managerPanel')}>Back</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Employee
