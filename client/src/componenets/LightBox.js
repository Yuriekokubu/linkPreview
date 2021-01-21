import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Axios from 'axios';
import { API } from '../config';

const LightboxExample = ({ img, webId }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState([]);
  const images = [`${process.env.PUBLIC_URL}/assets/${img}`];

  const init = () => {
    Axios.post(`${API}/image`, { web_id: webId }).then((result) => {
      setImage(result.data);
    });
  };

  image.map((p) => {
    let imgpath = `${process.env.PUBLIC_URL}/assets/${p.img_path}`;
    images.push(imgpath);
  });

  const images2 = [...new Set(images)];

  useEffect(() => {
    init();
    setPhotoIndex(0);
  }, []);

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/${img}`}
        style={{ width: '50px' }}
        type="button"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <Lightbox
          mainSrc={images2[photoIndex]}
          nextSrc={images2[(photoIndex + 1) % images2.length]}
          prevSrc={images2[(photoIndex + images2.length - 1) % images2.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images2.length - 1) % images2.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images2.length)
          }
        />
      )}
    </div>
  );
};

export default LightboxExample;
