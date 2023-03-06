import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Motw from '../components/Motw';

const mainFeaturedPost = {
    title: 'Meal of the Week',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
    
};

function TestPage() {
    return (
        <Motw post={mainFeaturedPost} />
    )
};

export default TestPage;