import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [count, setCount] = useState(0);
    const slidesRef = useRef(null);
    const totalSlides = 3;
    const slideWidth = 100;

    const navigate = useNavigate();

    const autoSlider = () => {
        setCount((prevCount) => {
            if (prevCount >= totalSlides - 1) {
                return 0;
            } else {
                return prevCount + 1;
            }
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            autoSlider();
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (slidesRef.current) {
            slidesRef.current.style.marginLeft = `-${count * slideWidth}vw`;
        }
    }, [count]);

    return (
        <>
            <Navbar />
            <div className='home'>
                <div className='slider'>
                    <div className='slides' ref={slidesRef}>
                        <div className="slide">
                            <img src="/img/chittorgarh-1.jpg" alt="Slide 1" />
                        </div>
                        <div className="slide">
                            <img src="/img/images.jpg" alt="Slide 2" />
                        </div>
                        <div className="slide">
                            <img src="/img/images (1).jpg" alt="Slide 3" />
                        </div>
                    </div>

                </div>
                <div className='content'>
                    <h1>VISIT-CHITTORGARH</h1>
                    <h2>Welcome to chittorgarh</h2>
                    <h3>The Place of Glory</h3>
                    <button onClick={() => navigate('/tour')} >Explore</button>
                </div>
            </div>
        </>
    );
};

export default Home;
