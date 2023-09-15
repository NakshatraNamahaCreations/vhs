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

function Servicedetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const sid = id;
  // console.log("sid", id);
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
  const [category, setcategory] = useState("");
  const [catdata, setcatdata] = useState([]);

  const [postservicename, setpostservicename] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [ServiceImg, setServiceImg] = useState("");
  const [sub_subcategory, setsub_subcategory] = useState(
    Servicedata[0]?.sub_subcategory
  );
  const [servicePeriod, setservicePeriod] = useState("");
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
  const [Image, setImage] = useState(Servicedata[0]?.serviceImg);
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
  const [slotsdata, setslotsdata] = useState([]);
  const [titledata, settitledata] = useState([]);
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState([]);
  // const [descriptions, setDescriptions] = useState("");

  // Edit ===================================
  const [newDescription, setNewDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editSubcategoryList, setEditSubcategoryList] = useState("");
  const [editServiceHour, setEditServiceHour] = useState("");
  const [editNofServiceman, setEditNofServiceman] = useState("");
  const [editServiceName, setEditServiceName] = useState("");
  const [editServicetitle, setEditServicetitle] = useState("");
  const [editServicebelow, setEditServicebelow] = useState("");
  const [edithomePagetitle, setEdithomePagetitle] = useState("");
  const [editDescriptions, setEditDescriptions] = useState([]);
  const [newServiceExcludes, setnewServiceExcludes] = useState("");
  const [newServiceIncludes, setnewServiceIncludes] = useState("");
  const [editServiceIncludes, setEditServiceIncludes] = useState([]);
  const [editServiceExcludes, setEditServiceExcludes] = useState([]);
  const [editServiceDirection, setEditServiceDirection] = useState("");
  const [editServiceGst, setEditServiceGst] = useState("");
  const [showAddedData2, setShowAddedData2] = useState(false);
  // descriotions

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setServiceImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
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
  }, [id]);

  const getservicemanagement = async () => {
    try {
      const res = await axios.get(
        `http://api.vijayhomeservicebengaluru.in/api/userapp/getservices`
      );
      if (res.status === 200) {
        const serviceData = res.data?.service.filter((i) => i._id === id);
        setServicedata(serviceData);
        console.log("serviceData", serviceData);

        // Convert the existing array of strings to an array of objects
        setEditDescriptions(
          serviceData[0]?.serviceDesc.map((desc) => ({ text: desc }))
        );
        setEditServiceIncludes(serviceData[0]?.serviceIncludes);
        setEditServiceExcludes(serviceData[0]?.serviceExcludes);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  const handleAddDesc = () => {
    if (newDescription) {
      console.log("newDescription", newDescription);
      // const newDescriptionObject = { text: newDescription };
      let arr = [...editDescriptions];
      arr.push({ text: newDescription });
      setEditDescriptions(arr);
      // setEditDescriptions([...editDescriptions, { text: newDescription }]);
      setTimeout(() => {
        setNewDescription("");
      }, 100);
    }
  };

  const handleAddIncludes = () => {
    if (newServiceIncludes) {
      console.log("newServiceIncludes", newServiceIncludes);
      // const newDescriptionObject = { text: newDescription };
      let arr = [...editServiceIncludes];
      arr.push({ text: newServiceIncludes, image: null });
      setEditServiceIncludes(arr);
      // setEditDescriptions([...editDescriptions, { text: newDescription }]);
      setTimeout(() => {
        setnewServiceIncludes("");
      }, 100);
    }
  };

  const handleAddExcludes = () => {
    if (newServiceExcludes) {
      console.log("newServiceExcludes", newServiceExcludes);
      // const newDescriptionObject = { text: newDescription };
      let arr = [...editServiceExcludes];
      arr.push({ text: newServiceExcludes, image: null });
      setEditServiceExcludes(arr);
      // setEditDescriptions([...editDescriptions, { text: newDescription }]);
      setTimeout(() => {
        setnewServiceExcludes("");
      }, 100);
    }
  };

  const handleEditDesc = (index, editedDescription) => {
    const updatedDescriptions = [...editDescriptions];
    console.log(
      "updateddescriptions",
      editDescriptions,
      "editeddescription",
      editedDescription
    );
    updatedDescriptions[index].text = editedDescription;
    setEditDescriptions(updatedDescriptions);
  };

  const handleEditIncludes = (index, editServiceInclude) => {
    const updatedInculdes = [...editServiceIncludes];
    console.log(
      "updatedInculdes",
      editServiceIncludes,
      "editServiceInclude",
      editServiceInclude
    );
    updatedInculdes[index].text = editServiceInclude;
    setEditServiceIncludes(updatedInculdes);
  };

  const handleEditExcludes = (index, editServiceExclude) => {
    const updatedExculdes = [...editServiceExcludes];
    console.log(
      "updatedExculdes",
      editServiceExcludes,
      "editServiceExclude",
      editServiceExclude
    );
    updatedExculdes[index].text = editServiceExclude;
    setEditServiceExcludes(updatedExculdes);
  };

  // const handleDeleteDesc = (index) => {
  //   const updatedDescriptions = [...editDescriptions];
  //   updatedDescriptions.splice(index, 1);
  //   setEditDescriptions(updatedDescriptions);
  // };

  useEffect(() => {
    getcategory();
    getallcategory();
  }, []);

  const getallcategory = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      setcategorydata(res.data?.subcategory);
    }
  };
  const getcategory = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/getcategory");
    if ((res.status = 200)) {
      setcatdata(res.data?.category);
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

  const postformat = async (e) => {
    e.preventDefault();

    formdata.append("serviceImg", ServiceImg);
    formdata.append("sub_subcategory", sub_subcategory);
    formdata.append("serviceName", ServiceName);
    formdata.append("category", category);

    formdata.append("Subcategory", Subcategory);
    formdata.append("serviceIncludes", serviceIncludes);
    formdata.append("serviceExcludes", serviceExcludes);

    formdata.append("serviceHour", ServiceHour);
    formdata.append("serviceDesc", ServiceDesc);
    formdata.append("serviceGst", ServiceGst);
    formdata.append("serviceDirection", serviceDirection);

    formdata.append("NofServiceman", NofServiceman);

    try {
      const config = {
        url: `/userapp/editservices/${id}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    const newData = { startTime, endTime, slotCity, Servicesno };
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
    const newData = { pName, pofferprice, pPrice, pservices, servicePeriod };
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
    const { slotCity, startTime, endTime, Servicesno } = item;

    if (!dataByCity[slotCity]) {
      dataByCity[slotCity] = [];
    }

    dataByCity[slotCity].push({ startTime, endTime, Servicesno });
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

  useEffect(() => {
    getslots();
    gettitle();
  }, []);

  const getslots = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/getslots");
    if ((res.status = 200)) {
      setslotsdata(res.data?.slots);
    }
  };

  const gettitle = async () => {
    let res = await axios.get("http://api.vijayhomeservicebengaluru.in/api/userapp/gettitle");
    if ((res.status = 200)) {
      settitledata(res.data?.homepagetitle);
    }
  };

  const handleDeleteClick = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://api.vijayhomeservicebengaluru.in/api/userapp/deleteStoreSlot/${sid}/${id}`
      );

      if (response.status === 200) {
        // Successful deletion
        console.log("Item deleted successfully");
        alert("Item deleted successfully");
        window.location.assign(`/servicedetails/${sid}`);
      } else {
        // Handle other response statuses if needed
        console.log("Deletion failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  const handleDeleteprice = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://api.vijayhomeservicebengaluru.in/api/userapp/deleteprice/${sid}/${id}`
      );

      if (response.status === 200) {
        // Successful deletion
        console.log("Item deleted successfully");
        alert("Item deleted successfully");
        window.location.assign(`/servicedetails/${sid}`);
      } else {
        // Handle other response statuses if needed
        console.log("Deletion failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data1 = editor.getData();
    setServiceDesc(data1);
  };

  const handlechangeinclude = (event, editor) => {
    const data1 = editor.getData();
    setserviceIncludes(data1);
  };

  const handlechangeexclude = (event, editor) => {
    const data1 = editor.getData();
    setserviceExcludes(data1);
  };

  // console.log(
  //   "editServiceIncludes",
  //   editServiceIncludes,
  //   editServiceExcludes,
  //   editDescriptions
  // );

  const updateService = async (e) => {
    e.preventDefault();
    try {
      const serviceId = sid;
      const formdata = new FormData();
      formdata.append("category", editCategory);
      formdata.append("Subcategory", editSubcategory);
      formdata.append("sub_subcategory", editSubcategoryList);
      formdata.append("serviceName", editServiceName);
      editDescriptions.map((desc) => formdata.append("serviceDesc", desc.text));
      formdata.append("servicetitle", editServicetitle);
      formdata.append("servicebelow", editServicebelow);
      editServiceIncludes.map((desc) =>
        formdata.append(
          "serviceIncludes",
          JSON.stringify({
            text: desc.text,
            image: desc.image,
          })
        )
      );
      // formdata.append("serviceIncludes", editServiceIncludes);
      editServiceExcludes.map((desc) =>
        formdata.append(
          "serviceExcludes",
          JSON.stringify({
            text: desc.text,
            image: desc.image,
          })
        )
      );
      // formdata.append("serviceExcludes", editServiceExcludes);
      formdata.append("homepagetitle", edithomePagetitle);
      formdata.append("serviceGst", editServiceGst);
      formdata.append("serviceDirection", editServiceDirection);
      formdata.append("serviceHour", editServiceHour);
      formdata.append("NofServiceman", editNofServiceman);
      if (Image) {
        formdata.append("serviceImg", Image);
      }
      const config = {
        url: `/userapp/updateservices/${serviceId}`,
        method: "put",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log("success");
        alert(response.data.message);
        window.location.assign("/Service");
      }
    } catch (error) {
      console.log(error);
      alert("Unable to complete the request");
    }
  };

  const handleDeleteDesc = async (index) => {
    try {
      // const descriptionTextToDelete = editDescriptions[index].text;
      // Assuming you have a server-side API endpoint for deleting a description
      const response = await axios.delete(
        `http://api.vijayhomeservicebengaluru.in/api/userapp/deleteDescription`,
        {
          data: {
            id: id, // Service ID
            serviceDesc: editDescriptions[index].text, //descriptionText, // Description text to delete
          },
        }
      );

      if (response.status === 200) {
        // Description deleted successfully on the server
        const updatedDescriptions = [...editDescriptions];
        updatedDescriptions.splice(index, 1);
        setEditDescriptions(updatedDescriptions);
      }
    } catch (error) {
      console.error("Error deleting description:", error);
    }
  };

  const handleDeleteIncludes = async (index, descriptionText) => {
    try {
      const response = await axios.delete(
        `http://api.vijayhomeservicebengaluru.in/api/userapp/deleteincludes`,
        {
          data: {
            id: id,
            serviceIncludes: descriptionText,
          },
        }
      );

      if (response.status === 200) {
        const updatedIncludes = [...editServiceIncludes];
        updatedIncludes.splice(index, 1);
        setEditServiceIncludes(updatedIncludes);
      }
    } catch (error) {
      console.error("Error deleting description:", error);
    }
  };

  const handleDeleteExcludes = async (index, descriptionText) => {
    try {
      const response = await axios.delete(
        `http://api.vijayhomeservicebengaluru.in/api/userapp/deleteexcludes`,
        {
          data: {
            id: id,
            serviceExcludes: descriptionText,
          },
        }
      );

      if (response.status === 200) {
        const updatedExcludes = [...editServiceExcludes];
        updatedExcludes.splice(index, 1);
        setEditServiceExcludes(updatedExcludes);
      }
    } catch (error) {
      console.error("Error deleting description:", error);
    }
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row w-100 float-center card mt-4">
          <h3>Edit Service</h3>
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

                <Form.Label className="mt-3">
                  Category <span className="text-danger"> *</span>
                </Form.Label>
                <InputGroup className="mb-2">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option>{Servicedata[0]?.category}</option>
                    {catdata.map((item) => (
                      <option value={item.category}>{item.category}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <Form.Label>
                  Subcategory <span className="text-danger"> *</span>
                </Form.Label>
                <InputGroup className="mb-2">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEditSubcategory(e.target.value)}
                  >
                    <option>{Servicedata[0]?.Subcategory}</option>
                    {categorydata.map((item) => (
                      <option value={item.subcategory}>
                        {item.subcategory}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <Form.Label>Sub-subcategory</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEditSubcategoryList(e.target.value)}
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
                    onChange={(e) => setEditServiceHour(e.target.value)}
                  ></Form.Control>
                </InputGroup>

                <Form.Label>Number of Servicemen </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="maxhr"
                    aria-describedby="basic-addon1"
                    type="number"
                    defaultValue={Servicedata[0]?.NofServiceman}
                    onChange={(e) => setEditNofServiceman(e.target.value)}
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
                    <div>
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
                                {i.startTime}-{i.endTime}
                              </p>
                              <p
                                style={{
                                  backgroundColor: "lightblue",
                                  padding: "10px",
                                }}
                              >
                                {i.Servicesno}
                              </p>
                              <i
                                className="fa-solid fa-trash"
                                style={{
                                  color: "red",
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDeleteClick(index)}
                              ></i>
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
                              const startTime = item.startTime;
                              const endTime = item.endTime;

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
                            <th>Period frequency</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Servicedata[0]?.morepriceData.map((i, index) => (
                            <tr>
                              <td>{i.pName}</td>
                              <td>{i.pPrice}</td>
                              <td>{i.pofferprice}</td>
                              <td>{i.pservices}</td>
                              <td>{i.servicePeriod}</td>

                              <td>
                                {" "}
                                <i
                                  className="fa-solid fa-trash"
                                  style={{
                                    color: "red",
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleDeleteprice(index)}
                                ></i>
                              </td>
                            </tr>
                          ))}
                          {morepriceData.map((i, index) => (
                            <tr>
                              <td>{i.pName}</td>
                              <td>{i.pPrice}</td>
                              <td>{i.pofferprice}</td>
                              <td>{i.pservices}</td>

                              <td>
                                {" "}
                                <i
                                  className="fa-solid fa-trash"
                                  style={{
                                    color: "red",
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleDeleteClick(index)}
                                ></i>
                              </td>
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
                            defaultValue={Servicedata[0]?.serviceName}
                            onChange={(e) => setEditServiceName(e.target.value)}
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
                            onChange={(e) =>
                              setEditServicetitle(e.target.value)
                            }
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
                            onChange={(e) =>
                              setEditServicebelow(e.target.value)
                            }
                          ></Form.Control>
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>
                        Service Description
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      {editDescriptions.map((description, index) => (
                        <>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className="mt-3"
                            placeholder="Include description"
                            defaultValue={description.text}
                            onChange={(e) =>
                              handleEditDesc(index, e.target.value)
                            }
                          />
                          <div
                            className="d-flex mt-2 mb-3"
                            style={{ justifyContent: "flex-end" }}
                          >
                            <i
                              class="fa-solid fa-trash "
                              title="Delete"
                              style={{ color: "#b02727", cursor: "pointer" }}
                              onClick={() => handleDeleteDesc(index)}
                            ></i>
                          </div>
                        </>
                      ))}
                      <div className="d-flex align-items-center">
                        <Form.Control
                          as="textarea"
                          placeholder="Include description"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <Button
                          variant="outline-info"
                          title="Add Description"
                          onClick={handleAddDesc}
                          className="ms-3"
                        >
                          Add
                        </Button>
                      </div>
                    </Form.Group>

                    {/* ewcewcqewc */}
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Includes</Form.Label>
                        <span className="ms-3">
                          {/* <Button
                            variant="outline-info"
                            title="Add Description"
                            onClick={handleAddIncludes}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </Button> */}
                        </span>
                        <img
                          style={{ width: "15px", height: "15px" }}
                          src={`http://api.vijayhomeservicebengaluru.in/service/${Servicedata[0]?.Desimg}`}
                        />
                        {/* {editServiceIncludes?.serviceIncludes.map((i) => ( */}
                        {editServiceIncludes.map((include, index) => (
                          <div>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              className="mt-3"
                              placeholder="Include description"
                              defaultValue={include.text}
                              onChange={(e) =>
                                handleEditIncludes(index, e.target.value)
                              }
                            />
                            <div
                              className="d-flex mt-2 mb-3"
                              style={{ justifyContent: "flex-end" }}
                            >
                              <i
                                class="fa-solid fa-trash  "
                                title="Delete"
                                style={{ color: "#b02727", cursor: "pointer" }}
                                onClick={() =>
                                  handleDeleteIncludes(index, include)
                                }
                              ></i>
                            </div>
                          </div>
                        ))}
                        <div className="d-flex align-items-center">
                          <Form.Control
                            as="textarea"
                            placeholder="Include description"
                            value={newServiceIncludes}
                            onChange={(e) =>
                              setnewServiceIncludes(e.target.value)
                            }
                          />
                          <Button
                            variant="outline-info"
                            title="Add Description"
                            onClick={handleAddIncludes}
                            className="ms-3"
                          >
                            Add
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Excludes</Form.Label>
                        <span className="ms-3">
                          {/* <Button
                            variant="outline-info"
                            title="Add Description"
                            // onClick={handleDeleteIncludes}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </Button> */}
                        </span>
                        <img
                          style={{ width: "15px", height: "15px" }}
                          src={`http://api.vijayhomeservicebengaluru.in/service/${Servicedata[0]?.Inimg}`}
                        />
                        {/* {Servicedata[0]?.serviceExcludes.map((i) => ( */}
                        {editServiceExcludes.map((excludes, index) => (
                          <div>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              className="mt-3"
                              placeholder="Include description"
                              defaultValue={excludes.text}
                              onChange={(e) =>
                                handleEditExcludes(index, e.target.value)
                              }
                            />
                            <div
                              className="d-flex mt-2 mb-3"
                              style={{ justifyContent: "flex-end" }}
                            >
                              <i
                                class="fa-solid fa-trash "
                                title="Delete"
                                style={{ color: "#b02727", cursor: "pointer" }}
                                onClick={() =>
                                  handleDeleteExcludes(index, excludes)
                                }
                              ></i>
                            </div>
                          </div>
                        ))}
                        <div className="d-flex align-items-center">
                          <Form.Control
                            as="textarea"
                            placeholder="Exclude description"
                            value={newServiceExcludes}
                            onChange={(e) =>
                              setnewServiceExcludes(e.target.value)
                            }
                          />
                          <Button
                            variant="outline-info"
                            title="Add Description"
                            onClick={handleAddExcludes}
                            className="ms-3"
                          >
                            Add
                          </Button>
                        </div>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className="mt-3">
                          Home page title
                        </Form.Label>
                        <InputGroup className="mb-2">
                          <Form.Select
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) =>
                              setEdithomePagetitle(e.target.value)
                            }
                          >
                            {Servicedata[0]?.homepagetitle ? (
                              <option>{Servicedata[0]?.homepagetitle}</option>
                            ) : (
                              <option>-- Home page title---</option>
                            )}

                            <option>{Servicedata[0]?.homepagetitle}</option>
                            {homepagetitleData.map((item) => (
                              <option value={item.titleName}>
                                {item.titleName}
                              </option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label className="mt-3">
                          Select Services redirection{" "}
                          <span className="text-danger"> *</span>
                        </Form.Label>

                        <InputGroup className="mb-2 col-3">
                          <Form.Select
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) =>
                              setEditServiceDirection(e.target.value)
                            }
                          >
                            {Servicedata[0]?.serviceDirection ? (
                              <option>
                                {Servicedata[0]?.serviceDirection}
                              </option>
                            ) : (
                              <option>--select --</option>
                            )}

                            <option value="Enquiry">Enquiry</option>
                            <option value="Survey">Survey</option>
                            <option value="DSR">DSR single service</option>
                            <option value="AMC">AMC Service</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className="mt-3">GST Percentage</Form.Label>

                        <Form.Select
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(e) => setEditServiceGst(e.target.value)}
                        >
                          {Servicedata[0]?.serviceGst ? (
                            <option>{Servicedata[0]?.serviceGst}</option>
                          ) : (
                            <option>---Select GST---</option>
                          )}

                          <option value="0.05">5%</option>
                          <option value="0.18">18%</option>
                          <option value="0.22">22%</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    {/* <Row className="mb-3 mt-4">
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
                    </Row> */}
                  </Form>
                  <Button
                    type="button"
                    variant="outline-primary"
                    onClick={() => window.location.assign("/Service")}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    className="btn btn-secondary float-end"
                    // onClick={postformat}
                    onClick={updateService}
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
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Select StartTime </Form.Label>

              <InputGroup className="mb-2 col-3">
                <Form.Select
                  aria-label="startTime"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setstartTime(e.target.value)}
                >
                  <option>-Select-</option>
                  {slotsdata.map((i) => (
                    <option value={i.startTime}>{i.startTime}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Select EndTime </Form.Label>

              <InputGroup className="mb-2 col-3">
                <Form.Select
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setendTime(e.target.value)}
                >
                  <option>-Select-</option>
                  {slotsdata.map((i) => (
                    <option value={i.endTime}>{i.endTime}</option>
                  ))}
                </Form.Select>
              </InputGroup>
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
          <Form.Label className="mt-3">Period frequency</Form.Label>
          <InputGroup className="mb-2 col-3">
            <Form.Select
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setservicePeriod(e.target.value)}
            >
              <option>-Select-</option>

              <option value="monthly">Monthly</option>
              <option value="quart">Quartly</option>
              <option value="half">Half year</option>
              <option value="year">Year</option>
            </Form.Select>
          </InputGroup>
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
