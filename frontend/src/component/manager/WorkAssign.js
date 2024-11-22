import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import URL from '../../utills/utills';
import toast from 'react-hot-toast';

const WorkAssign = () => {

    const navigate = useNavigate();
    const [booked, setBooked] = useState([]);
    const [ids, setIds] = useState([]);
    const { user, selected } = useSelector(store => store.user);

    useEffect(() => {
        const getBookedTours = async () => {
            try {
                const bookedRes = await axios.get(`${URL}/admin/singlebranchbooking/${user?.branch}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (bookedRes?.data?.success) {
                    setBooked(bookedRes?.data?.data);
                }
            } catch (error) {
                console.log('while geting booked tours', error);
            }
        }
        getBookedTours();
    }, []);

    const onRadioChange = (id) => {
        setIds([
            ...ids,
            id
        ])
    }

    const [managerLoading, setManagerLoading] = useState(false);

    const assignNow = async () => {
        try {
            setManagerLoading(true);
            const res = await axios.post(`${URL}/manager/assignWork`, { ids, guide: selected?.Username });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate('/employee-info');
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while assigning work", error);
            toast.error('error');
        }
        finally {
            setManagerLoading(false);
        }
    }

    return (
        <>
            <div className='allitems'>
                <h1 className='avstock' >Tour Bookings</h1>
                <div className='tabled' style={{ height: '60vh' }} >

                    <table className='sotable'>
                        <thead>
                            <tr className='table-th'>
                                <th className='table-head'>S.N.</th>
                                <th className='table-head'>Name</th>
                                <th className='table-head'>Booking Date</th>
                                <th className='table-head'>Mobile</th>
                                <th className='table-head'>People</th>
                                <th className='table-head'>Assign</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                booked && booked.map((curElem, index) => (
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
                                        <td className='table-data'
                                        // onClick={() => navigate('/manager-info')}
                                        > <input type="radio" onChange={() => onRadioChange(curElem?._id)} /> </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                                managerLoading ? <button>
                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                </button>
                                    :
                    <button className='asgn' onClick={assignNow}>Assign</button>
}
                    <button className='asgn' onClick={() => navigate('/employee-info')}>Back</button>
                </div>
            </div>
        </>
    )
}

export default WorkAssign
