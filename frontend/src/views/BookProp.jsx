import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DateComp from '../components/DateComp';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import TextField from "@mui/material/TextField";
import { Paper } from '@mui/material'

function BookProp() {
    const [imgs, setimgs] = useState([]);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const navigate = useNavigate();
    const [listing, setlisting] = useState({review:[]});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setprice] = useState(0);
    const [rating, setrating] = useState("")
    const random = Math.ceil(Math.random() * 5);

    const handleBooking = async () => {
        try {
            const diffTime = Math.abs(startDate - endDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const res = await axios.post(`http://localhost:5005/bookings/new/${id}`,
                {
                    "dateRange": { start: startDate, end: endDate },
                    "totalPrice": diffDays * listing.price
                }, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            if (res.status === 200) {
                navigate('/myBooking');
            }

        }

        catch (e) {
            console.error(e);
            alert(e.response.data.error);
        }

    }

    const handleInputChange = (e) => {
        const r = e.target.value;
        setrating(r);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let l = listing;
            let ob = {
                text: rating
            };
            l.reviews.push(ob);
            setlisting({...l});
            setrating("");
            // const response = await axios.put(`http://localhost:5005/listings/{listingid}/review/{bookingid}`)
        } catch(err) {
            console.error(err);
            alert(err?.response?.data?.error);
        }

    }

    useEffect(() => {
        console.log('booknjsdksvdjsnvdjsnvkjdnskj')
        const fn = async () => {
            console.log(id);
            try {
                let res = await axios.get(`http://localhost:5005/listings/${id}`);
                console.log(res)
                if (res.status == 200) {
                    setlisting({ ...res.data.listing });
                    setprice(res.data.listing.price);
                    let ls = [];
                    ls.push(res.data.listing.thumbnail);
                    if( res.data.listing.metadata.imgs){
                        ls = [...ls, ...res.data.listing.metadata?.imgs];
                    }
                    setimgs([...ls])
                }


            } catch (e) {
                console.error(e);
                alert(e?.response?.data?.error);
            }
        }
        fn();

    }, []);

    useEffect(() => {
        const diffTime = Math.abs(startDate - endDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setprice(listing.price * diffDays);
    }, [startDate, endDate]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgb(222,222,222)', height: '200%' }}>
                {/* picture */}
                <Carousel >
            {
                imgs.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
                
                <div >
                    {/* Title */}
                    <h1 style={{ marginLeft: "50px" }}>{listing.title}</h1>
                    <div style={{display:'flex',marginLeft: "50px"}}>
                    {
                        Array(random).fill().map((_, i) => (<div style={{marginRight:'2px'}}>⭐</div>))
                    }

                </div>
                    <h2 style={{ marginLeft: "50px" }}>{listing.postedOn}</h2>
                    {/* Price */}
                    <h2 style={{ marginLeft: "50px" }}>{"$ " + price}</h2>
                </div>

                <div style={{ marginLeft: "50px", border: '2px solid gray', width: '500px', padding: '10px' }}>
                    <p>{listing?.address?.line1}</p>
                    <p>{listing?.address?.line2}</p>
                    <p>{listing?.address?.line3}</p>
                </div>

                {/* Bedroom */}
                <h4 style={{ marginLeft: "50px" }}>客房数: {listing?.metadata?.bedrooms}</h4>
                <h4 style={{ marginLeft: "50px" }}>床位数: {listing?.metadata?.bathrooms}</h4>
                <h4 style={{ marginLeft: "50px" }}>卫生间数: {listing?.metadata?.bathrooms}</h4>
                <p style={{ marginLeft: "50px" }}>{"设施: "+listing?.metadata?.amenities}</p>
                <h3 style={{ marginLeft: "50px" }}> 评论</h3>
                
                {listing?.reviews?.length > 0 &&<div style={{marginLeft:'50px', marginBottom:'10px'}}>
                    {listing.reviews.map((r, i)=>{
                        return <p key={i} style={{margin:'5px'}}>{"•  "+r.text}</p>
                    })}
                </div>}
                <form onSubmit={handleSubmit} style={{marginLeft:'50px'}}>
                

                    <TextField
                        id="title-input"
                        name="rating"
                        label="写下你的评价"
                        type="text"
                        multiline
                        rows={3}
                        value={rating}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" , width:'60%'}}
                    />
                    <Button variant="contained" type="submit" style={{ backgroundColor: 'grey', marginLeft: '10px' }}>
                        提交
                    </Button>
                    
                 </form>

                <div style={{ width: '200px', marginLeft: '50px', display: 'flex', height: "50px", width: "200px" }}>
                    <DateComp style={{ zIndex: '100' }} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
                    {listing.published ? <Button style={{ backgroundColor: 'red', marginLeft: '10px', borderRadius: "10px", color: 'white' }} variant="outlined" onClick={() => {
                        handleBooking()
                        navigate('/myBooking');
                    }} >订购</Button> : <tagg style={{ marginLeft: '10px' }}>还未发布</tagg>}
                </div>


            </div>
            <div style={{ height: '500px', background: 'rgb(222,222,222)' }}></div></>
    )
}

function Item(props)
{
    return (
     <div>
            <img src={props.item} alt="" style={{ align: 'center', marginLeft: 'auto', marginRight: 'auto', width: "70%", height: "500px", paddingLeft:'200px' }} />
            </div>

    )
}

export default BookProp
