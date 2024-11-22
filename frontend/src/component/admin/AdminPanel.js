import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faDrumstickBite, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../utills/utills';
import toast from 'react-hot-toast';

const AdminPanel = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        Username: '',
        email: '',
        mobile: '',
        code: '',
        branch: '',
        address: ''
    });

    const [image, setImage] = useState(null);
    const [managers, setManagers] = useState([]);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const AppointManager = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Username', input.Username);
            formData.append('email', input.email);
            formData.append('mobile', input.mobile);
            formData.append('code', input.code);
            formData.append('branch', input.branch);
            formData.append('address', input.address);
            formData.append('profile_pic', image);
            const res = await axios.post(`${URL}/admin/appointManager`, formData);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setManagers([
                    ...managers,
                    res?.data?.data
                ]);
                setInput({
                    Username: '',
                    email: '',
                    mobile: '',
                    code: '',
                    branch: '',
                    address: ''
                });
                setImage(null);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while appointing a manager", error);
            toast.error('error');
        }
    }

    useEffect(() => {
        const getManagers = async () => {
            try {
                const res = await axios.get(`${URL}/admin/allmanager`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res?.data?.success) {
                    setManagers(res?.data?.allManager);
                }
            } catch (error) {
                console.log("while getting manager list", error);
            }
        }
        getManagers();
    }, []);

    const deleteManager = async (id) => {
        try {
            const res = await axios.delete(`${URL}/admin/deletemanager/${id}`);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log("while delete manager", error);
        }
    }

    return (
        <>
            <div className='adminpanel'>
                <div id="signInBox" className="sign-in-box">
                    <h2>Appoint a New Branch Manager</h2>
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
                        <input type="number" id="mobile" name="mobile" required
                            onChange={changeEventHandler} value={input.mobile}
                        />

                        <label >Manager Code:</label>
                        <input type="text" id="code" name="code" required
                            onChange={changeEventHandler} value={input.code}
                        />

                        <label >Branch:</label>
                        <input type="text" id="branch" name="branch" required
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
                            {image ? image?.name :
                                'choose from device...'}
                        </label>
                        {/* {
            loading ? <button>
              <img src="/img/loader.png" className='Loader' alt="loader" />
            </button>
              : */}
                        <button type="submit"
                            onClick={AppointManager}
                        >Appoint Now</button>
                        {/* } */}
                    </form>

                </div>
                <div className='allitems'>
                    <h1 className='avstock' >All Managers List</h1>
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
                                    Array.isArray(managers) && managers.map((curElem, index) => (
                                        <tr className='table-row'>
                                            <td className='table-data' onClick={() => navigate('/manager-info', { state: { Man: curElem } })} >{index + 1} </td>
                                            <td className='table-data' onClick={() => navigate('/manager-info', { state: { Man: curElem } })} >{curElem?.Username}</td>
                                            <td className='table-data' onClick={() => navigate('/manager-info', { state: { Man: curElem } })} >{curElem?.code} </td>
                                            <td className='table-data' onClick={() => navigate('/manager-info', { state: { Man: curElem } })} >{curElem?.address}</td>
                                            <td className='table-data' onClick={() => navigate('/manager-info', { state: { Man: curElem } })} >{curElem?.mobile}</td>
                                            <td className='table-data' onClick={() => navigate('/manager-info', { state: { Man: curElem } })} >{curElem?.email}</td>
                                            <td className='table-action'>
                                                <FontAwesomeIcon onClick={() => deleteManager(curElem._id)} icon={faTrash} style={{ color: 'red', cursor: 'pointer' }} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className='aswork' style={{ padding: '2vh 3vw' }} onClick={() => navigate('/about')} >Back</button>
            </div >
        </>
    )
}

export default AdminPanel
