import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebar,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Sidenav() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/super/logout/${admin?._id}`,
        method: "post",
        baseURL: "http://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: {},
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Signout succesfully");

          window.location.assign("/");
          sessionStorage.removeItem("admin");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <ProSidebar>
        <div className="row justify-content-center mt-2">
          <img
            src="/images/vhs.png"
            className="img-fluid"
            style={{ width: "100px" }}
          />
          <h6
            className="text-center pt-1"
            style={{ color: "black", fontWeight: "bold", fontSize: "21px" }}
          >
            Vijay Home Services
          </h6>
        </div>
        <Menu iconShape="square">
          <MenuItem>
            {/* <i className="fa-solid fa-gauge"></i> */}
            Dashboard <Link to="/home" />
          </MenuItem>
          <MenuItem>
            {/* <i className="fa-solid fa-gauge"></i> */}
            Banner <Link to="/banner" />
          </MenuItem>
          <MenuItem>
            {/* <i class="fa-solid fa-users"></i> */}
            User Management <Link to="/userManagement" />
          </MenuItem>
          <SubMenu title="Category Management">
            <MenuItem>
              Category <Link to="/category" />
            </MenuItem>
            <MenuItem>
              Subcategory
              <Link to="/subcategory" />
            </MenuItem>
            <MenuItem>
              Sub-subcategory <Link to="/CreateSubcategory" />
            </MenuItem>
          </SubMenu>
          <MenuItem>
            {/* <i class="fa-solid fa-wrench"></i>  */}
            Services Management <Link to="/Service" />
          </MenuItem>
          {/* <span> <i class="fa-solid fa-book"></i></span> */}
          {/* <SubMenu title="Services Booking"> */}
          <MenuItem>
            Services Booking
            <Link to="/ServiceBooking" />
          </MenuItem>

          {/* <MenuItem>
            Subcategory <Link to="/SSubcategory" />
          </MenuItem> */}
          {/* </SubMenu> */}

          <MenuItem>
            Voucher and Discount <Link to="/voucher" />
          </MenuItem>
          <MenuItem>
            Payments and Reports
            <Link to="/Paymentsreports" />
          </MenuItem>
          {/* <MenuItem>
          Review Management <Link to="/review" />{" "}
        </MenuItem> */}
          {/* <MenuItem>
          Content <Link to="/content" />
        </MenuItem> */}
          <MenuItem>
            Vendors Management <Link to="/vendor" />
          </MenuItem>
          {/* <MenuItem>
          wallet <Link to="/Wallets" />{" "}
        </MenuItem> */}
          <MenuItem>
            Settings <Link to="/settings" />{" "}
          </MenuItem>
          <MenuItem>
            <a onClick={handleShow}> Logout </a>
          </MenuItem>
        </Menu>
      </ProSidebar>

      <div>
        <Modal show={show} onHide={handleClose}>
          {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
          <Modal.Body style={{ fontSize: "20px", textAlign: "center" }}>
            Are you sure you wnat to logout
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button variant="primary" onClick={Logout}>
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Sidenav;
