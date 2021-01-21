import React, { useEffect, useState } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import Axios from 'axios';
import { API } from '../config';
import MaterialNavbar from '../componenets/MaterialNavbar';

const Image = ({ match }) => {
  const [image, setImage] = useState([]);

  const init = () => {
    const id = match.params.webId;
    Axios.post(`${API}/image`, { web_id: id }).then((result) => {
      setImage(result.data);
      console.log(image);
    });
  };

  useEffect(() => {
    init();
    console.log(image);
  }, []);
  return (
    <>
      <MaterialNavbar />
      <div className="container p-5">
        {image && <h4>จำนวนรูปทั้งหมด : {image && image.length}</h4>}
        <SimpleReactLightbox>
          <SRLWrapper>
            {image.map((i) => (
              <a href={`${process.env.PUBLIC_URL}/assets/${i.img_path}`}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/${i.img_path}`}
                  alt={i.img_id}
                  style={{
                    maxWidth: '300px',
                    height: '300px',
                    borderRadius: '10px',
                  }}
                  className="card card-1 m-3"
                />
              </a>
            ))}
          </SRLWrapper>
        </SimpleReactLightbox>
        {console.log(image)}
      </div>
    </>
  );
};

export default Image;
