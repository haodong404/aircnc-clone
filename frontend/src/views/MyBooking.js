import React, { useState, useEffect } from 'react'
import BCard from '../components/BCard'
import axios from 'axios';

function MyBooking() {
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token');
    const [bookings, setbookings] = useState([]);
    const [fetchTrigger, setfetchTrigger] = useState(0);
    const [data, setdata] = useState({});

    useEffect(() => {
        const fn = async () => {
            try {
                let res = await axios.get(`http://localhost:5005/bookings`, {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                })
                if (res.status === 200) {
                    console.log(res.data.bookings);
                    let dd = {}
                    let ll=[]
                    await Promise.all(res.data.bookings.map(async (e, i) => {
                        let res = await axios.get(`http://localhost:5005/listings/${e.listingId}`);
                        if (res.status === 200) {
                            if (res.data.listing.owner === name) {
                                dd[e.listingId] = res.data.listing;
                                ll.push(e);
                            }
                        }
                    }));
                    setdata({...dd})
                    setbookings([...ll]);
                }

            } catch (e) {
                console.error(e);
                alert(e?.response?.data?.error);
            }
        }
        fn();
    }, [fetchTrigger])

    const handleAccept = async (bookingId) => {
        try {
            let res = await axios.put(`http://localhost:5005/bookings/accept/${bookingId}`, {}, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            if (res.status === 200) {
                setfetchTrigger(fetchTrigger+1);
            }
        } catch (e) {
            console.log(e);
            alert(e?.response?.data?.error);
        }
    }

    const handleDecline = async (bookingId) => {
        try {
            let res = await axios.put(`http://localhost:5005/bookings/decline/${bookingId}`,{}, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            if (res.status === 200) {
                setfetchTrigger(fetchTrigger+1);
            }
        } catch (e) {
            console.log(e);
            alert(e?.response?.data?.error);
        }
    }

    const handleDelete = async (bookingId) => {
        try {
            let res = await axios.delete(`http://localhost:5005/bookings/${bookingId}`,{},
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            if (res.status === 200) {
                setfetchTrigger(fetchTrigger+1);
            }
        } catch (e) {
            console.log(e);
            alert(e?.response?.data?.error);
        }
    }

    return (

        <div style={{ marginTop: "100px" }}>
            {bookings.map((e, i) => {
                return (<BCard key={i} booking={e} data={data} handleAccept={handleAccept} handleDecline={handleDecline} handleDelete={handleDelete} />)
            })}
        </div>

    )
}

export default MyBooking
