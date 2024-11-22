import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-brands-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { placeDetailArray } from '../content/placeData'


const PlacePage = () => {

    const [urlLastPart, setUrlLastPart] = useState('');
    const navigate = useNavigate();

    const [places, setPlaces] = useState([]);
    useEffect(() => {
        const currentUrl = window.location.href;
        const urlPrts = currentUrl.split('/');
        const lastpart = urlPrts[urlPrts.length - 1];
        setUrlLastPart(lastpart);
        const matchedPlaces = placeDetailArray.filter(curElem => curElem.url === lastpart);
        setPlaces(matchedPlaces);
    }, [urlLastPart]);



    return (
        <>
            <div className='placemain'>
                <div className='placedatadiv'>
                    {
                        places && places.map(curElem => (
                            <>
                                <div style={{ marginTop: '1vh' }}>
                                    {
                                        curElem?.tital && <h1>{curElem?.tital}</h1>
                                    }
                                    {
                                        curElem?.img && <img src={curElem?.img} alt="" />
                                    }
                                    {
                                        curElem?.map && <iframe src={curElem?.map}
                                            width="100%" height="450"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    }
                                    {
                                        curElem?.history && <>
                                            <h3>History and importance</h3>
                                            <p>{curElem?.history}</p>
                                        </>
                                    }

                                </div>
                            </>
                        ))
                    }
                </div>
                <div className='guide'>
                    <p onClick={() => navigate('/tour')}><FontAwesomeIcon icon={faChevronLeft} /> <span>Back</span></p>
                    <h2>Confirm a tour</h2>
                    <button onClick={() => navigate(`/tour/${urlLastPart}/booking`, { state: urlLastPart })}>Book Guide Now</button>
                </div>
            </div>
        </>
    )
}

export default PlacePage
