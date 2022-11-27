import React from 'react';
import './Landing.css';
import Banner from '../components/Banner'
import Login from './Login';
import Card1 from '../components/Card1';

function Landing({user, dispatch}) {
    return (
        <div>
        <div className='home'>
            <Banner/>
            <div className='home__section'>
            <Card1
                src="https://d2np4vr8r37sds.cloudfront.net/article/11608-bildrhgelj-1573131823.jpg"
                title="Luxury Stays"
                description="Find peace of mind in the most luxurious appartments. We are waiting for your warm presence."
            />
            
            <Card1 
                src="https://d2np4vr8r37sds.cloudfront.net/kqtbcbecse-1573129595.jpg"
                title="Family Homes"
                description="Private stays for your lovely family"
            />
            <Card1 
                src="https://d2np4vr8r37sds.cloudfront.net/vhnuwpbmeq-1573113664.jpg"
                title="Unique stays"
                description="Spaces designed for casual as well as formal occasions. Whatever you need we have it!"
            />
            </div>
            <div className='home__section1'>
                <Card1 
                    src="https://d2np4vr8r37sds.cloudfront.net/article/13514-agikkqowre-1633604806.jpeg"
                    title="The blue Bournemouth penthouse"
                    description="Come near the beachside
                    in Sunny weather"
                    price="$200/night"
                />
                <Card1 
                    src="https://d2np4vr8r37sds.cloudfront.net/rbmhpejdiu-1633410939.png"
                    title="Castle green in Autumn Palace"
                    description="Come and be a part of green castles stunning penthouse"
                     price="$450/night"
                />
                <Card1 
                    src="https://d2np4vr8r37sds.cloudfront.net/szrjuzyfyw-1633410911.png"
                    title="A beautifiul wood"
                    description="Enjoy the beautiful sights and amenities"
                    price="$670/night"
                />
            </div>
        </div>
        </div>
    )
}

export default Landing

