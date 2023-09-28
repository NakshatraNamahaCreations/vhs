import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Enquirynav from "../Enquirynav";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const defaultstate = 1;

function Enquiryadd() {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [citydata, setcitydata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [latestEnquiryId, setLatestEnquiryId] = useState(0);
  const [whatsappTemplate, setWhatsappTemplate] = useState("");
  const [enquirydate, setenquirydate] = useState(moment().format("MM-DD-YYYY"));
  const [executive, setexecutive] = useState("pankaj");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact1, setcontact1] = useState("");
  const [contact2, setcontact2] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [category, setcategory] = useState("");
  const [reference1, setreference1] = useState("");
  const [reference2, setreference2] = useState("");
  const [reference3, setreference3] = useState("");
  const [comment, setcomment] = useState("");
  const [intrestedfor, setinterestedfor] = useState("");
  const [time, settime] = useState(moment().format("h:mm:ss a"));

  const apiURL = process.env.REACT_APP_API_URL;
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [referecetypedata, setreferecetypedata] = useState([]);
  const [enquirydata, setenquirydata] = useState([]);
  const [whatsappdata, setwhatsappdata] = useState([]);

  useEffect(() => {
    getenquiry();
  }, []);

  const getenquiry = async () => {
    let res = await axios.get(apiURL + "/getenquiry");
    if (res.status === 200) {
      setenquirydata(res.data?.enquiryadd);
      // console.log("enquiryData===", res.data?.enquiryadd);
      setLatestEnquiryId(res.data?.enquiryadd[0]?.EnquiryId);
    }
  };

  if (enquirydata.length > 0) {
    var firstElement = enquirydata[0];
    var count = firstElement.count;
    // console.log(count);
  } else {
    console.log("The enquirydata array is empty.");
  }

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
    (item) => item.templatename === "Enquiry Add"
  );

  console.log("whatsappData:", getTemplateDatails);

  const addenquiry = async (e) => {
    e.preventDefault();

    // if (
    //   !name ||
    //   !email ||
    //   !contact1 ||
    //   !city ||
    //   !category ||
    //   !reference1
    //   // !intrestedfor
    // ) {
    //   alert("Please enter all fields");
    // } else {
    try {
      const config = {
        url: "/addenquiry",
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          enquirydate: enquirydate,
          executive: admin?.displayname,
          name: name,
          time: moment().format("h:mm:ss a"),
          contact1: contact1,
          email: email,
          contact2: contact2,
          address: address,
          category: category,
          reference1: reference1,
          reference2: reference2,
          city: city,
          reference3: reference3,
          comment: comment,
          intrestedfor: intrestedfor,
          responseType: getTemplateDatails,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          // const data =  response.json();

          // Assuming the structure matches your previous example
          const enquiryId = response.data.EnquiryId;

          const responce = response.data;
          console.log(response.data);
          console.log(JSON.stringify(responce.data));
          makeApiCall(getTemplateDatails, contact1);
          navigate(
            `/enquirydetail/${latestEnquiryId ? latestEnquiryId + 1 : 1}`
          );
        }
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error); // Display error message from the API response
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };
  // };
  useEffect(() => {
    getsubcategory();
  }, []);

  const getsubcategory = async () => {
    let res = await axios.get(apiURL + "/getsubcategory");
    if (res.status == 200) {
      setsubcategorydata(res.data?.subcategory);
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
    console.log("91" + contact1);
    const content = contentTemplate.replace(/\{Customer_name\}/g, name);
    const contentWithNames = content.replace(
      /\{Executive_name\}/g,
      admin?.displayname
    );
    const contentWithMobile = contentWithNames.replace(
      /\{Executive_contact\}/g,
      admin?.contactno
    );

    const plainTextContent = stripHtml(contentWithMobile);
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
  useEffect(() => {
    getcity();
    getcategory();
    getreferencetype();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if ((res.status = 200)) {
      setreferecetypedata(res.data?.masterreference);
    }
  };

  return (
    <div className="web">
      <Header />
      <Enquirynav />
      {/* <button onClick={makeApiCall}>send</button> */}
      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-sub-heading">Enquiry ID :</div>
                    <div className="group pt-1 vhs-non-editable">
                      {latestEnquiryId ? latestEnquiryId + 1 : 1}{" "}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry Date</div>
                    <div className="group pt-1 vhs-non-editable">
                      {enquirydate}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      {" "}
                      Executive
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 vhs-non-editable">
                      {admin?.displayname}
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Name
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Email Id
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="email"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Contact 1<span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontact1(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Contact 2</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontact2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Address</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      City <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option>--select--</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        <option>--select--</option>
                        {/* {categorydata.map((item) => (
                          <option value={item.category}>{item.category}</option>
                        ))} */}
                        {admin?.category.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Reference
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setreference1(e.target.value)}
                      >
                        <option>--select--</option>
                        {referecetypedata.map((item) => (
                          <option value={item.referencetype}>
                            {item.referencetype}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label"> Reference 2</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setreference2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label"> Reference 3</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setreference3(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label"> Comment</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcomment(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Interested For
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setinterestedfor(e.target.value)}
                      >
                        <option>--select--</option>
                        {subcategorydata.map((item) => (
                          <option value={item.subcategory}>
                            {item.subcategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addenquiry}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button className="vhs-button mx-3">Cancel</button>
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

export default Enquiryadd;
