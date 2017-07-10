import React from 'react';
import ReactDOM from 'react-dom';
import PodGallery from './PodGallery';
const galleryContainer = document.querySelector('.gallery-container');

// Let's render the whole thing
ReactDOM.render(
    <PodGallery />
    , galleryContainer);