import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

function Subcategory() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const [data1, setdata1] = useState([]);
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [videolink, setvideolink] = useState("");
  const [search, setsearch] = useState("");
  const [subcatvideo, setsubcatvideo] = useState("");
  const [subcategoryImg, setsubcategoryImg] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);

  const [category1, setcategory1] = useState(data.category);
  const [subcategory1, setsubcategory1] = useState(data.subcategory);
  const [subcatimg1, setsubimg1] = useState(data.subcatimg);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const formdata = new FormData();
  const apiURL = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getcategory();
    getsubcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/getcategory");
    if ((res.status = 200)) {
      setdata1(res.data?.category);
      console.log(res.data?.category);
    }
  };
  const postsubcategory = async (e) => {
    e.preventDefault();

    if (!category || !subcategory || !subcategoryImg) {
      alert("Please Select all fields");
    } else {
      formdata.append("category", category);
      formdata.append("subcategory", subcategory);
      formdata.append("subcatimg", subcategoryImg);
      formdata.append("subcatvideo", subcatvideo);

      try {
        const config = {
          url: "/userapp/addappsubcat",
          method: "post",
          baseURL: "http://api.vijayhomeservicebengaluru.in/api",
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };
  const getsubcategory = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      console.log(res);
      setsubcategorydata(res.data?.subcategory);
      setfilterdata(res.data?.subcategory);
    }
  };

  const editservices = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/userapp/editappsubcat/${data._id}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: {
          category: category1,
          subcategory: subcategory1,
          subcatimg: subcatimg1,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category ",
      selector: (row) => row.category,
    },
    {
      name: "Subcategory  ",
      selector: (row) => row.subcategory,
    },
    {
      name: "Subcategory image",
      cell: (row) => (
        <div>
          <img
            className="header_logo"
            src={`http://api.vijayhomeservicebengaluru.in/subcat/${row.subcatimg}`}
            width={"50px"}
            height={"50px"}
          />
        </div>
      ),
    },
    {
      name: "Subcategory video",
      cell: (row) => (
        <div>
         
          <video width="250" height="150" controls>
            <source
              src={`http://api.vijayhomeservicebengaluru.in/subcat/${row.subcatvideo}`}
              type="video/mp4"
            />
          </video>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteservices(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setdata(data);
    handleShow(true);
  };
  useEffect(() => {
    const result = subcategorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);
  let i = 0;

  const deleteservices = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/userapp/deleteappsubcat/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>Subcategory</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                {/* <div className="vhs-sub-heading pb-2">Add New Record</div> */}
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="vhs-input-label">
                        Category <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {data1.map((i) => (
                            <option value={i.category}>{i.category}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="vhs-input-label">
                        Subcategory <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="vhs-input-value col-md-12"
                          onChange={(e) => setsubcategory(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="vhs-input-label">Subcategory Image</div>
                      <div className="group pt-1">
                        <input
                          type="file"
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setsubcategoryImg(e.target.files[0])}
                        />
                          <p style={{fontSize:"12px"}}><b>Width:50px ,Height:50px</b></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-4">
                    <div className="vhs-input-label">Subcategory Video</div>
                    <div className="group pt-1">
                      <input
                        type="file"
                        accept="video/*"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setsubcatvideo(e.target.files[0])}
                      />
                    </div>
                    <p className="mt-2">         <b>Note:Width= 400px ,Height:200px and mp4 format</b> </p>
            
                  </div>
                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className="vhs-button" onClick={postsubcategory}>
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-5">
              <input
                type="text"
                placeholder="Search here.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="mt-1 border">
              <DataTable
                columns={columns}
                data={filterdata}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className="vhs-input-label">
                    Category <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory1(e.target.value)}
                      >
                        <option value={data.category}>{data.category}</option>
                        {data1.map((item) => (
                          <option value={item.category}>{item.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className="vhs-input-label">
                    Service name <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setsubcategory1(e.target.value)}
                      placeholder={data.subcategory}
                    />
                  </div>
                </div>
                <div className="col-md-12 m-4">
                  <div className="vhs-input-label">
                    Subcategory image <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="file"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setsubimg1(e.target.files[0])}
                 
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editservices}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Subcategory;
