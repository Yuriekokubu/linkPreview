import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { API } from '../config';
import MaterialNavbar from '../componenets/MaterialNavbar';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { isNull } from 'lodash';

const Edit = ({ match }) => {
  const [values, setValues] = useState({
    web_id: '',
    web_name: '',
    web_url: '',
    web_details: '',
    files: [],
    fileUpdate: '',
    zips: [],
    zipUpdate: '',
  });

  const [zip, setZip] = useState([]);
  const [deleteZip, setDeleteZip] = useState([]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [deleteFiles, setdeleteFiles] = useState([]);

  const {
    web_id,
    web_name,
    web_details,
    web_url,
    files,
    fileUpdate,
    zips,
    zipUpdate,
  } = values;

  const submitForm = async (e) => {
    e.preventDefault();
    await Axios.put(`${API}/update`, values).then((data) => {
      toast.dark('Upload Successful');
      setTimeout(window.location.reload(), 1500);
      setTimeout(init(), 1500);
    });

    if (fileUpdate.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < values.fileUpdate.length; i++) {
        formData.append('fileUpdate', values.fileUpdate[i]);
      }
      formData.append('webId', web_id);
      await Axios.post(`${API}/imageUpdate`, formData).then((data) => {
        init();
      });
    }
    if (zipUpdate.length > 0) {
      const formDataZip = new FormData();
      for (let i = 0; i < values.zipUpdate.length; i++) {
        formDataZip.append('zipUpdate', values.zipUpdate[i]);
      }
      formDataZip.append('webId', web_id);
      await Axios.post(`${API}/zipUpdate`, formDataZip).then((data) => {
        init();
      });
    }
    if (deleteFiles.length > 0) {
      await Axios.post(`${API}/deleteImage`, {
        deleteFiles,
      }).then((data) => {});
    }
    if (deleteZip.length > 0) {
      await Axios.post(`${API}/deleteZip`, { deleteZip }).then((data) => {});
    }
  };

  const handleFiles = (event) => {
    event.preventDefault();
    setValues({ ...values, fileUpdate: event.target.files });
    const total_file = document.getElementById('image').files.length;
    for (let i = 0; i < total_file; i++) {
      const img = document.createElement('img');
      img.setAttribute('id', 'imgPre');
      img.style.width = '150px';
      img.src = URL.createObjectURL(event.target.files[i]);
      const imgId = document.getElementById('image_preview');
      imgId.appendChild(img);
    }
    console.log(fileUpdate);
  };

  const handleZips = (event) => {
    event.preventDefault();
    setValues({ ...values, zipUpdate: event.target.files });
  };

  const init = async () => {
    const webId = match.params.webId;

    await Axios.post(`${API}/data`, { web_id: webId }).then((result) => {
      const { data } = result;
      const [{ web_id, web_name, web_url, web_details }] = data;
      const imageArray = [];
      data.map((image) => {
        imageArray.push(image.img_path);
      });

      const zipArray = [];
      data.map((zip) => {
        zipArray.push(zip.zip_path);
      });

      const imageSet = [...new Set(imageArray)];
      const zipSet = [...new Set(zipArray)];

      console.log(zipSet);

      setValues({
        ...values,
        web_id,
        web_name,
        web_url,
        web_details,
        files: imageSet,
        fileUpdate: '',
        zips: zipSet.filter((zip) => zip != null),
      });
    });
  };

  console.log(values);

  const handleFileDelete = (file) => {
    const index = files.indexOf(file);
    deleteFiles.push(file);
    if (index !== -1) {
      files.splice(index, 1);
    }
    console.log(deleteFiles);

    // const d = document.getElementById(file);
    // d.parentNode.removeChild(d);
    setValues({ ...values, files: files });
  };

  const handleZipDelete = (zipFile) => {
    const index = zips.indexOf(zipFile);
    deleteZip.push(zipFile);
    if (index !== -1) {
      zips.splice(index, 1);
    }
    console.log(zips);
    console.log(deleteZip);
    setValues({ ...values, zips: zips });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <MaterialNavbar />
      <div className="m-4">
        <div className="row">
          <div className="col-md-5">
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  ไอดีเว็บ
                </label>
                <input
                  type="text"
                  disabled
                  name="w_name"
                  id="w_name"
                  className="form-control"
                  value={web_id}
                />
              </div>
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
                  onChange={handleZips}
                  accept=".zip,.rar,.7zip"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
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
                    setValues({
                      ...values,
                      web_details: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <input
                className="btn btn-success"
                style={{ marginRight: '5px' }}
                value="อัพเดต"
                type="submit"
              />
              <Link to="/preview">
                <button className="btn btn-primary">ดูข้อมูลทั้งหมด</button>
              </Link>
            </form>
          </div>
          <div id="image_preview" className="col-md-7 mt-3">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Image" {...a11yProps(0)} />
                  <Tab label="Zip" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div className="m-5">
                  {files[0] !== null ? (
                    <>
                      {files.map((f, i) => (
                        <>
                          <div
                            className="ml-2"
                            style={{
                              position: 'relative',
                              display: 'inline-block',
                            }}
                          >
                            <div
                              className="deleteImg"
                              id={f}
                              onClick={() => handleFileDelete(f)}
                              style={{
                                position: 'absolute',
                                backgroundColor: 'orange',
                                width: '25px',
                                right: '0',
                                color: 'white',
                                textAlign: 'center',
                                marginRight: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              <CloseIcon />
                            </div>
                            <img
                              key={i}
                              id={f}
                              src={`${process.env.PUBLIC_URL}/assets/${f}`}
                              style={{
                                width: '150px',
                                height: '150px',
                              }}
                              className="mr-1 mb-1"
                            />
                          </div>
                        </>
                      ))}
                    </>
                  ) : (
                    <Fragment> </Fragment>
                  )}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="my-3">
                  {zips[0] !== null
                    ? zips.map((z, i) => (
                        <div
                          key={i}
                          id="zipload"
                          className="zipload text-center mr-2 p-5 mb-2"
                          style={{
                            display: 'inline-block',
                            backgroundColor: 'rgb(249 249 249)',
                            borderRadius: '10px',
                            position: 'relative',
                          }}
                        >
                          <div
                            id={z}
                            className="deleteImg"
                            onClick={() => handleZipDelete(z)}
                            style={{
                              position: 'absolute',
                              backgroundColor: 'orange',
                              width: '25px',
                              top: 0,
                              right: '0',
                              color: 'white',
                              textAlign: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <CloseIcon />
                          </div>
                          <img
                            src={`${process.env.PUBLIC_URL}/icons/zip.svg`}
                            style={{ maxWidth: '50px' }}
                            onClick={() =>
                              window.open(`${process.env.PUBLIC_URL}/zip/${z}`)
                            }
                            type="submit"
                          />
                          <h6
                            className="mt-2"
                            style={{ display: 'inline-block' }}
                          >
                            {z.slice(0, 10).toLowerCase()}
                          </h6>
                        </div>
                      ))
                    : 'ไม่มีการอัพโหลด'}
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
