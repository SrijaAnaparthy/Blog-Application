import React from "react";
import EachAd from '../Ads/EachAd/EachAd';
import {getads} from '../../features/ads/AdsSlice';
import { useDispatch,useSelector } from 'react-redux';

export default function SponseredAds()
{
    const dispatch=useDispatch();
    const ads=useSelector((state)=>{return state.AdsReducer.ads[0]})
    React.useEffect(()=>{
        dispatch(getads())
    },[]);
    return(
        <div>
            {
             ads&& ads.map((ad,i)=>{
                if(ad.user!=localStorage.getItem('user'))
                    {
                         return(
                            <div className='mb-4'>
                               <EachAd ad={ad} adindex={i}/>
                               </div>
                            )
                        }
                    })
                }
        </div>
    )
}