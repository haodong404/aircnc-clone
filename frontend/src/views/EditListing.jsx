import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";



const emptyListing = {
    title: "",
    price: 0,
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    thumbnail: "",
    metadata: {}
}

function EditListings(data) {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('listing');
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(emptyListing);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            title: formValues.title,
            price: formValues.price,
            address: {
                line1: formValues.addressLine1,
                line2: formValues.addressLine2,
                line3: formValues.addressLine3
            },
            thumbnail: formValues.thumbnail,
            metadata: { bedrooms: formValues.bedrooms, beds: formValues.beds, bathrooms: formValues.bathrooms },
        };
        try {
            console.log(id)
            let response = await axios.put(`http://localhost:5005/listings/${id}`, data, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            if (response.status === 200) {
                setFormValues({ ...emptyListing });
                e.target.reset();
                navigate("/myListings");
            }

        } catch (e) {
            console.error(e);
            alert(e.response.data.error);
        }

    }
    useEffect(() => {
        const fn = async () => {
            
            let res = await axios.get(`http://localhost:5005/listings/${id}`);
            if (res.status === 200) {
                let listing = res.data.listing;
                let ob = {
                    title: listing.title,
                    price: listing.price,
                    addressLine1: listing.address?.line1,
                    addressLine2: listing.address?.line2,
                    addressLine3: listing.address?.line3,
                    bedrooms: listing?.metadata?.bedrooms,
                    beds: listing?.metadata?.beds,
                    bathrooms: listing?.metadata?.bathrooms,
                    thumbnail: listing?.thumbnail,
                    metadata: {}
                };
                setFormValues({...ob})
            }

            
        }
        fn();
    }, [])

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        marginTop: 8,
                        padding: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        
                    }}
                    style={{backgroundColor: 'rgba(222,222,222)'}}
                >

                    <TextField
                        id="title-input"
                        name="title"
                        label="标题"
                        type="text"
                        value={formValues.title}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="thumbnail-input"
                        name="thumbnail"
                        label="缩略图"
                        type="text"
                        value={formValues.thumbnail}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="price-input"
                        name="price"
                        label="价格"
                        type="number"
                        value={formValues.price}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="bedrooms-input"
                        name="bedrooms"
                        label="房间数"
                        type="number"
                        value={formValues.bedrooms}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="bedrooms-input"
                        name="beds"
                        label="床位数"
                        type="number"
                        value={formValues.beds}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="bathrooms-input"
                        name="bathrooms"
                        label="卫生间个数"
                        type="number"
                        value={formValues.bathrooms}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <h4>Address</h4>
                    <TextField
                        id="addressLine1-input"
                        name="addressLine1"
                        label="地址1"
                        type="text"
                        value={formValues.addressLine1}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="addressLine2-input"
                        name="addressLine2"
                        label="地址2"
                        type="text"
                        value={formValues.addressLine2}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="addressLine3-input"
                        name="addressLine3"
                        label="地址3"
                        type="text"
                        value={formValues.addressLine3}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <Button variant="contained" style={{backgroundColor: "grey"}} type="submit">
                        提交
                    </Button>


                </Box>
            </form>
        </Container>
    )
}

export default EditListings
