import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import URL from '../../utills/utills'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setSelected } from '../../redux/userSlice'

const ManagerPanel = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        Username: '',
        email: '',
        mobile: '',
        code: '',
        mCode: '',
        branch: '',
        address: ''
    });

    const [image, setImage] = useState(null);
    const [guides, setGuides] = useState([]);
    const [booked, setBooked] = useState([]);
    const [assigned, setAssigned] = useState([]);
    const [completed, setCompleted] = useState([]);
    const { user } = useSelector(store => store.user);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const appointGuide = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Username', input.Username);
            formData.append('email', input.email);
            formData.append('mobile', input.mobile);
            formData.append('code', input.code);
            formData.append('mCode', input.mCode);
            formData.append('branch', input.branch);
            formData.append('address', input.address);
            formData.append('profile_pic', image);
            const res = await axios.post(`${URL}/manager/appointGuide`, formData);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setGuides([
                    ...guides,
                    res?.data?.data
                ]);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while appointing a guide", error);
            toast.error('error');
        }
    }

    useEffect(() => {
        const getManagers = async () => {
            try {
                const res = await axios.get(`${URL}/manager/getAllguide/${user?.branch}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res?.data?.success) {
                    setGuides(res?.data?.allManager);
                }
            } catch (error) {
                console.log("while getting guide list", error);
            }
        }
        getManagers();
    }, []);

    useEffect(() => {
        const getBookedTours = async () => {
            try {
                const bookedRes = await axios.get(`${URL}/admin/singlebranchbooking/${user?.branch}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const completedRes = await axios.get(`${URL}/admin/singlebranchcompletedtour/${user?.branch}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const assignedRes = await axios.get(`${URL}/manager/getAllasignedTours/${user?.branch}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (bookedRes?.data?.success && completedRes?.data?.success && assignedRes?.data?.success) {
                    setBooked(bookedRes?.data?.data);
                    setCompleted(completedRes?.data?.data);
                    setAssigned(assignedRes?.data?.allManager);
                }
            } catch (error) {
                console.log("while geting tours of this manager's branch", error);
            }
        }
        getBookedTours();
    }, []);

    const deleteManager = async (id) => {
        try {
            const res = await axios.delete(`${URL}/manager/deleteGuide/${id}`);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log("while delete manager", error);
        }
    }

    const employeInfo = (data) => {
        dispatch(setSelected(data));
        navigate('/employee-info');
    }

    return (
        <>
            <div className='mainmangerpanel'>
                <div className='profile'>
                    <img src={user?.profile_pic} alt="profile" />
                    <h3>{user?.Username}</h3>
                </div>
                <div className='branchwork'>
                    <div id="signInBox" className="sign-in-box">
                        <h2>Appoint New Guide</h2>
                        <form>
                            <label >Username:</label>
                            <input type="text" id="email" name="Username" required
                                onChange={changeEventHandler} value={input.Username}
                            />

                            <label >Email:</label>
                            <input type="email" id="email" name="email" required
                                onChange={changeEventHandler} value={input.email}
                            />

                            <label >Mobile:</label>
                            <input type="number" id="email" name="mobile" required
                                onChange={changeEventHandler} value={input.mobile}
                            />

                            <label >Emloyee Code:</label>
                            <input type="text" id="people" name="code" required
                                onChange={changeEventHandler} value={input.code}
                            />

                            <label >Manager Code:</label>
                            <input type="text" id="people" name="mCode" required
                                onChange={changeEventHandler} value={input.mCode}
                            />

                            <label >Branch:</label>
                            <input type="text" id="people" name="branch" required
                                onChange={changeEventHandler} value={input.branch}
                            />

                            <label htmlFor=""> Address </label>
                            <input type="text" required name='address'
                                onChange={changeEventHandler} value={input.address}
                            />
                            <label >Profile Pic:</label>
                            <input type="file" id="file" name="file" style={{ display: 'none' }} required
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label className='fillbl' htmlFor="file">
                                {image ? image?.name : 'choose from device...'}
                            </label>
                            {/* {
            loading ? <button>
              <img src="/img/loader.png" className='Loader' alt="loader" />
            </button>
              : */}
                            <button type="submit"
                                onClick={appointGuide}
                            >Appoint Now</button>
                            {/* } */}
                        </form>

                    </div>
                    <div className='allitems'>
                        <h1 className='avstock' >All Employees List</h1>
                        <div className='tabled' style={{ height: '60vh' }} >

                            <table className='sotable'>
                                <thead>
                                    <tr className='table-th'>
                                        <th className='table-head'>S.N.</th>
                                        <th className='table-head'>Username</th>
                                        <th className='table-head'>Code</th>
                                        <th className='table-head'>Address</th>
                                        <th className='table-head'>Mobile</th>
                                        <th className='table-head'>Email</th>
                                        <th className='table-head'>Action</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        guides && guides.map((curElem, index) => (
                                            <tr className='table-row'>
                                                <td className='table-data'
                                                    onClick={() => employeInfo(curElem)}
                                                > {index + 1}</td>
                                                <td className='table-data'
                                                    onClick={() => employeInfo(curElem)}
                                                >{curElem?.Username}</td>
                                                <td className='table-data'
                                                    onClick={() => employeInfo(curElem)}
                                                >{curElem?.code} </td>
                                                <td className='table-data'
                                                    onClick={() => employeInfo(curElem)}
                                                >{curElem?.address}</td>
                                                <td className='table-data'
                                                    onClick={() => employeInfo(curElem)}
                                                >{curElem?.mobile}</td>
                                                <td className='table-data'
                                                    onClick={() => employeInfo(curElem)}
                                                >{curElem?.email}</td>
                                                <td className='table-action'>
                                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteManager(curElem._id)} style={{ color: 'red', cursor: 'pointer' }} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='allitems'>
                        <h1 className='avstock' >Booked Tours</h1>
                        <div className='tabled' style={{ height: '60vh' }} >

                            <table className='sotable'>
                                <thead>
                                    <tr className='table-th'>
                                        <th className='table-head'>S.N.</th>
                                        <th className='table-head'>Name</th>
                                        <th className='table-head'>Booking Date</th>
                                        <th className='table-head'>Mobile</th>
                                        <th className='table-head'>Email</th>
                                        <th className='table-head'>People</th>
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
                                                >{curElem?.email}</td>
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
                    <div className='allitems'>
                        <h1 className='avstock' >Assigned Tours</h1>
                        <div className='tabled' style={{ height: '60vh' }} >

                            <table className='sotable'>
                                <thead>
                                    <tr className='table-th'>
                                        <th className='table-head'>S.N.</th>
                                        <th className='table-head'>Customer</th>
                                        <th className='table-head'>Booking Date</th>
                                        <th className='table-head'>email</th>
                                        <th className='table-head'>People</th>
                                        <th className='table-head'>Guide</th>
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
                                                >{curElem?.email}</td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.people}</td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.guide}</td>
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
                                        <th className='table-head'>Customer</th>
                                        <th className='table-head'>Booking Date</th>
                                        <th className='table-head'>Completion Date</th>
                                        <th className='table-head'>email</th>
                                        <th className='table-head'>People</th>
                                        <th className='table-head'>Guide</th>
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
                                                >{curElem?.completionData}</td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.email}</td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.people}</td>
                                                <td className='table-data'
                                                // onClick={() => navigate('/manager-info')}
                                                >{curElem?.guide}</td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className='asgn' onClick={()=>navigate('/about')} >Back</button> <br /> <br />
                </div>
            </div>
        </>
    )
}

export default ManagerPanel
