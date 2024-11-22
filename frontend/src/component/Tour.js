import React from 'react'
import Navbar from './Navbar'
import VisitPlaces from './User/VisitPlaces'
import { visitPlaceArray } from './content/placeData';

const Tour = () => {

  return (
    <>
      <Navbar />
      <div className='tour'>
        <div className='placeContainer'>
          {
            visitPlaceArray.map(curElem => (
              <VisitPlaces data={curElem} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Tour
