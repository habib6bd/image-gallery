// import React, { useState } from 'react';
import GalleryData from '../../galleryData.json';
import './Gallery.css';
const Gallery = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Image Gallery</h1>
      {/* <img src="/src/assets/images/image-1.webp" alt="" /> */}
      <div>
        {
          GalleryData.map( data => {
            console.log(data);
                return(
                    <div className="image-gallery" key={data.id}>
                        <div className="feature-image">
                        {/* <img src={data.src} alt="" /> */}
                        </div>
                        <div className="other-images">
                        <img src={data.src} alt="" />
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
};

export default Gallery;
