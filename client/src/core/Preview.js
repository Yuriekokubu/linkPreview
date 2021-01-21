import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { API } from '../config';
import { toast } from 'react-toastify';
import Modal from '../componenets/Modal';
import { Grid, _ } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import MaterialNavbar from '../componenets/MaterialNavbar';
import LightBox from '../componenets/LightBox';

const Preview = () => {
  const [dataRow, setdataRow] = useState([]);
  const [image, setImage] = useState([]);

  const init = () => {
    Axios.get(`${API}/list`).then((result) => {
      setdataRow(result.data);
    });
    Axios.get(`${API}/image`).then((result) => {
      setImage(result.data);
    });
  };

  const gotoURL = (url) => {
    window.open(url);
  };

  console.log(dataRow);

  const handleDelete = (link) => {
    Axios.delete(`${API}/delete`, { data: { deleteId: link } }).then((data) => {
      console.log(link);
      toast.success('Delete Successful', {
        closeOnClick: true,
        duration: 1500,
      });
      init();
    });
  };

  const dataArray = [];
  dataRow.map((e) => {
    dataArray.push([
      e.web_id,
      _(
        <LightBox img={e.img_path} webId={e.web_id} />
        // e.img_path ? (
        //   <a href={`/image/${e.web_id}`}>
        //     <img
        //       src={`${process.env.PUBLIC_URL}/assets/${e.img_path}`}
        //       style={{ width: '50px' }}
        //     />
        //   </a>
        // ) : (
        //   'ไม่มีรูปแสดง'
        // )
      ),
      e.web_name.slice(0, 20),
      e.web_url.slice(0, 30),
      e.web_details.slice(0, 30),
      moment(e.timestamp).format('lll'),
      _(
        e.zip_path !== null ? (
          <img
            style={{ width: '30px' }}
            src={`${process.env.PUBLIC_URL}/icons/zip.svg`}
            onClick={() =>
              window.open(`${process.env.PUBLIC_URL}/zip/${e.zip_path}`)
            }
            type="submit"
          />
        ) : (
          'No'
        )
      ),
      _(
        <div className="ml-1">
          <button
            onClick={() => gotoURL(e.web_url)}
            className="btn btn-success p-1"
          >
            <i className="fas fa-external-link-alt"></i>
          </button>
          <a href={`/image/${e.web_id}`}>
            <button className="btn btn-warning  p-1">
              <i className="fas fa-clone"></i>
            </button>
          </a>
          <a href={`/edit/${e.web_id}`}>
            <button className="btn btn-primary  p-1">
              <i className="fas fa-pen"></i>
            </button>
          </a>
          <Modal
            deleteLink={handleDelete}
            LinkId={e.web_id}
            linkName={e.web_name}
          >
            <button className="btn btn-danger  p-1">
              <i className="fas fa-times"></i>
            </button>
          </Modal>
        </div>
      ),
    ]);
  });

  // const data = {
  //   columns: [
  //     { label: 'id', field: 'web_id', sort: 'asc' },
  //     { label: 'name', field: 'web_name', sort: 'asc' },
  //     { label: 'url', field: 'web_url', sort: 'asc' },
  //     { label: 'details', field: 'web_details', sort: 'asc' },
  //     { label: 'createdAt', field: 'createdAt', sort: 'asc', width: 150 },
  //     { label: 'Action', field: 'action', sort: 'asc' },
  //   ],
  //   rows: dataArray,
  // };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <MaterialNavbar />
      <div className="m-2">
        {/* <MDBDataTable
        className="mt-5"
        striped
        bordered
        small
        data={data}
        responsive={true}
      /> */}
        <Grid
          data={dataArray}
          columns={[
            'id',
            'image',
            'name',
            'url',
            'details',
            'createdAt',
            'Zip',
            'Action',
          ]}
          search={true}
          sort={true}
          fixedHeader={true}
          pagination={{ enabled: true, limit: 10 }}
          style={{ margin: '0 auto' }}
        />
      </div>
    </>
  );
};

export default Preview;
