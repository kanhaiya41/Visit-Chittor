import React from 'react'
import Navbar from './Navbar'

const ContactUs = () => {
  return (
    <div className='contact'>
      <Navbar />
      <div className="image-slider">
        <div className="image-container">
          <img src="./img/chittorgarh-1.jpg" alt="Image 1" className="slider-image" />
          <img src="./img/images.jpg" alt="Image 2" className="slider-image" />
          <img src="./img/images (1).jpg" alt="Image 3" className="slider-image" />
        </div>
        <div className="overlay-text">
          <h2>VISIT-CHITTORGARH</h2>
        </div>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927830.3552262387!2d74.30087267389308!3d24.7152969605088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968a05e6235bc99%3A0xae01996ba79dcf1c!2sChittorgarh%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1729713261084!5m2!1sen!2sin"
        width="100%" height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      <h2 className='CI'>Contact Information</h2> <br />
      <div className='CIFLEXBOX'>
        <div className='CIBox'>
          <img src="/img/call.jpeg" alt="phone" className='call' />  <hr />
          <div>
            Phone: <br />
            +91 9509346008 <br />
            +91 7742936692
          </div>
        </div> <br />
        <div className='CIBox'>
          <img src="/img/mail.png" alt="phone" className='call' />  <hr />
          <div>
            Gmails: <br />
            chittorgarh777@gmail.com <br />
            fort99@gmail.com
          </div>
        </div> <br />
        <div className='CIBox'>
          <img src="/img/msj.png" alt="phone" className='call' />  <hr />
          <div>
            Message Now: <br />
            +91 7742936692 <br />
            +91 5236497584
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
