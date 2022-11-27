import React, { useState, useRef } from "react";
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
    amenities: "",
    img1: "",
    img2: "",
    img3: "",
    metadata: {}
}



function AddProperty() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(emptyListing);
    const ref = useRef(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let ls = []
        if(formValues.img1) {
            ls.push(formValues.img1);
        }
        if(formValues.img2) {
            ls.push(formValues.img2);
        }
        if(formValues.img3) {
            ls.push(formValues.img3);
        }
        let data = {
            title: formValues.title,
            price: formValues.price,
            address: {
                line1: formValues.addressLine1,
                line2: formValues.addressLine2,
                line3: formValues.addressLine3
            },
            thumbnail: formValues.thumbnail,
            metadata: { bedrooms: formValues.bedrooms, beds: formValues.beds, bathrooms: formValues.bathrooms, amenities: formValues.amenities, imgs: ls},
        };
        try {
            let response = await axios.post(`http://localhost:5005/listings/new`, data, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            if (response.status === 200) {
                setFormValues({ ...emptyListing });
                e.target.reset();
                navigate("/myProperties");
            }

        } catch (e) {
            console.error(e);
            alert(e.response.data.error);
        }

    }

    return (
        <Container component="main" maxWidth="md" >
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
                    style={{ backgroundColor: 'rgba(222,222,222)' }}
                >

                    <TextField
                        id="title-input"
                        name="title"
                        label="Title"
                        type="text"
                        value={formValues.title}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="thumbnail-input"
                        name="thumbnail"
                        label="Thumbnail"
                        type="text"
                        value={formValues.thumbnail}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        name="amenities"
                        label="Amenities"
                        multiline
                        rows={3}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="thumbnail-input"
                        name="img1"
                        label="Image"
                        type="text"
                        value={formValues.img1}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="thumbnail-input"
                        name="img2"
                        label="Image"
                        type="text"
                        value={formValues.img2}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="thumbnail-input"
                        name="img3"
                        label="Image"
                        type="text"
                        value={formValues.img3}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="price-input"
                        name="price"
                        label="Price"
                        type="number"
                        value={formValues.price}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="bedrooms-input"
                        name="bedrooms"
                        label="Bedrooms"
                        type="number"
                        value={formValues.bedrooms}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="bedrooms-input"
                        name="beds"
                        label="Beds"
                        type="number"
                        value={formValues.beds}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="bathrooms-input"
                        name="bathrooms"
                        label="Bathrooms"
                        type="number"
                        value={formValues.bathrooms}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <h4>Address</h4>
                    <TextField
                        id="addressLine1-input"
                        name="addressLine1"
                        label="Line 1"
                        type="text"
                        value={formValues.addressLine1}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="addressLine2-input"
                        name="addressLine2"
                        label="Line 2"
                        type="text"
                        value={formValues.addressLine2}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <TextField
                        id="addressLine3-input"
                        name="addressLine3"
                        label="Line 3"
                        type="text"
                        value={formValues.addressLine3}
                        onChange={handleInputChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <Button variant="contained" type="submit" style={{ backgroundColor: 'grey' }}>
                        Submit
                    </Button>


                </Box>
            </form>
        </Container>
    )
}

export default AddProperty
