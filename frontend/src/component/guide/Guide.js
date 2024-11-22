import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import URL from '../../utills/utills';
import { useSelector } from 'react-redux';

const Guide = () => {

    const navigate = useNavigate();
    const [assigned, setAssigned] = useState([]);
    const [completed, setCompleted] = useState([]);
    const { user } = useSelector(store => store.user);

    useEffect(() => {
        const getTours = async () => {
            try {
                const assignedRes = await axios.get(`${URL}/manager/getSingleguideAssignedTours/${user?.Username}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const completedRes = await axios.get(`${URL}/manager/getSingleguideCompletedTours/${user?.Username}`, {
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
            <div className='mainmangerpanel'>
                <div className='profile'>
                    <img src={user?.profile_pic} alt="profile" />
                    <h3>{user?.Username}</h3>
                </div>
                <div className='branchwork'>
                    <div className='allitems'>
                        <h1 className='avstock' >Your Work</h1>
                        <div className='tabled' style={{ height: '60vh' }} >
                            <table className='sotable'>
                                <thead>
                                    <tr className='table-th'>
                                        <th className='table-head'>S.N.</th>
                                        <th className='table-head'>Name</th>
                                        <th className='table-head'>Booking Date</th>
                                        <th className='table-head'>Mobile</th>
                                        <th className='table-head'>People</th>
                                        <th className='table-head'>Action</th>
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
                                                <td className='table-data' id='complete' onClick={() => navigate('/work-complete')}>Complete</td>

                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className='allitems'>
                        <h1 className='avstock' >Completed Tours</h1>
                        <div className='tabled' style={{ height: '60vh' }} >

                            <table className='sotable'>
                                <thead>
                                    <tr className='table-th'>
                                        <th className='table-head'>S.N.</th>
                                        <th className='table-head'>Name</th>
                                        <th className='table-head'>Booking Date</th>
                                        <th className='table-head'>completion Date</th>
                                        <th className='table-head'>Email</th>
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
                                                >{curElem?.Booking_Date} </td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.completionData} </td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.customerEmail}</td>
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
                </div>
                <div className='asworkbtn' style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100vw'}}>
            <button className='aswork'  onClick={() => navigate('/about')}>Back</button>
          </div>
            </div>
        </>
    )
}

export default Guide
