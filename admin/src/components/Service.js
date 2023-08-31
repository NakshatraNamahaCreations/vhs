import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import DataTable from "react-data-table-component";
import Table from "react-bootstrap/Table";

import { useNavigate } from "react-router-dom";

function Services() {
  const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];
  const plandata = JSON.parse(localStorage.getItem("plans")) || [];
  const plandetailsdata =
    JSON.parse(localStorage.getItem("plansdeatils")) || [];
  const navigate = useNavigate();


  const [selected, setSelected] = useState(false);
  const [categorydata, setcategorydata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);
  const [postservicename, setpostservicename] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [ServiceImg, setServiceImg] = useState("");
  const [sub_subcategory, setsub_subcategory] = useState("");
  const [ServiceHour, setServiceHour] = useState("");
  const [ServiceName, setServiceName] = useState("");
  const [ServiceDesc, setServiceDesc] = useState("");
  const [ServicePrice, setServicePrice] = useState("");
  const [ServiceGst, setServiceGst] = useState("");
  const [NofServiceman, setNofServiceman] = useState("");
  const [Subcategory, setSubcategory] = useState("");
  const [offerPrice, setofferPrice] = useState("");
  const [Servicesno, setServicesno] = useState("");
  const [Slots, setSlots] = useState("");
  const [Image, setImage] = useState("");
  const [Plans, setPlans] = useState("");
  const [planName, setplanName] = useState("");
  const [plansPrice, setplansPrice] = useState("");
  const [premises, setPremises] = useState("");
  const [desc, setdesc] = useState("");
  const [includes, setincludes] = useState("");
  const [search, setsearch] = useState("");
  const [serID, setserID] = useState("");
  const [serviceIncludes, setserviceIncludes] = useState("");
  const [serviceExcludes, setserviceExcludes] = useState("");
  const formdata = new FormData();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setServiceImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleactive1 = () => {
    setSelected(true);
  };
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [toggle, setToggel] = useState(true);
  const [toggle1, setToggel1] = useState(false);
  const [toggle2, setToggel2] = useState(true);

  const handelgeneralbtn = () => {
    setToggel1(true);
  };
  const handeladvancebtn = () => {
    setToggel1(false);
  };
  const handelsavebtn = () => {
    setToggel(true);
  };
  const handelAddbtn = () => {
    setToggel(false);
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      setcategorydata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getsubcategory();
  }, [Subcategory]);

  const getsubcategory = async () => {
    let res = await axios.post(
      `http://api.vijayhomeservicebengaluru.in/api/userapp/postappresubcat/`,
      {
        subcategory: Subcategory,
      }
    );

    if ((res.status = 200)) {
      setpostservicename(res.data?.subcategory);
      console.log("service", res.data?.subcategory);
    }
  };

  const postformat = async (e) => {
    const a = ServiceGst * ServicePrice;

    const sp = parseInt(a) + parseInt(ServicePrice);
    const b = ServiceGst * offerPrice;
    const op = parseInt(b) + parseInt(offerPrice);

    if (!ServiceImg || !ServiceName || !ServiceDesc || !ServicePrice) {
      alert("Please fill all mandatory fields");
    } else {
      e.preventDefault();
      formdata.append("serviceImg", Image);
      formdata.append("sub_subcategory", sub_subcategory);
      formdata.append("serviceName", ServiceName);
      formdata.append("servicePrice", sp);
      formdata.append("Subcategory", Subcategory);
      formdata.append("serviceIncludes", serviceIncludes);
      formdata.append("serviceExcludes", serviceExcludes);

      formdata.append("offerPrice", op);
      formdata.append("serviceHour", ServiceHour);
      formdata.append("serviceDesc", ServiceDesc);
      formdata.append("serviceGst", ServiceGst);
      formdata.append("NofServiceman", NofServiceman);

      try {
        const config = {
          url: "/userapp/addservices",
          method: "post",
          baseURL: "http://api.vijayhomeservicebengaluru.in/api",
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            const { success, service } = response.data;
            console.log(success); // Should log "User added successfully"
            console.log(service); // Should log the service data
            alert(success);
            setserID(service._id);
            // Handle the s
            handelgeneralbtn();

            // window.location.assign("/Service");
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };

  useEffect(() => {
    getservicemanagement();
  }, []);

  const getservicemanagement = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/getservices");
    if ((res.status = 200)) {
      setServicedata(res.data?.service);
      setfilterdata(res.data?.service);
      console.log(res.data?.service);
    }
  };


  const deletecategory = async (id) => {
    axios({
      method: "post",
      url: "http://api.vijayhomeservicebengaluru.in/api/userapp/deleteservices/" + id,
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

  useEffect(() => {
    const result = Servicedata.filter((item) => {
      return item.serviceName.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Subcategory",
      selector: (row) => row.Subcategory,
    },
    {
      name: "Sub-subcategory",
      selector: (row) => row.sub_subcategory,
    },
    {
      name: "Service Name",
      selector: (row) => row.serviceName,
    },
    {
      name: "Service Price",
      selector: (row) => row.servicePrice,
    },
    {
      name: "Service Desc",
      cell: (row) => (
        <div>
          {row.serviceDesc?.split("\n").map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      ),
    },
    {
      name: "Service Hours",
      selector: (row) => row.serviceHour,
    },
    {
      name: "Service Img",
      cell: (row) => (
        <div>
          <img
            src={`http://api.vijayhomeservicebengaluru.in/service/${row.serviceImg}`}
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
          <a onClick={() => deletecategory(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  const addadvacedata = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/userapp/updateadvanceddata/${serID}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          // cardno: cardno,
          plans: plandata,
          Plansdetails: plandetailsdata,
          store_slots: existingData,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");
          localStorage.removeItem("Store_Slots");
          localStorage.removeItem("plans");
          localStorage.removeItem("plansdeatils");
          setserID("");
          handelsavebtn();
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };
  const handleSaveChanges = () => {
    // Retrieve existing data from local storage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];
    console.log("Existing Data:", existingData);

    // Add new data to the array
    const newData = { Slots, Servicesno };
    existingData.push(newData);
    console.log("New Data:", newData);

    // Update local storage with the updated array
    localStorage.setItem("Store_Slots", JSON.stringify(existingData));
    handleClose();
  };
  const handleSaveplans = () => {
    // Retrieve existing data from local storage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("plans")) || [];
    console.log("Existing Data:", existingData);

    // Add new data to the array
    const newData = { Plans };
    existingData.push(newData);
    console.log("New Data:", newData);

    // Update local storage with the updated array
    localStorage.setItem("plans", JSON.stringify(existingData));
    handleClose1();
  };

  const handleSaveplans2 = () => {
    // Retrieve existing data from local storage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("plansdeatils")) || [];
    console.log("Existing Data:", existingData);

    // Add new data to the array
    const newData = { planName, plansPrice, premises, desc, includes };
    existingData.push(newData);
    console.log("New Data:", newData);

    // Update local storage with the updated array
    localStorage.setItem("plansdeatils", JSON.stringify(existingData));
    handleClose2();
  };

  const handleRowClick = (row) => {
    navigate(`/servicedetails/${row._id}`);
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        {toggle ? (
          <div className="row ">
            <div className="col-md-12">
              <h4 style={{ color: "#a33535" }}>Service Management</h4>
            </div>

            <div className="col-md-12">
              <div className="d-flex float-end mt-3 mb-3">
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Offcanvas.Title>Price</Offcanvas.Title>
                    <ul>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">All deals</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">Under ₹500 </a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">₹500 to ₹1,000</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">₹1,000 to ₹2,000</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">₹2,000 to ₹5,000</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">₹5,000 and Above</a>
                      </li>
                    </ul>
                    <Offcanvas.Title>Discount</Offcanvas.Title>
                    <ul>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">All deals</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">10% off or more</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">₹25% off or more</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">50% off or more</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">70% off or more</a>
                      </li>
                    </ul>
                    <Offcanvas.Title>Maximum hour </Offcanvas.Title>
                    <ul>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">All deals</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#"> 4-9 </a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">7-10</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">7-10</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">7-10</a>
                      </li>
                      <li
                        className={selected ? "hyperlink" : "hyperlink active1"}
                      >
                        {" "}
                        <a href="#">7-10</a>
                      </li>
                    </ul>
                  </Offcanvas.Body>

                  <Button
                    variant="danger"
                    style={{
                      width: "200px",
                      fontSize: "15px",
                      textAlign: "center",
                    }}
                  >
                    Filter Apply
                  </Button>
                </Offcanvas>
                <Button
                  type="button"
                  variant="danger"
                  className="btn btn-secondary float-end"
                  onClick={handelAddbtn}
                >
                  <i class="fa-regular fa-plus"></i>
                  Add Service
                </Button>
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Search service name here.."
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
                  onRowClicked={handleRowClick}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row w-100 float-center card mt-4">
            <h3>Add Service</h3>
            <div className="row m-auto card-body p-6">
              <div className="col-md-3">
                <Card
                  style={{
                    width: "",
                    height: "",
                    padding: "15px",
                    margin: "15px",
                  }}
                >
                  <Card.Title>
                    Service Icon <span className="text-danger"> *</span>
                  </Card.Title>
                  <InputGroup className="mb-3">
                    <Form.Control
                      height={"500px"}
                      type="file"
                      aria-label="Username"
                      onChange={onImageChange}
                    />
                  </InputGroup>
                  <img src={ServiceImg} />
                  <Card.Body>
                    <Card.Text>
                      <p style={{ fontSize: "12px" }}>
                        {" "}
                        Preferred images size must be less than 5MB
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    width: "",

                    padding: "15px",
                    margin: "15px",
                  }}
                >
                  <Card.Title>Service details</Card.Title>
                  {/* <Form.Label>
                    Service category <span className="text-danger"> *</span>
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>---Select Category---</option>
                      {categorydata.map((item) => (
                        <option value={item.category}>{item.category}</option>
                      ))}
                    </Form.Select>
                  </InputGroup> */}

                  <Form.Label>
                    Subcategory <span className="text-danger"> *</span>
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option>-Select Subcategory-</option>
                      {categorydata.map((item) => (
                        <option value={item.subcategory}>
                          {item.subcategory}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  <Form.Label>
                    Sub-subcategory <span className="text-danger"> *</span>
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setsub_subcategory(e.target.value)}
                    >
                      <option>-Select Subcategory-</option>
                      {postservicename.map((item) => (
                        <option value={item.sub_subcategory}>
                          {item.sub_subcategory}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {/* <div style={{ color: "#FF0060", textAlign: "end" }}>
                    <i class="fa-regular fa-plus"></i>
                    create category
                  </div> */}
                  <Form.Label>Service duration</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="max_hrbook"
                      aria-describedby="basic-addon1"
                      type="text"
                      placeholder="3-5hr"
                      onChange={(e) => setServiceHour(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <Form.Label>Number of Servicemen </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="maxhr"
                      aria-describedby="basic-addon1"
                      type="number"
                      placeholder="15"
                      onChange={(e) => setNofServiceman(e.target.value)}
                    ></Form.Control>
                  </InputGroup>
                </Card>
              </div>
              <div className="col-md-9 shadow p-3 mb-5 bg-body rounded">
                <div className="d-flex ">
                  <p
                    className={!toggle1 ? "gr mr" : "mr"}
                    onClick={handeladvancebtn}
                  >
                    {" "}
                    General
                  </p>
                  <p
                    className={toggle1 ? "gr mr" : "mr"}
                    onClick={handelgeneralbtn}
                  >
                    Advanced
                  </p>
                </div>

                {toggle1 ? (
                  <div>
                    <Form>
                      <h2> Addon's</h2>
                      <Row className="mb-3"></Row>
                      <Button
                        variant="light"
                        className="mb-3"
                        style={{ color: "skyblue" }}
                        onClick={handleShow}
                      >
                        {" "}
                        <i
                          class="fa-regular fa-plus"
                          style={{ color: "rgb(7, 170, 237)" }}
                        ></i>
                        Add Slot's
                      </Button>{" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        {existingData.map((i) => (
                          <p className="slots">{i.Slots}</p>
                        ))}
                      </div>
                    </Form>

                    <Form>
                      {/* <h2> Plans's</h2> */}
                      <Row className="mb-3"></Row>
                      <Button
                        variant="light"
                        className="mb-3"
                        style={{ color: "skyblue" }}
                        onClick={handleShow1}
                      >
                        {" "}
                        <i
                          class="fa-regular fa-plus"
                          style={{ color: "rgb(7, 170, 237)" }}
                        ></i>
                        Add Plan and Premises
                      </Button>{" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        {plandata.map((i) => (
                          <p className="plans" onClick={() => handleShow2(i)}>
                            {i.Plans}
                          </p>
                        ))}
                      </div>
                      <div>
                        {/* {plandetailsdata.map((i) => (
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              flexWrap: "wrap",
                            }}
                          >
                            <p className="">{i.planName}</p>
                            <p className="">{i.premises}</p>
                            <p className="">{i.plansPrice}</p>
                          </div>
                        ))} */}
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>PlanName</th>
                              <th>Premises</th>
                              <th>PlansPrice</th>
                              <th>Desc</th>
                              <th>Includes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plandetailsdata.map((i) => (
                              <tr>
                                <td>{i.planName}</td>
                                <td>{i.premises}</td>
                                <td>{i.plansPrice}</td>
                                <td>{i.desc}</td>
                                <td>{i.includes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Form>

                    <Button type="button" variant="outline-primary">
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      className="btn btn-secondary float-end"
                      onClick={addadvacedata}
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Form>
                      <h1>Service Information</h1>
                      <Row className="mb-3">
                        {" "}
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>
                            Service Name <span className="text-danger"> *</span>
                          </Form.Label>

                          <InputGroup className="mb-3">
                            <Form.Control
                              aria-label="max_hrbook"
                              aria-describedby="basic-addon1"
                              type="text"
                              placeholder="Service Name"
                              onChange={(e) => setServiceName(e.target.value)}
                            ></Form.Control>
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          Service Description{" "}
                          <span className="text-danger"> *</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={(e) => setServiceDesc(e.target.value)}
                        />
                      </Form.Group>

                      <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Includes</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e) => setserviceIncludes(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Excludes</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e) => setserviceExcludes(e.target.value)}
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>
                            Service Price{" "}
                            <span className="text-danger"> *</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="Price"
                            onChange={(e) => setServicePrice(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Customer offer price</Form.Label>
                          <Form.Control
                            type="text"
                            name=""
                            onChange={(e) => setofferPrice(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>GST Percentage</Form.Label>

                          <Form.Select
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setServiceGst(e.target.value)}
                          >
                            <option>---Select GST---</option>

                            <option value="0.05">5%</option>
                            <option value="0.18">18%</option>
                            <option value="0.22">22%</option>
                          </Form.Select>
                        </Form.Group>
                      </Row>
                    </Form>
                    <Button type="button" variant="outline-primary">
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      className="btn btn-secondary float-end"
                      onClick={postformat}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>
              Slots <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setSlots(e.target.value)}
            />
            <p style={{ marginTop: "10px", fontSize: "12px" }}>
              <b>Example= 10AM-11AM</b>
            </p>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>
              Mention services number <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="Price"
              placeholder="10 "
              onChange={(e) => setServicesno(e.target.value)}
            />
            <p style={{ marginTop: "10px", fontSize: "12px" }}>
              <b>Mention the services for slots Example= 10</b>
            </p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>
              Plan Name <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setPlans(e.target.value)}
            />
            <p style={{ marginTop: "10px", fontSize: "12px" }}>
              <b>Example= Essential</b>
            </p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveplans}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>
              Select Plans <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Select
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setplanName(e.target.value)}
            >
              <option>-Select -</option>
              {plandata.map((item) => (
                <option value={item.Plans}>{item.Plans}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Premises</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setPremises(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setplansPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setdesc(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Includes</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setincludes(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveplans2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Services;
