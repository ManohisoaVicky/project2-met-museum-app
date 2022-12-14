import React, { useEffect, useState} from 'react'
import DetailedReviews from '../components/DetailedReviews'
import ImageViewer from '../components/ImageViewer'
import { Link, useParams } from 'react-router-dom'

import "../styles/DetailedView.css"

function DetailedView(props) {
  
  const [art, setArt] = useState(null)
  let { id } = useParams();

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()})
            .then((json) => {
                setArt(() => (json))
            })
            .catch((error) => (console.error))
    }, [ id ])

  return (
    <div className="DetailedView" key={props.objectID}>
      <Link to="/library">
        <span className="material-symbols-outlined close">close</span>
      </Link>
      {art ?
      <div className='top'>
        <div className='DetailedInfo'>
          <h1>{art.title}</h1>
          <h2>{art.artistDisplayName}</h2>
          <h3>{art.culture}</h3>
          <p>{art.objectDate}</p>
        </div>
        <ImageViewer art={art} />
      </div>
    : <div>Loading . . .</div>}
      <DetailedReviews reviews={props.reviews} setReviews={props.setReviews} art={art}/>
    </div> 

  )
}

export default DetailedView