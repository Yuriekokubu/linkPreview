import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { API } from '../config';
import MaterialNavbar from '../componenets/MaterialNavbar';

const Home = () => {
  const [values, setValues] = useState({
    web_name: '',
    web_url: '',
    web_details: '',
    files: '',
    zip: '',
  });

  const { web_name, web_details, web_url, files, zip } = values;

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const name in values) {
      if (name === 'files') {
        for (let i = 0; i < values.files.length; i++) {
          formData.append(name, values.files[i]);
        }
      }
      if (name === 'zip') {
        for (let i = 0; i < values.zip.length; i++) {
          formData.append(name, values.zip[i]);
        }
      }
      formData.append(name, values[name]);
    }
    Axios.post(`${API}/insert`, formData).then((data) => {
      toast.dark('Upload Successful', { closeOnClick: true, autoClose: 1000 });
    });
    setValues({
      ...values,
      web_name: '',
      web_url: '',
      web_details: '',
      files: '',
    });
    // const preview = document.getElementById('imgPre');
    // for (let i = 0; i < preview.innerHTML.length; i++) {
    //   preview.parentNode.removeChild(preview);
    // }
    // console.log(preview.innerHTML.length);

    // const elem = document.querySelector('#image_preview');
    // elem.parentNode.removeChild(elem);
    // const imgDiv = document.createElement('img');
    // imgDiv.setAttribute('id', 'image_preview');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleFiles = (event) => {
    event.preventDefault();
    const total_file = document.getElementById('image').files.length;
    for (let i = 0; i < total_file; i++) {
      const img = document.createElement('img');
      img.setAttribute('id', 'imgPre');
      img.style.width = '150px';
      img.src = URL.createObjectURL(event.target.files[i]);
      const imgId = document.getElementById('image_preview');
      imgId.appendChild(img);
    }
    setValues({ ...values, files: event.target.files });
    console.log(event.target.files);
  };

  const handleZip = (event) => {
    event.preventDefault();
    setValues({ ...values, zip: event.target.files });
    console.log(event.target.files);
  };

  return (
    <div>
      <MaterialNavbar />
      <div className="container my-5">
        <div id="image_preview" className="d-flex flex-row"></div>
        <form onSubmit={submitForm} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              ชื่อเว็บไซต์
            </label>
            <input
              type="text"
              name="w_name"
              id="w_name"
              className="form-control"
              value={web_name}
              required
              onChange={(e) =>
                setValues({ ...values, web_name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLinkURL" className="form-label">
              Link URL
            </label>
            <input
              type="url"
              name="w_url"
              id="w_url"
              className="form-control"
              required
              value={web_url}
              onChange={(e) =>
                setValues({ ...values, web_url: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              รูปภาพ
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              multiple
              onChange={handleFiles}
              accept="image/*"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Zip
            </label>
            <input
              type="file"
              id="zip"
              name="zip"
              className="form-control"
              multiple
              onChange={handleZip}
              accept=".zip,.rar,.7zip"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              คำอธิบาย
            </label>
            <textarea
              input
              type="text"
              name="w_details"
              id="w_details"
              className="form-control"
              required
              value={web_details}
              onChange={(e) =>
                setValues({ ...values, web_details: e.target.value })
              }
            ></textarea>
          </div>
          <input
            className="btn btn-dark"
            style={{ marginRight: '5px' }}
            value="อัพโหลด"
            type="submit"
          />
          <Link to="/preview">
            <button className="btn btn-primary mr-2">ดูข้อมูลทั้งหมด</button>
          </Link>
          <Link to="/" onClick={() => window.location.reload()}>
            <button className="btn btn-danger">ล้าง</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Home;
