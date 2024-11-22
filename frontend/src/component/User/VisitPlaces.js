import React from 'react'
import { useNavigate } from 'react-router-dom'

const VisitPlaces = ({ data }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='visitplace'>
                <div className='img'> <img src={data?.img} alt="" /> </div>
                <div className='data'>
                    <h3>{data?.tital}</h3>
                    <span> {data?.discription} </span>
                    <button onClick={() => navigate(`/tour/${data?.url}`)}>VISIT</button>
                </div>

            </div>
        </>
    )
}

export default VisitPlaces
