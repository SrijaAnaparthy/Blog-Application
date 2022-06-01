import React from 'react';

export default function EachAd(props)
{
    return(
        <div className='shadow' >
            <div className="card mb-3 me-3" style={{width:'22x0px'}}>
            <div>
                <div>
                <img src={props.ad.adimagesrc} class="img-fluid rounded-start" alt="..." style={{width:'200px',height:'150px'}}></img>
                </div>
                <div>
                <div className="card-body">
                    <h5 className="card-title">{props.ad.title}</h5>
                    <p className="card-text">{props.ad.description}</p>
                    <h5 className="card-text"><small class="text-muted">₹{props.ad.price}</small></h5>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}