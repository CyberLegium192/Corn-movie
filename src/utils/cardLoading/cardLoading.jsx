import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useState, useEffect, useRef} from 'react'

const CardLoading = () => {
  
  return (
    <>
      <Skeleton animation="wave" width={150} height={220} style={{borderRadius:
      '8px'}}/>
    </>
  )
}


export default CardLoading