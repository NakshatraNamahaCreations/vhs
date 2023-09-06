import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import DSRnav from "../components/DSRnav";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Dsrdetails() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const location = useLocation();
  const { data, data1 } = location.state || {};
  const [dsrdata, setdsrdata] = useState([]); 

  const [servicedata, setservicedata] = useState([]);
  const [techniciandata, settechniciandata] = useState([]);
  const [PMdata, setPMdata] = useState([]);
  const [vddata, setvddata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;
  const [bookingDate, setbookingDate] = useState(data.bookingDate);
  const [jobCategory, setjobCategory] = useState(data.jobCategory);
  const [priorityLevel, setpriorityLevel] = useState(
    data.dsrdata[0]?.priorityLevel
  );
  const [appoDate, setappoDate] = useState(dsrdata[0]?.appoDate);
  const [appoTime, setappoTime] = useState(dsrdata[0]?.appoTime);
  const [customerFeedback, setcustomerFeedback] = useState(
    dsrdata[0]?.customerFeedback
  );
  const [jobType, setjobType] = useState(data.jobType);
  const [techComment, settechComment] = useState(dsrdata[0]?.techComment);
  const [techName, settechName] = useState(dsrdata[0]?.techName);
  const [complaintRef, setcomplaintRefo] = useState([]);
  const [vendordata, setvendordata] = useState([]);
  // const [Showinapp, setShowinapp] = useState(
  //   data.dsrdata[0]?.showinApp  ? data.dsrdata[0]?.showinApp : true
  // );
  const [Showinapp, setShowinapp] = useState(
    data.dsrdata[0]?.showinApp || "YES"
  );
  const [jobComplete, setjobComplete] = useState(
    dsrdata[0]?.jobComplete || "NO"
  );
  const [sendSms, setsendSms] = useState(dsrdata[0]?.sendSms);
  const [workerAmount, setworkerAmount] = useState(dsrdata[0]?.workerAmount);
  const [workerName, setworkerName] = useState(dsrdata[0]?.workerName);
  const [daytoComplete, setdaytoComplete] = useState(dsrdata[0]?.daytoComplete || "") ;
  console.log("type--", vddata[0]?.Type);

  // Determine the initial type value for the radio button
  const initialType = vddata ? vddata[0]?.Type : "";

  // Initialize the type state based on the initialType value
  const [type, settype] = useState(vddata[0]?.Type);
  // const [type, settype] = useState(vddata.length > 0 ? vddata[0]?.Type : "");

  const [selectedTechName, setSelectedTechName] = useState(
    dsrdata[0]?.techName
  );

  const [LatestCardNo, setLatestCardNo] = useState(0);

  console.log("new", data);

  useEffect(() => {
    getservices();
    gettechnician();
    getaddcall();
    getAlldata();
  }, []);

  const getservices = async () => {
    let res = await axios.get(apiURL + "/getsubcategory");
    if ((res.status = 200)) {
      setservicedata(res.data?.subcategory);
    }
  };
  const gettechnician = async () => {
    let res = await axios.get(apiURL + "/getalltechnician");
    if ((res.status = 200)) {
      const TDdata = res.data?.technician;
      const filteredTechnicians = TDdata.filter((technician) => {
        return technician.category.some(
          (cat) => cat.name === data.customerData[0].category
        );
      });
      settechniciandata(
        filteredTechnicians.filter(
          (i) =>
            i.city === data.customerData[0]?.city && i.Type === "technician"
        )
      );
      setPMdata(
        filteredTechnicians.filter(
          (i) => i.city === data.customerData[0]?.city && i.Type === "pm"
        )
      );
      setvendordata(
        filteredTechnicians.filter(
          (i) => i.city === data.customerData[0]?.city && i.Type === "Vendor"
        )
      );
      setvddata(
        filteredTechnicians.filter(
          (i) => i._id == dsrdata[0]?.TechorPMorVenodrID
        )
      );
    }
  };

  useEffect(() => {
    getnameof();
  }, [dsrdata]);

  const getnameof = async () => {
    let res = await axios.get(apiURL + "/getalltechnician");
    if ((res.status = 200)) {
      const TDdata = res.data?.technician;
      const filteredTechnicians = TDdata.filter((technician) => {
        return technician.category.some(
          (cat) => cat.name === data.customerData[0].category
        );
      });

      setvddata(
        filteredTechnicians.filter(
          (i) => i._id == dsrdata[0]?.TechorPMorVenodrID
        )
      );
    }
  };

  const handleChange = (event) => {
    setShowinapp(event.target.value);
  };
  const handleChange1 = (event) => {
    setjobComplete(event.target.value);
  };
  const handleChange2 = (event) => {
    console.log("Radio button changed:", event.target.value);
    settype(event.target.value);
  };
  const handleTechNameChange = (event) => {
    setSelectedTechName(event.target.value);
  };

  const newdata = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/adddsrcall",
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          serviceDate: data1,
          cardNo: data.cardNo,
          category: data.category,
          bookingDate: moment().format("DD-MM-YYYY"),
          priorityLevel: priorityLevel,
          appoDate: appoDate,
          appoTime: appoTime,
          customerFeedback: customerFeedback,
          techComment: techComment,
          workerName: workerName,
          workerAmount: workerAmount,
          daytoComplete: daytoComplete,
          backofficerno: admin.contactno,
          techName: techName,
          TechorPMorVendorID: selectedTechName,
          showinApp: Showinapp,
          sendSms: sendSms,
          jobType: jobType,
          type: type,
          jobComplete: jobComplete,
          amount: data.serviceCharge,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");

          window.location.assign("/dsrcategory");
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/updatedsrdata/${dsrdata[0]?._id}`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          bookingDate: bookingDate,

          jobCategory: jobCategory,
          complaintRef: data.complaintRef,
          priorityLevel: priorityLevel,
          appoDate: appoDate,
          appoTime: appoTime,
          customerFeedback: customerFeedback,
          jobType: jobType,
          techComment: techComment,
          backofficerExe: admin.displayname,
          techName: techName,
          showinApp: Showinapp,
          sendSms: sendSms,
          type: type,
          jobComplete: jobComplete,
          workerAmount: workerAmount,
          workerName: workerName,
          daytoComplete: daytoComplete,
          TechorPMorVendorID: selectedTechName,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");

          window.location.assign("/dsrcategory");
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  const getaddcall = async () => {
    let res = await axios.get(apiURL + "/getalldsrlist");
    if (res.status === 200) {
      setLatestCardNo(res.data?.addcall[0]?.complaintRef);
      // console.log("allCustomer----", res.data?.addcall[0]?.complaintRef);
    }
  };

  const getAlldata = async () => {
    let res = await axios.get(apiURL + "/getaggredsrdata");
    if (res.status === 200) {
      setdsrdata(
        res.data.addcall.filter(
          (i) => i.serviceDate === data1 && i.cardNo == data.cardNo
        )
      );
      console.log(
        res.data.addcall.filter(
          (i) => i.serviceDate === data1 && i.cardNo == data.cardNo
        )
      );
      setcomplaintRefo(
        res.data?.addcall.filter((i) => i.cardNo === data.cardNo)
      );
    }
  };

  let i = 1;
  return (
    <div className="web">
      <Header />
      <DSRnav />

      <div className="row m-auto ">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <h5>Job Information</h5>
              <hr />

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label">Booking Date</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      defaultValue={
                        data.dsrdata[0]?.bookingDate
                          ? data.dsrdata[0]?.bookingDate
                          : moment().format("DD-MM-YY")
                      }
                      onChange={(e) => setbookingDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="vhs-input-label">Complaint Ref. </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="253773637"
                      // defaultValue={}
                      value={
                        data.dsrdata[0]?.complaintRef
                          ? data.dsrdata[0]?.complaintRef + 1
                          : LatestCardNo + 1
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label">Priority Level</div>
                  <div className="group pt-1">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setpriorityLevel(e.target.value)}
                    >
                      {data.dsrdata[0]?.priorityLevel ? (
                        <option>{data.dsrdata[0]?.priorityLevel}</option>
                      ) : (
                        <option>--select--</option>
                      )}
                      <option>High</option>
                      <option>Low</option>
                      <option>Normal</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Appointment Date</div>
                  <div className="group pt-1">
                    <input
                      type="date"
                      className="col-md-12 vhs-input-value"
                      defaultValue={data1}
                      onChange={(e) => setappoDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="vhs-input-label">Appointment Time</div>
                  <div className="group pt-1">
                    <input
                      type="time"
                      className="col-md-12 vhs-input-value"
                      defaultValue={dsrdata[0]?.appoTime}
                      onChange={(e) => setappoTime(e.target.value)}
                    />
                    <p>Time Given</p>
                  </div>
                </div>
              </div>

              <h5>Customer Information</h5>
              <hr />

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label">Customer Name</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.customerName}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Card No</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">{data.cardNo}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Contact 1</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.mainContact}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label"> Contact 2</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.alternateContact}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Address</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {" "}
                      {data.customer[0]?.cnap},{data.customer[0]?.rbhf},
                      {data.customer[0]?.lnf}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label"> Email Id</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label">City</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.city}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Customer Type</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.customerType}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label"> Special Instruction</div>
                  <div className="group pt-1">
                    <div className="vhs-non-editable">
                      {data.customer[0]?.instructions}
                    </div>
                  </div>
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
                        Payment Date
                      </th>
                      <th className="table-head" scope="col">
                        Description
                      </th>
                      <th className="table-head" scope="col">
                        Charges
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {data.map((item) => ( */}
                    <tr>
                      <td>{i++}</td>
                      <td>{data?.category}</td>
                      <td>{data?.contractType}</td>
                      <td>{data?.service}</td>
                      <td>{data?.serviceFrequency}</td>
                      <td>
                        {data?.dateofService}/{data?.expiryDate}
                      </td>
                      <td>{data1}</td>
                      <td>
                        {data.contractType === "AMC" ? (
                          <ul>
                            {data.dividedamtDates.map((a, index) => {
                              const formattedDate = new Date(a)
                                .toLocaleDateString()
                                .split("/")
                                .reverse()
                                .join("-");
                              return (
                                <p key={index}>
                                  {formattedDate === data1 ? data1 : ""}
                                </p>
                              );
                            })}
                          </ul>
                        ) : (
                          data.dateofService
                        )}
                      </td>
                      <td>{data?.desc}</td>

                      <td>
                        {data.contractType === "AMC" ? (
                          <ul>
                            {data.dividedamtDates.map((a, index) => {
                              const formattedDate = new Date(a)
                                .toLocaleDateString()
                                .split("/")
                                .reverse()
                                .join("-");
                              return (
                                <p key={index}>
                                  {formattedDate === data1 ? (
                                    <>
                                      {data.dividedamtCharges.length > 0 && (
                                        <div>
                                          <p>{data.dividedamtCharges[0]}</p>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              );
                            })}
                          </ul>
                        ) : (
                          data.dateofService
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <h5 className="mt-5">Service & Repair Information</h5>
        <hr />

        <div className="row pt-3">
          <div className="row">
            <div className="col-6 d-flex">
              <div className="col-4">Customer Feedback</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <textarea
                  name="postContent"
                  rows={5}
                  cols={20}
                  className="col-md-12 vhs-input-label"
                  onChange={(e) => setcustomerFeedback(e.target.value)}
                  defaultValue={dsrdata[0]?.customerFeedback}
                />
              </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Technician Comment </div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <textarea
                  name="postContent"
                  rows={2}
                  cols={40}
                  className="col-md-12 vhs-input-label"
                  defaultValue={dsrdata[0]?.techComment}
                  onChange={(e) => settechComment(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="row">
            <div className="col-6 d-flex">
              <div className="col-4">Worker Names</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <textarea
                  name="postContent"
                  rows={4}
                  cols={40}
                  className="col-md-12 vhs-input-label"
                  defaultValue={dsrdata[0]?.workerName}
                  onChange={(e) => setworkerName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">Worker Amount </div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <textarea
                  name="postContent"
                  rows={4}
                  cols={40}
                  className="col-md-12 vhs-input-label"
                  defaultValue={dsrdata[0]?.workerAmount}
                  onChange={(e) => setworkerAmount(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="row">
            <div className="col-6 d-flex">
              <div className="col-4">Day To Complete</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <input
                  type="date"
                  className="col-md-12 vhs-input-value"
                  defaultValue={dsrdata[0]?.daytoComplete}
                  onChange={(e) => setdaytoComplete(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-3">
          <div className="row">
            <div className="col-6 d-flex">
              <div className="col-4">Logged User</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <p style={{ marginBottom: 0 }}> {admin.displayname}</p>
                <p>{admin.contactno}</p>
              </div>
            </div>
            {dsrdata[0]?.jobAmount ? (
              <div className="col-6 d-flex">
                <div className="col-4">Payment amount</div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <p style={{ marginBottom: 0 }}> {dsrdata[0]?.jobAmount}</p>
                </div>
              </div>
            ) : (
              <div className="col-6 d-flex"></div>
            )}
          </div>
        </div>

        <div className="row pt-3">
          <div className="row">
            <div className="col-6 d-flex">
              <div className="col-4">Backoffice Executive</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <p style={{ marginBottom: 0 }}> {data.BackofficeExecutive}</p>
                {/* <p>{data.backofficerno}</p> */}
              </div>
            </div>

            <div className="col-6 d-flex">
              <div className="group pt-1 col-6">
                <label>
                  <input
                    type="radio"
                    value="PM"
                    className="custom-radio mx-2"
                    checked={type === "PM"}
                    onChange={handleChange2}
                  />
                  PM
                </label>
                <label className="mx-3">
                  <input
                    type="radio"
                    value="technician"
                    className="custom-radio mx-2"
                    checked={type === "technician"}
                    onChange={handleChange2}
                  />
                  TECH
                </label>
                <label className="mx-3">
                  <input
                    type="radio"
                    value="Vendor"
                    className="custom-radio mx-2"
                    checked={type === "Vendor"}
                    onChange={handleChange2}
                  />
                  Vendor
                </label>
              </div>

              <div className="group pt-1 col-6">
                <select
                  className="col-md-12 vhs-input-value"
                  onChange={handleTechNameChange}
                  value={selectedTechName}
                >
                  {vddata[0]?.vhsname ? (
                    <option>{vddata[0]?.vhsname}</option>
                  ) : (
                    <option>--select--</option>
                  )}
                  {type === "technician" &&
                    techniciandata.map((item) => (
                      <option key={item.id} value={item._id}>
                        {item.vhsname}
                      </option>
                    ))}
                  {type === "PM" &&
                    PMdata.map((item) => (
                      <option key={item.id} value={item._id}>
                        {item.vhsname}
                      </option>
                    ))}
                  {type === "Vendor" &&
                    vendordata.map((item) => (
                      <option key={item.id} value={item._id}>
                        {item.vhsname}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-3">
          <div className="row">
            {/* <div className="col-6 d-flex">
              <div className="col-4">SHOW IN APP</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <div className="d-flex">
                  <label>
                    <input
                      type="radio"
                      value="YES"
                      className="custom-radio mx-2"
                      checked={Showinapp === "YES"}
                      onChange={handleChange}
                    />
                    YES
                  </label>
                  <label className="mx-5">
                    <input
                      type="radio"
                      value="NO"
                      className="custom-radio mx-2"
                      checked={Showinapp === "NO"}
                      onChange={handleChange}
                    />
                    NO
                  </label>
                </div>
              </div>
            </div> */}

            <div className="col-6 d-flex">
              <div className="col-4">Send SMS</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                <select
                  className="col-md-12 vhs-input-value"
                  onChange={(e) => setsendSms(e.target.value)}
                >
                  {dsrdata[0]?.sendSms ? (
                    <option>{dsrdata[0]?.sendSms}</option>
                  ) : (
                    <option>--select--</option>
                  )}
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-3">
          <div className="row">
            <div className="col-6 d-flex">
              <div className="col-4">(IN) Sign Date & Time</div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                {dsrdata[0]?.startJobTime
                  ? new Date(dsrdata[0]?.startJobTime)
                     
                  : "0000-00-00 00:00:00"}
              </div>
            </div>

            <div className="col-6 d-flex">
              <div className="col-4">
                (OUT) Sign Date & Time
                <span className="text-danger">*</span>
              </div>
              <div className="col-1">:</div>
              <div className="group pt-1 col-7">
                {dsrdata[0]?.endJobTime
                  ? moment(dsrdata[0]?.endJobTime)
                      .utc()
                      .format("YYYY-MM-DD h:mm:ss a")
                  : "0000-00-00 00:00:00"}
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 d-flex">
          <div className="col-4">
            Job Complete
            <span className="text-danger">*</span>
          </div>
          <div className="col-1">:</div>
          <div className="group pt-1 col-7">
            <label>
              <input
                type="radio"
                value="YES"
                className="custom-radio mx-2"
                checked={jobComplete === "YES"}
                onChange={handleChange1}
              />
              YES
            </label>
            <label className="mx-3">
              <input
                type="radio"
                value="NO"
                className="custom-radio mx-2"
                checked={jobComplete === "NO"}
                onChange={handleChange1}
              />
              NO
            </label>
            <label className="mx-3">
              <input
                type="radio"
                value="CANCEL"
                className="custom-radio mx-2"
                checked={jobComplete === "CANCEL"}
                onChange={handleChange1}
              />
              CANCEL
            </label>
          </div>
        </div>
      
      <div className="row pt-3  m-auto justify-content-center mt-4">
        <div className="col-md-2">
          {!dsrdata[0] ? (
            <button className="vhs-button" onClick={newdata}>
              Save
            </button>
          ) : (
            <button className="vhs-button" onClick={save}>
              Update
            </button>
          )}
        </div>
        <div className="col-md-2">
          <button className="vhs-button">Cancel</button>
        </div>
        <div className="col-md-2">
          {!data?.quotedata ? (
            <button className="vhs-button">Invoice</button>
          ) : (
            <Link to="/dsrquote" state={{ data: data, data1: data1 }}>
              <button className="vhs-button">Invoice</button>
            </Link>
          )}
        </div>
        <div className="col-md-2">
          <button className="vhs-button">Bill SMS</button>
        </div>
        <div className="col-md-2">
          <button className="vhs-button">Bill Whatsapp</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dsrdetails;
