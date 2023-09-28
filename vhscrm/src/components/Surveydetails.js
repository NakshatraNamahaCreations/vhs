import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./layout/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Surveynav from "./Surveynav";
import { Link } from "react-router-dom";
import moment from "moment";

function Createquote() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [techniciandata, settechniciandata] = useState([]);
  const [vendordata, setvendordata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [technician, settechnician] = useState(data.technicianname);
  const [appoDate, setappoDate] = useState(data.nxtfoll);
  const [appoTime, setappTime] = useState(
    data.appoTime ? data.appoTime : moment().format("LT")
  );
  const [sendSms, setsendSms] = useState(data.sendSms);
  const [whatsappdata, setwhatsappdata] = useState([]);
  const [whatsappTemplate, setWhatsappTemplate] = useState("");
  const [type, settype] = useState(data.length > 0 ? data.technicianname : "");
  const handleChange2 = (event) => {
    settype(event.target.value);
  };

  console.log("dsta", data);
  useEffect(() => {
    gettechnician();
  }, []);

  const gettechnician = async () => {
    let res = await axios.get(apiURL + "/getalltechnician");
    if ((res.status = 200)) {
      const TDdata = res.data?.technician;
      const filteredTechnicians = TDdata.filter((technician) => {
        return technician.category.some(
          (cat) => cat.name === data.enquirydata[0].category
        );
      });
      // console.log("filteredTechnicians", filteredTechnicians);
      settechniciandata(
        filteredTechnicians.filter(
          (i) => i.city === data.enquirydata[0].city && i.Type === "executive"
        )
      );
      setvendordata(
        filteredTechnicians.filter(
          (i) => i.city === data.enquirydata[0].city && i.Type === "Vendor"
        )
      );
    }
  };

  console.log("techniciandata", techniciandata, vendordata);

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    let res = await axios.get(apiURL + "/getwhatsapptemplate");
    if (res.status === 200) {
      setwhatsappdata(res.data?.whatsapptemplate);
    }
  };

  let getTemplateDatails = whatsappdata.find(
    (item) => item.templatename === "Survey Add"
  );

  console.log("whatsappData:", getTemplateDatails);
  console.log("technician", technician);
  const Save = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/updateserviceexe/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          technicianname: technician,
          appoDate: appoDate,
          appoTime: appoTime,
          sendSms: sendSms,
          responseType: getTemplateDatails,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          makeApiCall(getTemplateDatails, data.enquirydata[0].contact1);
          alert("Successfully Added");
          navigate(`/quotedetails/${data.EnquiryId}`);
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not Added");
    }
  };

  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const plainText = doc.body.textContent || "";
    return plainText.replace(/\r?\n/g, " "); // Remove all HTML tags but keep line breaks
  }
  const makeApiCall = async (selectedResponse, contactNumber) => {
    const apiURL =
      "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
    const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

    const contentTemplate = selectedResponse?.template || "";

    console.log("Selected response in the makeapi:", whatsappTemplate);
    console.log("Content template:", contentTemplate);

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }
    console.log("91" + data.enquirydata[0].contact1);
    const content = contentTemplate.replace(
      /\{Customer_name\}/g,
      data.enquirydata[0].name
    );
    const contentWithNames = content.replace(
      /\{Staff_name\}/g,
      data?.staffname
    );
    const contentWithMobile = contentWithNames.replace(
      /\{Staff_contact\}/g,
      admin.contactno //check conatct no for Staff_contact
    );
    const technicianName = contentWithMobile.replace(
      /\{Technician_name\}/g,
      technician?.vhsname
    );
    const technicianExperiance = technicianName.replace(
      /\{Technician_experiance\}/g,
      technician?.experiance
    );
    const technicianLanguageKnown = technicianExperiance.replace(
      /\{Technician_languages_known\}/g,
      technician?.languagesknow
    );
    const jobType = technicianLanguageKnown.replace(
      /\{Job_type\}/g,
      data?.category
    );
    const callDate = jobType.replace(/\{Call_date\}/g, data?.nxtfoll);
    const plainTextContent = stripHtml(callDate);
    console.log("plainTextContent", plainTextContent);
    const requestData = [
      {
        dst: "91" + contactNumber,
        messageType: "0",
        textMessage: {
          content: plainTextContent,
        },
      },
    ];
    try {
      const response = await axios.post(apiURL, requestData, {
        headers: {
          "access-token": accessToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setWhatsappTemplate(response.data);
        alert("Sent");
      } else {
        console.error("API call unsuccessful. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const today = new Date();
  const numberOfDaysToAdd = 3;
  const date = today.setDate(today.getDate() + numberOfDaysToAdd);
  const todaydate = new Date(date).toISOString().split("T")[0];

  const editdetails = (data) => {
    navigate(`/editenquiry/${data.EnquiryId}`);
  };

  const quotation = (data) => {
    if (data) {
      navigate(`/quotedetails/${data.EnquiryId}`, { state: { data: data } });
    } else {
      // Handle the case when data is null or undefined
      // For example, show an error message or perform a different action
    }
  };

  return (
    <div className="web">
      <Header />
      {/* <Surveynav /> */}
      <div className="row m-auto">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="row pt-3  ">
                <div className="col-md-2">
                  <button
                    className="vhs-button"
                    style={{ width: "120px" }}
                    onClick={() => editdetails(data)}
                  >
                    Edit Details
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    className="vhs-button mx-5"
                    onClick={() => quotation(data)}
                  >
                    Quotation
                  </button>
                </div>
              </div>

              <form>
                <div className="row mt-4">
                  <div className="">
                    <b>Customer Name : </b>
                    {data.enquirydata[0]?.name}
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>Contact1 : </b>
                      {data.enquirydata[0]?.contact1}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Contact2 : </b>
                      {data.enquirydata[0]?.contact2}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Email : </b>
                      {data.enquirydata[0]?.email}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="">
                      <b>Address : </b>
                      {data.enquirydata[0]?.address}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>Customer Type : </b>
                      {/* {data.enquirydata[0]?.customertype} */}
                      other
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>Comment : </b>
                      {data.enquirydata[0]?.comment}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="card-body p-4">
              <h5>Job Information</h5>
              <hr />
              <form>
                <div className="row">
                  {" "}
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry Date</div>
                    <div className="group pt-1">
                      <input
                        value={data.enquirydata[0]?.enquirydate}
                        className="col-md-12 vhs-input-value"
                        placeholder={data.enquirydate}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry time</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        // defaultValue={data.enquirydata[0]?.time}
                        className="col-md-12 vhs-input-value"
                        value={data.enquirydata[0]?.time}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Apppointment Date</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data.nxtfoll}
                        onChange={(e) => setappoDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Apppointment Time </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        defaultValue={
                          data.appoTime ? data.appoTime : moment().format("LT")
                        }
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setappTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h5>Service and Repair information</h5>
                  <hr />

                  <div className="row">
                    <div className="group pt-1 mt-3">
                      <label>
                        <input
                          type="radio"
                          value="executive"
                          className="custom-radio mx-2"
                          checked={type === "executive"}
                          onChange={handleChange2}
                        />
                        Executive Name
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
                    </div>{" "}
                    <div className="col-md-4 mt-3">
                      {type === "executive" ? (
                        <div>
                          <div className="vhs-input-label">
                            Executive Name
                            {/* <span className="text-danger">*</span> */}
                          </div>
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => {
                              const selectedTechnician = techniciandata.find(
                                (item) => item.vhsname === e.target.value
                              );
                              console.log(
                                "selectedTechnician",
                                selectedTechnician
                              );
                              settechnician(selectedTechnician);
                            }}
                          >
                            {!data.technicianname ? (
                              <option>-select-</option>
                            ) : (
                              <option>{data.technicianname}</option>
                            )}
                            {techniciandata.map((i) => (
                              <option value={i.vhsname}>{i.vhsname}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <div className="vhs-input-label">
                            Vendor Name
                            {/* <span className="text-danger">*</span> */}
                          </div>
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => settechnician(e.target.value)}
                          >
                            {!data.technicianname ? (
                              <option>-select-</option>
                            ) : (
                              <option>{data.technicianname}</option>
                            )}
                            {vendordata.map((i) => (
                              <option value={i.vhsname}>{i.vhsname}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="col-4 mt-3"></div>
                    <div className="col-md-4 mt-3">
                      <div className="vhs-input-label">
                        Send SMS
                        {/* <span className="text-danger">*</span> */}
                      </div>
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setsendSms(e.target.value)}
                      >
                        <option>--select--</option>
                        <option value="NO">NO</option>
                        <option value="YES">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row pt-3 mt-5 ">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={Save}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-2">
                    <Link to="/surveycategory">
                      <button className="vhs-button mx-5">Cancel</button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createquote;
