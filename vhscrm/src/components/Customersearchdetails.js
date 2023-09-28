import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import Customernav from "../components/Customernav";
import moment from "moment";
import { Button, Modal, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";

function Customersearchdetails() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const apiURL = process.env.REACT_APP_API_URL;
  const [serviceCharge, setserviceCharge] = useState("");
  const [dateofService, setdateofService] = useState([]);
  const [desc, setdesc] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [serviceFrequency, setserviceFrequency] = useState(1);
  const [expiryDate, setexpiryDate] = useState("00-00-0000");
  const [category, setcategory] = useState("");
  const [firstserviceDate, setfirstserviceDate] = useState("00-00-0000");
  const [contractType, setcontractType] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [treatment, settreatment] = useState("");
  const [oneCommunity, setOneCommunity] = useState({}); //string to obj
  const [treatmentdata, settreatmentdata] = useState([]);
  const [customerdata, setcustomerdata] = useState([]);
  const [servicedata, setservicedata] = useState([]);
  const [editenable, seteditEnable] = useState(false);
  const [amtFrequency, setamtFrequency] = useState("");
  const [firstDateamt, setfirstDateamt] = useState("");
  const [expiryDateamt, setexpiryDateamt] = useState("");
  const [communityData, setCommunityData] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [newCharge, setnewCharge] = useState("");
  // delivery address
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLankmark] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [viewAddress, setViewAddress] = useState(false);

  useEffect(() => {
    const getcustomer = async () => {
      try {
        let res = await axios.get(apiURL + "/getcustomer");
        if (res.status === 200) {
          setcustomerdata(res.data?.customers.filter((i) => i.cardNo == id));
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getcustomer();
  }, []);

  // useEffect(() => {
  //   getsubcategory();
  // }, [category]);
  useEffect(() => {
    const getcategory = async () => {
      try {
        let res = await axios.get(apiURL + "/getcategory");
        if ((res.status = 200)) {
          setCategoryData(res.data?.category);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    getcategory();
  }, []);

  useEffect(() => {
    const getsubcategory = async () => {
      try {
        let res = await axios.post(apiURL + `/postsubcategory/`, { category });
        if ((res.status = 200)) {
          setservicedata(res.data?.subcategory);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getsubcategory();
  }, [category]);

  useEffect(() => {
    const getServicebyCategory = async () => {
      try {
        let res = await axios.post(apiURL + `/userapp/getservicebycategory/`, {
          category,
        });
        if (res.status === 200) {
          setServiceDetails(res.data?.serviceData);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    getServicebyCategory();
  }, [category]);

  useEffect(() => {
    const gettreatment = async () => {
      try {
        let res = await axios.get(apiURL + "/getservicedetails");
        if (res.status === 200) {
          console.log("treatmentdata", res);
          const filteredData = res.data?.servicedetails.filter(
            (i) => i.cardNo == id
          );

          // Calculate totalCharge for each item in the array
          filteredData.forEach((item) => {
            const oneCommunity = parseInt(item.oneCommunity);
            const serviceCharge = parseInt(item.serviceCharge);

            if (!isNaN(oneCommunity) && !isNaN(serviceCharge)) {
              const totalCharge = serviceCharge - oneCommunity;
              console.log(
                "Total Charge for item with cardNo " +
                  item.cardNo +
                  ": " +
                  totalCharge
              );
              // You can choose to store the totalCharge value back to the item if needed.
              // Store the difference (divided charges) in the item object
              item.dividedCharges = totalCharge;
              setnewCharge(item.dividedCharges);

              console.log("hey", totalCharge);
            } else {
              console.log(
                "One or both values are not valid numbers for item with cardNo " +
                  item.cardNo
              );
            }
          });

          // Update the state with the filtered data containing the calculated totalCharge
          settreatmentdata(filteredData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    gettreatment();
  }, []);

  //community details
  const getCommunityDetails = async () => {
    let res = await axios.get(apiURL + "/getcommunity");
    if (res.status === 200) {
      setCommunityData(res.data?.community);
    }
  };

  useEffect(() => {
    try {
      getCommunityDetails();
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  const sDate = moment(dateofService, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);

  const dividedDates = [];

  for (let i = 0; i < serviceFrequency; i++) {
    const date = sDate.clone().add(interval * i, "days");
    dividedDates.push(date);
  }
  const communityPercentage = (serviceCharge * oneCommunity.percentage) / 100; //this line
  const remainingAmt = oneCommunity.percentage
    ? serviceCharge - communityPercentage
    : serviceCharge;
  const sAmtDate = moment(firstDateamt, "YYYY-MM-DD");
  const eamtDate = moment(expiryDateamt, "YYYY-MM-DD");

  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);
  const dividedamtCharge = Math.ceil(remainingAmt / amtFrequency);

  const dividedamtDates = [];
  const dividedamtCharges = [];

  for (let i = 0; i < amtFrequency; i++) {
    const date = sDate.clone().add(intervalamt * i, "days");
    dividedamtDates.push(date);

    const charge =
      i === amtFrequency - 1
        ? remainingAmt - dividedamtCharge * (amtFrequency - 1)
        : dividedamtCharge;
    dividedamtCharges.push(charge);
  }

  const addtreatmentdetails = async (e) => {
    e.preventDefault();
    if (!contractType || !treatment) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: "/addservicedetails",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            customerData: customerdata,
            dividedDates: dividedDates,
            dividedamtDates: dividedamtDates,
            dividedamtCharges: dividedamtCharges,
            cardNo: id,
            dCategory: customerdata[0].category,
            category: category,
            contractType: contractType,
            service: treatment,
            serviceID: serviceId,
            serviceCharge: serviceCharge,
            dateofService: dateofService,
            deliveryAddress: addingDeliveryAddress,
            desc: desc,
            serviceFrequency: serviceFrequency,
            startDate: dateofService,
            expiryDate: expiryDate,
            firstserviceDate: firstserviceDate,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
            communityId: oneCommunity._id, //this line
            oneCommunity: communityPercentage, //thi line
            BackofficeExecutive: admin.displayname,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Added");
            window.location.reload("");
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const deleteservicedeatils = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deleteservicedetails/" + id,
    })
      .then(function (response) {
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const editservicedetails = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/editservicedetails/${editenable._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {},
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

  const addDeliveryAddress = async (e) => {
    e.preventDefault();
    try {
      const cardNo = id;
      const config = {
        url: `/addDeliveryAddress/${cardNo}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          deliveryAddress: {
            houseNumber: houseNumber,
            streetName: streetName,
            city: city,
            state: state,
            pincode: pincode,
            landMark: landmark,
          },
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert(response.data.success);
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error("error", error);
      alert(error.response.data.error);
    }
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [highlightRow, setHighlightRow] = useState(false);

  const handleRowClick = (row) => {
    const deliveryAddresses = customerdata?.map((ele) => ele.deliveryAddress);
    let deliveryAddressesfilter = deliveryAddresses?.map((ele) =>
      ele.filter((item) => item._id === row)
    );
    setSelectedRow(deliveryAddressesfilter);
    setHighlightRow(true);
  };

  const addingDeliveryAddress = selectedRow?.flatMap((address) =>
    address.flatMap((item) => item)
  );

  const columns = [
    {
      name: "Sl No",
      selector: (row, i) => <div>{i + 1}</div>,
    },
    {
      name: "Room/House/Flat No",
      selector: "houseNumber",
    },
    {
      name: "Colony/Apartment/Plot Name",
      selector: "streetName",
    },
    {
      name: "City",
      selector: "city",
    },
    {
      name: "State",
      selector: "state",
    },
    {
      name: "Pincode",
      selector: "pincode",
    },
    {
      name: "Landmark/Near By Famous Place",
      selector: "landMark",
    },
  ];

  let i = 1;

  const extractArray = customerdata.flatMap((item) =>
    item.deliveryAddress.map((address) => ({
      ...item,
      ...address,
    }))
  );

  return (
    <div className="web">
      <Header />
      <Customernav />
      <div></div>
      <div className="row m-auto">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <form>
                {customerdata.map((item) => (
                  <div>
                    <div className="row">
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Customer Name :</b>
                        </div>
                        <div
                          className="group p-2"
                          style={{
                            outline: "none",
                            border: "1px solid #eee",
                            borderRadius: "3px",
                            borderLeft: "2px solid #a9042e",
                            backgroundColor: "#d6d6d6",
                          }}
                        >
                          {item.customerName}{" "}
                        </div>
                      </div>

                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Mobile No : </b>
                        </div>
                        <div
                          className="group p-2"
                          style={{
                            outline: "none",
                            border: "1px solid #eee",
                            borderRadius: "3px",
                            borderLeft: "2px solid #a9042e",
                            backgroundColor: "#d6d6d6",
                          }}
                        >
                          {item.mainContact}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Email : </b>
                        </div>
                        <div
                          className="group p-2"
                          style={{
                            outline: "none",
                            border: "1px solid #eee",
                            borderRadius: "3px",
                            borderLeft: "2px solid #a9042e",
                            backgroundColor: "#d6d6d6",
                          }}
                        >
                          {item.email}
                        </div>
                      </div>

                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Address : </b>
                        </div>
                        <div
                          className="group p-2"
                          style={{
                            outline: "none",
                            border: "1px solid #eee",
                            borderRadius: "3px",
                            borderLeft: "2px solid #a9042e",
                            backgroundColor: "#d6d6d6",
                          }}
                        >
                          {item.rbhf},{item.cnap},{item.lnf}
                        </div>
                        <div style={{ fontSize: "12px" }}>
                          <b style={{ cursor: "pointer" }} onClick={handleShow}>
                            Add Delivery Address
                          </b>{" "}
                          <b
                            className="ms-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => setViewAddress(true)}
                          >
                            View Delivery Address
                          </b>
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <Link to="/customeredit" state={{ data: item }}>
                          <button
                            className="px-3 py-1"
                            style={{
                              border: "none",
                              borderRadius: "3px",
                              backgroundColor: "#a9042e",
                              color: "white",
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
            <div className="card-body p-4">
              {viewAddress ? (
                <>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <h5>Delivery Address</h5>
                    <i
                      class="fa-solid fa-xmark"
                      title="Close"
                      style={{ cursor: "pointer" }}
                      onClick={() => setViewAddress(false)}
                    ></i>
                  </div>

                  <hr />

                  <div>
                    <DataTable
                      columns={columns}
                      data={extractArray}
                      pagination
                      fixedHeader
                      selectableRowsHighlight
                      subHeaderAlign="left"
                      highlightOnHover
                      onRowClicked={(row) => {
                        handleRowClick(row._id);
                        // setHighlightRow(!highlightRow);
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className="card-body p-4">
              <h5>Treatment Details</h5>
              <hr />
              {!editenable ? (
                <>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                          name="material"
                        >
                          <option>--select--</option>
                          {categoryData.map((category, index) => (
                            <option key={index} value={category.category}>
                              {category.category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Contract type
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          name="region"
                          onChange={(e) => setcontractType(e.target.value)}
                        >
                          <option>--select--</option>

                          <option value="One Time">One Time</option>
                          <option value="AMC">AMC</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Treatment
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => {
                            const selectedService = serviceDetails.find(
                              (item) => item._id === e.target.value
                            );
                            setServiceId(e.target.value);
                            settreatment(
                              selectedService
                                ? selectedService.serviceName &&
                                    selectedService.servicetitle
                                : ""
                            );
                          }}
                          name="material"
                        >
                          <option>--select--</option>
                          {serviceDetails.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item.serviceName}/{item.servicetitle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {contractType === "One Time" ? (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                              defaultValue={editenable.serviceCharge}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Date of Service
                            </div>
                            <input
                              type="date"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                              defaultValue={editenable.dateofService}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                              defaultValue={editenable.desc}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Frequency{" "}
                              <span className="text-danger">*</span>
                            </div>

                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setserviceFrequency(e.target.value)
                              }
                              defaultValue={editenable.serviceFrequency}
                            />
                            <span style={{ fontSize: "10px" }}>
                              (Total No. Of Services In Given Contract Period)
                            </span>
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              1st Service Date
                            </div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Expiry Date</div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setexpiryDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">1 Community</div>
                            <select
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setOneCommunity(
                                  //find function
                                  communityData.find(
                                    (i) => i._id === e.target.value
                                  )
                                )
                              }
                            >
                              <option value="">--Select--</option>
                              {communityData.map((community) => (
                                <option
                                  key={community._id}
                                  value={community._id}
                                >
                                  {community.communityn}{" "}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Amount Frequency
                            </div>

                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setamtFrequency(e.target.value)}
                              defaultValue={editenable.amtFrequency}
                            />
                            {/* <span style={{ fontSize: "10px" }}>
                              (Total No. Of Services In Given Contract Period)
                            </span> */}
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              1st Service Amt Date
                            </div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setfirstDateamt(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Amt Expiry Date
                            </div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setexpiryDateamt(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-md-4 pt-3 mt-4 justify-content-center">
                      <div className="col-md-2 ">
                        <button
                          className="vhs-button"
                          onClick={addtreatmentdetails}
                        >
                          Add Item
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                          name="material"
                        >
                          <option>{editenable.category}</option>
                          {admin?.category.map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Contract type
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          name="region"
                          onChange={(e) => setcontractType(e.target.value)}
                        >
                          <option>{editenable.contractType}</option>

                          <option value="One Time" disabled>
                            One Time
                          </option>
                          <option value="AMC" disabled>
                            AMC
                          </option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Treatment
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => settreatment(e.target.value)}
                          name="material"
                        >
                          <option>--select--</option>
                          {servicedata.map((item) => (
                            <option value={item.subcategory}>
                              {item.subcategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {contractType === "One Time" ? (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Date of Service
                            </div>
                            <input
                              type="date"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setfirstserviceDate(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Frequency
                            </div>

                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setserviceFrequency(e.target.value)
                              }
                              defaultValue={editenable.serviceFrequency}
                            />
                            <span style={{ fontSize: "10px" }}>
                              (Total No. Of Services In Given Contract Period)
                            </span>
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Start Date</div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                              defaultValue={editenable.startDate}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Expiry Date</div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setexpiryDate(e.target.value)}
                              defaultValue={editenable.expiryDate}
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                              defaultValue={editenable.serviceCharge}
                            />
                          </div>

                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              1st Service Date{" "}
                            </div>
                            <input
                              type="date"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setfirstserviceDate(e.target.value)
                              }
                              defaultValue={editenable.firstserviceDate}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                              defaultValue={editenable.desc}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-md-4 pt-3 mt-4 justify-content-center">
                      <div className="col-md-2 ">
                        <button
                          className="vhs-button"
                          onClick={editservicedetails}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h6>Treatment Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Category
                  </th>
                  <th className="table-head" scope="col">
                    Cont.Type
                  </th>
                  <th className="table-head" scope="col">
                    Treatment
                  </th>
                  <th className="table-head" scope="col">
                    Service Freq.
                  </th>
                  <th className="table-head" scope="col">
                    Contract Period
                  </th>
                  <th className="table-head" scope="col">
                    Service Date
                  </th>
                  <th className="table-head" scope="col">
                    Amount paid Date
                  </th>
                  <th className="table-head" scope="col">
                    Total Charges
                  </th>
                  <th className="table-head" scope="col">
                    Description
                  </th>
                  <th className="table-head" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <div></div>
                {treatmentdata.map((item) => (
                  <tr>
                    <td>{i++}</td>
                    <td>{item.category}</td>
                    <td>{item.contractType}</td>
                    <td>{item.service}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.contractType === "AMC"
                        ? item.serviceFrequency
                        : "-"}
                    </td>
                    <td>
                      {item.contractType === "AMC" ? (
                        <>
                          {item.startDate} / {item.expiryDate}
                        </>
                      ) : (
                        item.dateofService
                      )}
                    </td>
                    {item.contractType === "AMC" ? (
                      <td>
                        {item.dividedDates.map((a) => (
                          <div>
                            <p>{new Date(a.date).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </td>
                    ) : (
                      <td>{item.dateofService}</td>
                    )}
                    {item.contractType === "AMC" ? (
                      <td>
                        {item.dividedamtDates.map((a) => (
                          <div>
                            <p>{new Date(a.date).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </td>
                    ) : (
                      <td>{item.dateofService}</td>
                    )}
                    <td>
                      {item.communityId
                        ? item.dividedCharges
                        : item.serviceCharge}
                    </td>

                    <td>{item.desc}</td>

                    <td>
                      {" "}
                      <a>
                        <i
                          class="fa-solid fa-pen-to-square"
                          onClick={() => seteditEnable(item)}
                        ></i>{" "}
                        |
                      </a>
                      <a>
                        <i
                          class="fa-solid fa-trash"
                          style={{ color: "rgb(228, 47, 47)" }}
                          onClick={() => deleteservicedeatils(item._id)}
                        ></i>{" "}
                        |
                      </a>
                      <Link to="/servicebill" state={{ data: item }}>
                        <b style={{ color: "blue" }}>BILL</b>
                      </Link>
                    </td>
                  </tr>
                ))}

                <tr style={{ background: "lightgray" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "center" }}> </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h6>Previous / Past Service & Complaint Calls Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Cr.Date
                  </th>
                  <th className="table-head" scope="col">
                    Job Category
                  </th>
                  <th className="table-head" scope="col">
                    Complaints
                  </th>
                  <th className="table-head" scope="col">
                    Technician
                  </th>
                  <th className="table-head" scope="col">
                    Status
                  </th>
                  <th className="table-head" scope="col">
                    Service Details
                  </th>
                  <th className="table-head" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {quoteflowdata.map((item) => (
                  <div className="tbl">
                    {item.quotefollup.map((item) => (
                      <div className="tbl">
                        <tr className="user-tbale-body tbl1">
                          <td>{i++}</td>
                          <td>{item.folldate}</td>
                          <td>{item.staffname}</td>
                          <td>{item.response}</td>
                          <td>{item.descrption}</td>
                          <td>{item.quotenxtfoll}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </div>
                    ))}
                  </div>
                ))} */}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h6>Next / Future Service Calls Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Treatment
                  </th>
                  <th className="table-head" scope="col">
                    Service Date
                  </th>
                  <th className="table-head" scope="col">
                    Amount Paid Date
                  </th>
                  <th className="table-head" scope="col">
                    Service Charges
                  </th>
                  <th className="table-head" scope="col">
                    Service Count
                  </th>
                  <th className="table-head" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {treatmentdata.map((item, index) => (
                  <div className="tbl">
                    <tr className="user-tbale-body tbl1">
                      <td>{index++}</td>
                      <td>{item.service}</td>
                      {item.contractType === "AMC" ? (
                        <td>
                          {item.dividedDates.map((a) => (
                            <div>
                              <p>{new Date(a.date).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td>{item.dateofService}</td>
                      )}
                      {item.contractType === "AMC" ? (
                        <td>
                          {item.dividedamtDates.map((a) => (
                            <div>
                              <p>{new Date(a.date).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td>{item.dateofService}</td>
                      )}
                      {item.contractType === "AMC" ? (
                        <td>
                          {item.dividedamtCharges.map((charge, index) => (
                            <div key={index}>
                              <p>{charge.charge}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td>{item.serviceCharge}</td>
                      )}

                      <td></td>
                      <td></td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* delivery address */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deliver Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row px-3">
            <div className="vhs-sub-heading mt-3">
              <h5>Customer Detail Address</h5>
            </div>
            <div className="col-md-4 pt-3">
              <div className="vhs-input-label">Room/House/Flat No.</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setHouseNumber(e.target.value)}
                  // value={rbhf}
                />
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="vhs-input-label">Colony/Apartment/Plot Name</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setStreetName(e.target.value)}
                  // value={cnap}
                />
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="vhs-input-label">
                Landmark/Near By Famous Place
              </div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setLankmark(e.target.value)}
                  // value={lnf}
                />
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="vhs-input-label">City</div>
              <div className="group pt-1">
                <select
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {/* <option value={data.city}>{data.city}</option> */}
                  <option value="">Select</option>
                  {admin?.city.map((item) => (
                    <option defaultValue={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="vhs-input-label">State</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setState(e.target.value)}
                  // value={mainarea}
                />
              </div>
            </div>
            <div className="col-md-4 pt-3">
              <div className="vhs-input-label">Pincode</div>
              <div className="group pt-1">
                <input
                  type="text"
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setPincode(e.target.value)}
                  // value={pincode}
                />
              </div>
            </div>
            {/* <div className="col-md-4 pt-3">
                              <div className="vhs-input-label">Pincode</div>
                              <div className="group pt-1">
                                <input
                                  type="text"
                                  className="col-md-12 vhs-input-value"
                                  onChange={(e) => setState(e.target.value)}
                                  // value={pincode}
                                />
                              </div>
                            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addDeliveryAddress}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Customersearchdetails;
