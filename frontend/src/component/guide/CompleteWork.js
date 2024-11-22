import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import URL from '../../utills/utills'

const CompleteWork = () => {

    const navigate = useNavigate();

    const { user } = useSelector(store => store.user);
    const [input, setInput] = useState({
        customerName: '',
        customerEmail: '',
        people: '',
        Booking_Date: '',
        completionData: '',
        Branch: user.branch,
        code: ''
    });

    const inputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const [managerLoading, setManagerLoading] = useState(false);

    const workDone = async () => {
        try {
            setManagerLoading(true);
            const res = await axios.post(`${URL}/customer/complete`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate('/GuidePanel');
            }
        } catch (error) {
            console.log("while completing the work", error)
            toast.error('errro');
        }
        finally {
            setManagerLoading(false);
        }
    }

    return (
        <>
            <div className='completedwork'>
                Booker Name: <input type="text" name='customerName' value={input.customerName} onChange={inputChange} /> <br />
                Booking Date: <input type="date" name='Booking_Date' value={input.Booking_Date} onChange={inputChange} /><br />
                Completion date: <input type="date" name='completionData' value={input.completionData} onChange={inputChange} /><br />
                Email: <input type="text" name='customerEmail' value={input.customerEmail} onChange={inputChange} /><br />
                People : <input type="text" name='people' value={input.people} onChange={inputChange} /><br />
                Guide Code : <input type="text" name='code' value={input.code} onChange={inputChange} /><br />
                {
                    managerLoading ? <button>
                        < img src="/img/loader.png" className='Loader' alt="loader" />
                    </button>
                        : <button onClick={workDone}>Done</button>

                }
            </div >
        </>

    )
}

export default CompleteWork
