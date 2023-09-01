import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
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
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

function Servicedetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];
  const plandata = JSON.parse(localStorage.getItem("plans")) || [];
  const homepagetitleData =
    JSON.parse(localStorage.getItem("homepagetitle")) || [];
  const morepriceData = JSON.parse(localStorage.getItem("plansprice")) || [];
  const [slotCity, setslotcity] = useState("");
  const [Servicedata, setServicedata] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [toggle, setToggel] = useState(true);
  const [toggle1, setToggel1] = useState(false);
  const [toggle2, setToggel2] = useState(true);
  const [selected, setSelected] = useState(false);
  const [categorydata, setcategorydata] = useState([]);
  const [citydata, setcitydata] = useState([]);

  const [postservicename, setpostservicename] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [ServiceImg, setServiceImg] = useState("");
  const [sub_subcategory, setsub_subcategory] = useState(
    Servicedata[0]?.sub_subcategory
  );
  const [ServiceHour, setServiceHour] = useState(Servicedata[0]?.serviceHour);
  const [ServiceName, setServiceName] = useState(Servicedata[0]?.ServiceName);
  const [ServiceDesc, setServiceDesc] = useState(Servicedata[0]?.serviceDesc);
  const [ServicePrice, setServicePrice] = useState(
    Servicedata[0]?.servicePrice
  );
  const [ServiceGst, setServiceGst] = useState(Servicedata[0]?.serviceGst);
  const [NofServiceman, setNofServiceman] = useState(
    Servicedata[0]?.NofServiceman
  );
  const [Subcategory, setSubcategory] = useState(Servicedata[0]?.Subcategory);
  const [offerPrice, setofferPrice] = useState(Servicedata[0]?.offerPrice);
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
  const [serviceIncludes, setserviceIncludes] = useState(
    Servicedata[0]?.serviceIncludes
  );
  const [serviceExcludes, setserviceExcludes] = useState(
    Servicedata[0]?.serviceExcludes
  );
  const [quantity, setquantity] = useState(Servicedata[0]?.quantity);
  const [pName, setpName] = useState("");
  const [pPrice, setpPrice] = useState("");
  const [pofferprice, setpofferprice] = useState("");
  const [pservices, setpservices] = useState("");
  const [servicetitle, setServicetitle] = useState("");
  const [servicebelow, setServicebelow] = useState("");
  const [titleName, settitleName] = useState("");
  const [homepagetitle, sethomePagetitle] = useState("");
  const [serviceDirection, setserviceDirection] = useState("");

  const formdata = new FormData();
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
    getservicemanagement();
  }, []);

  const getservicemanagement = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/getservices");
    if ((res.status = 200)) {
      setServicedata(res.data?.service.filter((i) => i._id == id));
      console.log(res.data?.service.filter((i) => i._id == id));
    }
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

  const addadvacedata = async () => {
    try {
      const config = {
        url: `/userapp/updateadvanceddata/${id}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: {
          plans: [...plandata, ...Servicedata[0]?.plans],
          morepriceData: [...morepriceData, ...Servicedata[0]?.morepriceData],
          store_slots: [...existingData, ...Servicedata[0]?.store_slots],
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        console.log("Data updated successfully");

        localStorage.removeItem("Store_Slots");
        localStorage.removeItem("plans");
        localStorage.removeItem("homepagetitle");
        localStorage.removeItem("plansprice");

        setserID("");
        handelsavebtn();
        window.location.reload();
        // Clear localStorage and perform other necessary actions
      } else {
        console.log("Data update failed");
        // Handle error cases
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred while updating data");
      // Handle error cases
    }
  };
  console.log("ServiceName", ServiceName);
  const postformat = async (e) => {
    e.preventDefault();

    const a = ServiceGst * ServicePrice;
    const sp = parseInt(a) + parseInt(ServicePrice);
    const b = ServiceGst * offerPrice;
    const op = parseInt(b) + parseInt(offerPrice);

    // Create FormData object and append the data
    const formdata = new FormData();
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
        url: `/userapp/editservices/${id}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        data: formdata,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Successfully Added");
        // Handle success case
        handelgeneralbtn();
      }
    } catch (error) {
      console.error(error);
      alert("Category Not Added");
    }
  };

  useEffect(() => {
    getcity();
  }, []);

  const getcity = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };

  const handleSaveChanges = () => {
    // Retrieve existing data from local storage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];
    console.log("Existing Data:", existingData);

    // Add new data to the array
    const newData = { StartTime, EndTime, slotCity, Servicesno };
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
    const homepagetitleData =
      JSON.parse(localStorage.getItem("homepagetitle")) || [];
    console.log("Existing Data:", existingData);

    // Add new data to the array
    const newData = { titleName };
    homepagetitleData.push(newData);
    console.log("New Data:", newData);

    // Update local storage with the updated array
    localStorage.setItem("homepagetitle", JSON.stringify(homepagetitleData));
    handleClose2();
  };
  const handleSaveplanprice = () => {
    // Retrieve existing data from local storage or initialize an empty array
    const morepriceData = JSON.parse(localStorage.getItem("plansprice")) || [];

    // Add new data to the array
    const newData = { pName, pofferprice, pPrice, pservices };
    morepriceData.push(newData);
    console.log("New Data:", newData);

    // Update local storage with the updated array
    localStorage.setItem("plansprice", JSON.stringify(morepriceData));
    handleClose3();
  };
  const handleDeleteCity = (index) => {
    // Create a copy of the existing data array
    const updatedData = [...existingData];

    // Remove the item at the specified index
    updatedData.splice(index, 1);

    // Update local storage with the updated array
    localStorage.setItem("Store_Slots", JSON.stringify(updatedData));

    window.location.reload();
  };
  const dataByCity = {};
  // Group data by city
  existingData.forEach((item) => {
    const { slotCity, StartTime, EndTime, Servicesno } = item;

    if (!dataByCity[slotCity]) {
      dataByCity[slotCity] = [];
    }

    dataByCity[slotCity].push({ StartTime, EndTime, Servicesno });
  });
  const [StartTime, setStartTime] = useState(dayjs("2022-04-17T15:30")); // Set initial time
  const [EndTime, setEndTime] = useState(dayjs("2022-04-17T15:30")); // Set initial time

  const handleTimeChange = (newTime) => {
    setStartTime(newTime);
  };
  const handleTimeChange1 = (newTime) => {
    setEndTime(newTime);
  };
  function formatTimeRange(startTime, endTime) {
    const formattedStartTime = dayjs(startTime).format("h:mm A");
    const formattedEndTime = dayjs(endTime).format("h:mm A");
    return `${formattedStartTime} - ${formattedEndTime}`;
  }
  // Function to format the time
  function formatTimeRange(startTime, endTime) {
    const formattedStartTime = dayjs(startTime).format("h:mm A");
    const formattedEndTime = dayjs(endTime).format("h:mm A");
    return `${formattedStartTime} - ${formattedEndTime}`;
  }
  let currentCity = null;
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

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
                  />
                </InputGroup>
                <img
                  src={`http://api.vijayhomeservicebengaluru.in/service/${Servicedata[0]?.serviceImg}`}
                />
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

                <Form.Label>
                  Subcategory <span className="text-danger"> *</span>
                </Form.Label>
                <InputGroup className="mb-2">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <option>{Servicedata[0]?.Subcategory}</option>
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
                    <option>{Servicedata[0]?.sub_subcategory}</option>
                    {postservicename.map((item) => (
                      <option value={item.subcategory}>
                        {item.subcategory}
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
                    defaultValue={Servicedata[0]?.serviceHour}
                    onChange={(e) => setServiceHour(e.target.value)}
                  ></Form.Control>
                </InputGroup>

                <Form.Label>Number of Servicemen </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="maxhr"
                    aria-describedby="basic-addon1"
                    type="number"
                    defaultValue={Servicedata[0]?.NofServiceman}
                    onChange={(e) => setNofServiceman(e.target.value)}
                  ></Form.Control>
                </InputGroup>
                <Form.Label className="mt-3">
                  Home page title <span className="text-danger"> *</span>
                </Form.Label>
                <InputGroup className="mb-2">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => sethomePagetitle(e.target.value)}
                  >
                    <option>{Servicedata[0]?.homepagetitle}</option>
                    {homepagetitleData.map((item) => (
                      <option value={item.titleName}>{item.titleName}</option>
                    ))}
                  </Form.Select>
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
                      {Servicedata[0]?.store_slots.map((i, index) => {
                        // Check if the current city is different from the previous slot
                        const isNewCity = currentCity !== i.slotCity;

                        // If it's a new city, display the city header
                        if (isNewCity) {
                          currentCity = i.slotCity;
                        }

                        return (
                          <div key={index}>
                            {isNewCity && <p>{i.slotCity}</p>}
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              <p className="slots">
                                {formatTimeRange(i.StartTime, i.EndTime)}
                              </p>
                              <p
                                style={{
                                  backgroundColor: "lightblue",
                                  padding: "10px",
                                }}
                              >
                                {i.Servicesno}
                              </p>
                              {/* <i
                                className="fa-solid fa-trash"
                                style={{
                                  color: "red",
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDeleteCity()}
                              ></i> */}
                            </div>
                          </div>
                        );
                      })}
                      {Object.entries(dataByCity).map(([city, data], index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div>
                            <p>{city}</p>
                            {data.map((item, subIndex) => {
                              // Parse the start and end times using dayjs
                              const startTime = dayjs(item.StartTime).format(
                                "h:mm A"
                              );
                              const endTime = dayjs(item.EndTime).format(
                                "h:mm A"
                              );

                              return (
                                <div key={subIndex} style={{ display: "flex" }}>
                                  <p className="slots">
                                    {startTime} - {endTime}
                                  </p>
                                  <p
                                    style={{
                                      backgroundColor: "lightblue",
                                      padding: "10px",
                                    }}
                                  >
                                    {item.Servicesno}
                                  </p>
                                  <i
                                    className="fa-solid fa-trash"
                                    style={{
                                      color: "red",
                                      padding: "10px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleDeleteCity(subIndex)}
                                  ></i>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="light"
                      className="mb-3"
                      style={{ color: "skyblue" }}
                      onClick={() => handleShow3()}
                    >
                      {" "}
                      <i
                        class="fa-regular fa-plus"
                        style={{ color: "rgb(7, 170, 237)" }}
                      ></i>
                      Add more price
                    </Button>{" "}
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>PlanName</th>
                            <th>Price</th>
                            <th>OfferPrice</th>
                            <th>Services</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Servicedata[0]?.morepriceData.map((i) => (
                            <tr>
                              <td>{i.pName}</td>
                              <td>{i.pPrice}</td>
                              <td>{i.pofferprice}</td>
                              <td>{i.pservices}</td>
                            </tr>
                          ))}
                          {morepriceData.map((i) => (
                            <tr>
                              <td>{i.pName}</td>
                              <td>{i.pPrice}</td>
                              <td>{i.pofferprice}</td>
                              <td>{i.pservices}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Form>
                  <Button
                    variant="light"
                    className="mb-3"
                    style={{ color: "skyblue" }}
                    onClick={handleShow2}
                  >
                    {" "}
                    <i
                      class="fa-regular fa-plus"
                      style={{ color: "rgb(7, 170, 237)" }}
                    ></i>
                    Add Home page title
                  </Button>{" "}
                  <div>
                    {/* {Servicedata[0]?.homepagetitleData.map((i, index) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        <p style={{ color: "brown" }}>
                          {index + 1}.{i.titleName}
                        </p>
                      </div>
                    ))} */}
                    {homepagetitleData.map((i, index) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        <p style={{ color: "brown" }}>
                          {index + 1}.{i.titleName}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Row className="mb-3">
                    {" "}
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>
                        Select Services redirection{" "}
                        <span className="text-danger"> *</span>
                      </Form.Label>

                      <InputGroup className="mb-2 col-3">
                        <Form.Select
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(e) => setserviceDirection(e.target.value)}
                        >
                          <option>{Servicedata[0]?.serviceDirection}</option>

                          <option value="Enquiry">Enquiry</option>
                          <option value="Survey">Survey</option>
                          <option value="DSR">DSR single service</option>
                          <option value="AMC">AMC Service</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Row>
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
                            defaultValue={Servicedata[0]?.serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                          ></Form.Control>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>For title</Form.Label>

                        <InputGroup className="mb-3">
                          <Form.Control
                            aria-label="max_hrbook"
                            aria-describedby="basic-addon1"
                            type="text"
                            defaultValue={Servicedata[0]?.servicetitle}
                            onChange={(e) => setServicetitle(e.target.value)}
                          ></Form.Control>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>For below the service </Form.Label>

                        <InputGroup className="mb-3">
                          <Form.Control
                            aria-label="max_hrbook"
                            aria-describedby="basic-addon1"
                            type="text"
                            defaultValue={Servicedata[0]?.servicebelow}
                            onChange={(e) => setServicebelow(e.target.value)}
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
                        defaultValue={Servicedata[0]?.serviceDesc}
                        onChange={(e) => setServiceDesc(e.target.value)}
                      />
                    </Form.Group>
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Includes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          defaultValue={Servicedata[0]?.serviceIncludes}
                          onChange={(e) => setserviceIncludes(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Excludes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          defaultValue={Servicedata[0]?.serviceExcludes}
                          onChange={(e) => setserviceExcludes(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3 mt-4">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Service Price
                          <span style={{ fontSize: "12px" }}>
                            (for single price)
                          </span>{" "}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="Price"
                          defaultValue={Servicedata[0]?.servicePrice}
                          onChange={(e) => setServicePrice(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Offer price
                          <span style={{ fontSize: "12px" }}>
                            (for single price)
                          </span>{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name=""
                          defaultValue={Servicedata[0]?.offerPrice}
                          onChange={(e) => setofferPrice(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="text"
                          name=""
                          defaultValue={Servicedata[0]?.quantity}
                          onChange={(e) => setquantity(e.target.value)}
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
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "TimePicker",
                    "MobileTimePicker",
                    "DesktopTimePicker",
                    "StaticTimePicker",
                  ]}
                >
                  <DemoItem label="Start Time">
                    <MobileTimePicker
                      defaultValue={StartTime} // Set the default value
                      onChange={handleTimeChange} // Handle changes to the selected time
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "TimePicker",
                    "MobileTimePicker",
                    "DesktopTimePicker",
                    "StaticTimePicker",
                  ]}
                >
                  <DemoItem label="End Time">
                    <MobileTimePicker
                      defaultValue={EndTime} // Set the default value
                      onChange={handleTimeChange1} // Handle changes to the selected time
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Select City </Form.Label>

            <InputGroup className="mb-2 col-3">
              <Form.Select
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setslotcity(e.target.value)}
              >
                <option>-Select-</option>
                {citydata.map((i) => (
                  <option value={i.city}>{i.city}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>
              Mention services number <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="Price"
              defaultValue="10 "
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
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Plan name</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>OfferPrice</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpofferprice(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many services</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpservices(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveplanprice}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Servicedetails;
