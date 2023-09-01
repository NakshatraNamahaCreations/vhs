import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Sidenav from "./Sidenav";
import Header from "./Header";

function Category() {
  const [category, setcategory] = useState("");
  const [categoryImg, setcategoryImg] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [subcategorydata, setsetsubcategorydata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [category1, setcategory1] = useState(data.category);
  const [categoryImg1, setcategoryImg1] = useState(data.categoryImg);

 
  
  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postcategory = async (e) => {
    e.preventDefault();
    if (!category || !categoryImg) {
      alert("Please select all fields");
    } else {
      formdata.append("category", category);
      formdata.append("categoryImg", categoryImg);
      try {
        const config = {
          url: "/addcategory",
          method: "post",
          baseURL: "http://api.vijayhomeservicebengaluru.in/api",
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.assign("/category");
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get( "http://api.vijayhomeservicebengaluru.in/api/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
      setfilterdata(res.data?.category);
    }
  };
  console.log(categorydata);

  const editcategory = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/editcategory/${data._id}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: {
          category: category1,
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
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <img
            src={`http://api.vijayhomeservicebengaluru.in/category/${row.categoryImg}`}
            width="50px"
            height="50px"
          />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a> */}
          <a onClick={() => deletecategory(row._id)} className="hyperlink mx-1">
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
    const result = categorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletecategory = async (id) => {
    axios({
      method: "post",
      url: "http://api.vijayhomeservicebengaluru.in/api/deletecategory/" + id,
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

  let i = 0;
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>Category</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcategory(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category Icon <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="file"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcategoryImg(e.target.files[0])}
                          />
                           <b style={{fontSize:"12px"}}>Please select the dimensions Width=50px,Height=50px</b>
                        </div>
                      </div>

                      <div className="col-md-4"></div>

                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-2">
                        <button className="vhs-button" onClick={postcategory}>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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
                <div className="col-md-4">
                  <div className="vhs-input-label">
                    Category <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setcategory1(e.target.value)}
                      defaultValue={data.category}
                    />
                  </div>
                </div>
                <div className="col-md-4 mt-3">
                  <div className="vhs-input-label">
                    Category Icon<span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="file"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setcategoryImg1(e.target.files[0])}
                      // defaultValue={data.categoryImg}
                    />
                   
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editcategory}>
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

export default Category;
