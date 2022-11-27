import React from 'react'
import './Card.css'
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function Card({ data, handleDelete, ob, fetchTrigger, setfetchTrigger }) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const random = Math.ceil(Math.random() * 5);
    const handlePublish = async (id) => {
        try {
            let start = new Date();
            let end = new Date(new Date().getFullYear(), 11, 31);

            let response = await axios.put(`http://localhost:5005/listings/publish/${id}`, {
                "availability": [
                    { start: start, end: end }
                ]
            }, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });

            if (response.status === 200) {
                setfetchTrigger(fetchTrigger + 1);
            }
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.error);
        }
    }


    const handleUnpublish = async (id) => {
        try {

            let response = await axios.put(`http://localhost:5005/listings/unpublish/${id}`, {}, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });

            if (response.status === 200) {
                setfetchTrigger(fetchTrigger + 1);
            }
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.error);
        }
    }
    return (
        <div className='card'>
            <img src={data.thumbnail} alt="" />
            <div className="card__info">
                <h2>{data.title}</h2>
                <h2>{"$ " + data.price}</h2>
                <div style={{display:'flex'}}>
                    {
                        Array(random).fill().map((_, i) => (<div style={{marginRight:'2px'}}>⭐</div>))
                    }

                </div>
             
                <span style={{ fontSize: '12px' }}>{data.address.line1}</span><br />
                <span style={{ fontSize: '12px' }}>{data.address.line2}</span><br />
                <span style={{ fontSize: '12px' }}>{data.address.line3}</span><br />
                {
                    data.control && <div ><Button onClick={() => { localStorage.setItem('listing', data.id.toString()); navigate('/editListing') }} style={{ margin: '5px', backgroundColor: 'grey', color: 'white' }}>编辑</Button>
                        <Button onClick={() => { handleDelete(data.id) }} style={{ margin: '5px', backgroundColor: 'grey', color: 'white' }}>Delete</Button>
                        {!ob[data.id]?.published && <Button onClick={() => { handlePublish(data.id) }} style={{ margin: '5px', backgroundColor: 'grey', color: 'white' }}>发布</Button>}
                        {ob[data.id]?.published && <Button onClick={() => { handleUnpublish(data.id) }} style={{ margin: '5px', backgroundColor: 'grey', color: 'white' }}>取消发布</Button>}
                    </div>}
                {
                    !data.control && <Button variant="outlined" style={{ marginTop: '5px', backgroundColor: 'grey', color: 'white' }} onClick={() => {
                        localStorage.setItem('id', data.id);
                        navigate('/book');

                    }}>选定</Button>
                }


            </div>
        </div>
    )
}

export default Card
