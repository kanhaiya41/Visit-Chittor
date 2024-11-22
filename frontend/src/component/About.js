import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { faTrash, faUserNurse, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import toast from 'react-hot-toast';
import URL from '../utills/utills';
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const About = () => {
  const navigate = useNavigate();

  const [sign, setSign] = useState(false);
  const [adminSign, setAdminSign] = useState(false);
  const [managerSign, setManagerSign] = useState(false);
  const [guideSign, setGuideSign] = useState(false);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState({
    email: '',
    code: ''
  });
  const [manager, setManager] = useState({
    email: '',
    code: '',
    branch: ''
  });
  const [guide, setGuide] = useState({
    email: '',
    code: '',
    branch: ''
  });

  useEffect(() => {
    if (sign) {
      document.getElementById("staffuse").classList.add('animate');
    }
    else {
      document.getElementById("staffuse").classList.remove('animate');
    }

    if (adminSign) {
      document.getElementById("Admin").classList.add('adminanimate');
    }
    else {
      document.getElementById("Admin").classList.remove('adminanimate');
    }

    if (managerSign) {
      document.getElementById("Manager").classList.add('adminanimate');
    }
    else {
      document.getElementById("Manager").classList.remove('adminanimate');
    }

    if (guideSign) {
      document.getElementById("Guide").classList.add('adminanimate');
    }
    else {
      document.getElementById("Guide").classList.remove('adminanimate');
    }

  }, [sign, adminSign, managerSign, guideSign]);

  const adminInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    })
  };

  const managerInput = (e) => {
    setManager({
      ...manager,
      [e.target.name]: e.target.value
    })
  };

  const guideInput = (e) => {
    setGuide({
      ...guide,
      [e.target.name]: e.target.value
    })
  };

  const adminSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/admin/login`, admin, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);

        navigate('/AdminPanel');
      }
      else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log("while admin sign in", error);
      toast.error('error');
    }
  }

  const managerSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/admin/managerlogin`, manager, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUser(res?.data?.exist));
        navigate('/ManagerPanel');
      }
      else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log("while manager sign in", error);
      toast.error('error');
    }
  }

  const guideSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/manager/guidelogin`, guide, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUser(res?.data?.exist));
        navigate('/GuidePanel');
      }
      else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log("while guide sign in", error);
      toast.error('error');
    }
  }

  return (
    <>
      <Navbar />
      <div className="about">
        <header className="header">
          <h1>About Us</h1>
          <p>Discover the heritage, culture, and charm of Chittor with us!</p>
        </header>

        <section className="about-section">
          <div className="about-image">
            <img src="/img/fort.png" alt="Chittor Fort" />
          </div>
          <div className="about-content">
            <h2>Who We Are</h2>
            <p>Welcome to "Visit Chittor," your guide to exploring the rich history and vibrant culture of Chittorgarh. We are passionate about bringing Chittor's legacy to life for travelers worldwide.</p>
            <h2>Our Mission</h2>
            <p>Our mission is to provide an authentic experience of Chittor's heritage, helping visitors appreciate the beauty and stories behind every monument, fort, and cultural landmark.</p>
            <h2>What We Offer</h2>
            <ul>
              <li>Detailed guides to historical sites and monuments</li>
              <li>Local recommendations for food, art, and cultural experiences</li>
              <li>Insights into the legacy and stories of Chittor’s warriors and rulers</li>
            </ul>
          </div>
        </section>
        <div className='header' id='staff'
          // onClick={()=>navigate('/AdminPanel')} 
          onClick={() => setSign(!sign)}
        ><p>Only for the staff use</p></div>
      </div>


      <div id="staffuse">
        <div className='line'> </div>
        <div className='staffuse'>
          <h2>Who are you</h2>
          <div>
            <h4 onClick={() => {
              setAdminSign(!adminSign);
              setSign(!sign);
            }
            } > <FontAwesomeIcon icon={faUserTie} color='blue' /> Admin</h4>
            <h4 onClick={() => {
              setManagerSign(!managerSign);
              setSign(!sign);
            }
            }> <FontAwesomeIcon icon={faUserNurse} color='orange' /> Manager</h4>
            <h4 onClick={() => {
              setGuideSign(!guideSign);
              setSign(!sign);
            }
            }> <FontAwesomeIcon icon={faUser} color='gray' /> Guide</h4>
          </div>
        </div>
      </div>


      <div id="Admin" className="sign-in-box">
        <h2> Admin Sign In</h2>
        <form>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required
            value={admin.email} onChange={adminInput}
          />

          <label for="password">your Code:</label>
          <input type="password" id="password" name="code" required
            value={admin.code} onChange={adminInput}
          />

          <div className="pswrds">
            {/* {
                loading ? <button>
                  <img src="/img/loader.png" className='Loader' alt="loader" />
                </button>
                  : */}
            <button type="submit"
              onClick={adminSignIn}
            >Sign In</button>

            {/* // } */}

          </div>
        </form>
        <span className="close-signin"
          onClick={() => setAdminSign(!adminSign)}
        >X</span>

      </div>

      <div id="Guide" className="sign-in-box">
        <h2> Guide Sign In</h2>
        <form>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required
            value={guide.email} onChange={guideInput}
          />

          <label for="password">your Code:</label>
          <input type="password" id="password" name="code" required
            value={guide.code} onChange={guideInput}
          />

          <label for="password">your Branch:</label>
          <input type="text" id="password" name="branch" required
            value={guide.branch} onChange={guideInput}
          />

          <div className="pswrds">
            {/* {
                loading ? <button>
                  <img src="/img/loader.png" className='Loader' alt="loader" />
                </button>
                  : */}
            <button type="submit"
              onClick={guideSignIn}
            >Sign In</button>

            {/* // } */}

          </div>
        </form>
        <span className="close-signin"
          onClick={() => setGuideSign(!guideSign)}
        >X</span>

      </div>

      <div id="Manager" className="sign-in-box">
        <h2> Manager Sign In</h2>
        <form>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required
            value={manager.email} onChange={managerInput}
          />

          <label for="password">your Code:</label>
          <input type="password" id="password" name="code" required
            value={manager.code} onChange={managerInput}
          />

          <label for="password">your Branch:</label>
          <input type="text" id="password" name="branch" required
            value={manager.branch} onChange={managerInput}
          />

          <div className="pswrds">
            {/* {
                loading ? <button>
                  <img src="/img/loader.png" className='Loader' alt="loader" />
                </button>
                  : */}
            <button type="submit"
              onClick={managerSignIn}
            >Sign In</button>

            {/* // } */}

          </div>
        </form>
        <span className="close-signin"
          onClick={() => setManagerSign(!managerSign)}
        >X</span>

      </div>

    </>
  )
}

export default About
