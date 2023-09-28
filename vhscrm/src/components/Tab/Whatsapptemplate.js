import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Whatsapptemplate() {
  const [show, setShow] = useState(false);

  const [data, setData] = useState({});
  const [templateName, settemplateName] = useState("");
  const [whatsappTemplate, setwhatsappTemplate] = useState("");
  const [copiedData, setCopiedData] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [whatsappdata, setwhatsappdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  console.log("whatsappdata", whatsappdata);
  const addwhatsappTemplate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/addwhatsapptemplae",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          templatename: templateName,
          template: whatsappTemplate,
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
      alert(" Not Added");
    }
  };

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    let res = await axios.get(apiURL + "/getwhatsapptemplate");
    if ((res.status = 200)) {
      setwhatsappdata(res.data?.whatsapptemplate);
      setfilterdata(res.data?.whatsapptemplate);
    }
  };

  const deletereferencetype = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletewhatsapptemplate/" + id,
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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setwhatsappTemplate(data);
  };

  // Function to insert the clicked variable into the whatsappTemplate
  const insertVariable = (variable) => {
    setwhatsappTemplate(whatsappTemplate + ` ${variable}`);
  };

  // Function to handle backspace key and clear whatsappTemplate
  const handleBackspace = (e) => {
    if (e.keyCode === 8) {
      setwhatsappTemplate(whatsappTemplate.slice(0, -1));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const edit = (data) => {
    setData(data);
    handleShow(true);
  };

  const [editTemplate, setEditTemplate] = useState("");

  const handleEditTemplate = (event, editor) => {
    const data = editor.getData();
    setEditTemplate(data);
  };

  return (
    <div className="web">
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Template Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => settemplateName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      WhatsApp Template <span className="text-danger"> *</span>
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={whatsappTemplate}
                      onChange={handleEditorChange}
                    />
                    {/* <textarea
                      rows={10}
                      cols={45}
                      // value={copiedData} // Populate textarea with copied data
                      onChange={(e) => setwhatsappTemplate(e.target.value)}
                      onKeyDown={handleBackspace}
                    /> */}
                  </div>

                  <div className="col-md-4">
                    <div>
                      <b>Click to Copy to WhatsApp Template</b>
                    </div>
                    <div onClick={() => insertVariable("Customer_name")}>
                      <b>Customer_name</b>
                    </div>
                    <div onClick={() => insertVariable("Call_date")}>
                      <b>Call_date</b>
                    </div>
                    <div>
                      <b>Category</b>
                    </div>
                    <div>
                      <b> Staff_name</b>
                    </div>
                    <div>
                      <b> Staff_contact</b>
                    </div>
                    <div>
                      <b>Technician_name</b>
                    </div>
                    <div>
                      <b>Technician_experiance</b>
                    </div>
                    <div>
                      <b>Technician_languages_known</b>
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button
                      className="vhs-button"
                      onClick={addwhatsappTemplate}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-4">
            Page{" "}
            <span>
              <select className="vh-user-select">
                <option>1</option>
              </select>
            </span>{" "}
            of 1
          </div>{" "}
          <table class="table table-hover table-bordered mt-2">
            <thead className="">
              <tr>
                <th style={{ width: "10%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th style={{ width: "20%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>

                <th style={{ width: "40%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th style={{ width: "20%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th style={{ width: "10%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
              </tr>

              <tr className="table-secondary">
                <th style={{ width: "10%" }} className="table-head" scope="col">
                  Sr
                </th>
                <th style={{ width: "20%" }} className="table-head" scope="col">
                  Template Name
                </th>
                <th style={{ width: "40%" }} className="table-head" scope="col">
                  WhatsApp Template
                </th>
                <th style={{ width: "20%" }} className="table-head" scope="col">
                  Variables
                </th>
                <th style={{ width: "10%" }} className="table-head" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {whatsappdata.map((i) => (
                <tr className="user-tbale-body">
                  <td className="text-center">1</td>
                  <td>{i.templatename}</td>
                  <td>
                    <div dangerouslySetInnerHTML={{ __html: i.template }} />
                    {/* {i.template.split("\n").map((item, index) => (
                      <p key={index}>{item}</p>
                    ))} */}
                  </td>
                  <td>
                    <p>Customer_name</p>
                    <p>Job_type</p>
                    <p>Call_date</p>
                    <p>Technician_name</p>
                    <p>Technician_experiance</p>
                    <p>Technician_languages_known</p>
                    <p>Staff_name</p>
                    <p>Staff_contact</p>
                  </td>

                  <td>
                    <div className="d-flex">
                      <a href="#" className="hyperlink" onClick={edit}>
                        Edit
                      </a>{" "}
                      /{" "}
                      <a
                        href="#"
                        className="hyperlink"
                        onClick={() => deletereferencetype(i._id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              <tr
                className="user-tbale-body"
                style={{ backgroundColor: "#eee", height: "40px" }}
              >
                <td className="text-center"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>{" "}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Response: {data.templatename} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Template Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">WhatsApp Template</div>
                    <div className="group pt-1">
                      {/* <textarea
                        rows={6}
                        cols={6}
                        type="text"
                        className="col-md-12 vhs-input-value"
                      /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        data={data.template}
                        onChange={handleEditTemplate}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Double Click On Below VARIABLE
                    </div>
                    <div className="vhs-input-label">
                      To Add In Message Text
                    </div>
                    <div className="group pt-1">
                      <p>Customer_name</p>
                      <p>Executive_name</p>
                      <p>Executive_contact</p>
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Whatsapptemplate;
