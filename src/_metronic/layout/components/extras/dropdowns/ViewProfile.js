import React, { useEffect, useState, useRef } from "react";
import { ApiGet, ApiPut } from "../../../../../helpers/API/ApiData";
import { Button } from "react-bootstrap";
import Auth from "../../../../../helpers/Auth";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const ViewProfile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const userInfo = Auth.getUserDetail();
  const id = userInfo?._id;

  const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

  useEffect(() => {
    // getUserData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      let val = e.target.value.replace(/[^a-zA-Z]/g, "");
      setInputValue({ ...inputValue, [name]: val });
      setErrors({ ...errors, [name]: "" });
    } else {
      setInputValue({ ...inputValue, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  useEffect(() => {
  }, [inputValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !inputValue.firstName &&
      !inputValue.lastName &&
      !inputValue.email &&
      !inputValue.contact &&
      !inputValue.address &&
      !inputValue.city &&
      !inputValue.state &&
      !inputValue.pinCode
    ) {
      setLoading(false);

      setErrors({
        firstName: "First name is required*",
        lastName: "Last name is required*",
        contact: "Contact number is required*",
        email: "Email is not selected*",
        state: "State is required*",
        pinCode: "Pincode is required*",
        address: "Address is required*",
        city: "City is required*",
      });
    } else if (!inputValue.firstName || inputValue.firstName === "") {
      setLoading(false);
      setErrors({ ...errors, firstName: "First name is required*" });
    } else if (!inputValue.lastName || inputValue.lastName === "") {
      setLoading(false);
      setErrors({ ...errors, lastName: "Last name is required*" });
    } else if (!inputValue.contact || inputValue.contact === "") {
      setLoading(false);
      setErrors({ ...errors, contact: "Contact is required*" });
    } else if (!inputValue.city || inputValue.city === "") {
      setLoading(false);
      setErrors({ ...errors, city: "City is required" });
    } else if (!inputValue.email || inputValue.email === "") {
      setLoading(false);
      setErrors({ ...errors, email: "Email is required*" });
    } else if (!inputValue.state || inputValue.state === "") {
      setLoading(false);
      setErrors({ ...errors, state: "State is required*" });
    } else if (!inputValue.address || inputValue.address === "") {
      setLoading(false);
      setErrors({ ...errors, address: "Address is required*" });
    } else if (!inputValue.pinCode || inputValue.pinCode === "") {
      setLoading(false);
      setErrors({ ...errors, pinCode: "Pincode is required*" });
    } else if (
      !inputValue.email ||
      regexEmail.test(inputValue.email) === false
    ) {
      setLoading(false);
      setErrors({ ...errors, email: "Email is not valid*" });
    } else {
      let data = {
        email: inputValue.email,
        contact: inputValue.contact,
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        address: inputValue.address,
        pinCode: inputValue.pinCode,
        city: inputValue.city,
        state: inputValue.state,
      };
      await ApiPut(`admin/updateAdmin/${id}`, data)
        .then((res) => {
          console.log("update", res);
          toast.success("Profile updated successfully");
          // getUserData();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.response?.data?.message);
        });
    }
  };

  // const getUserData = async () => {
  //   await ApiGet(`admin/get-admin/${id}`)
  //     .then((res) => {
  //       console.log("get user data", res?.data?.payload?.admin[0]?.photo);
  //       // setProfile(res?.data?.payload?.admin[0]?.photo)
  //       setUserData(res?.data?.payload?.admin[0]);
  //       setInputValue(res?.data?.payload?.admin[0]);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="card p-1">
          <div className="p-2 mb-2 d-flex  ">
            <div className="col-xl-6 d-flex justify-content-end h1 text-dark font-weight-bold py-8">
              Profile
            </div>
            <div className="col-xl-6 d-flex align-items-center justify-content-end mr-4">
              <NavLink to="/updatepassword">
                <a
                  href="#"
                  className="btn btn-light btn-sm font-weight-bold"
                  id="kt_dashboard_daterangepicker"
                  data-toggle="tooltip"
                  title="Select dashboard daterange"
                  data-placement="left"
                >
                  <span
                    className="text-primary font-weight-bold"
                    id="kt_dashboard_daterangepicker_date"
                  >
                    <EditIcon /> password
                  </span>
                </a>
              </NavLink>
            </div>
          </div>{" "}
          <div className="ml-9 pl-9">
            <>
              {userInfo?.role?.roleName === "shop" ? (
                <>
                  {/* <div className="form-group row">
                    <div className="col-lg-9 col-xl-6">
                      <div
                        className="image-input image-input-outline"
                        id="kt_profile_avatar"
                      >
                        <img
                          className="image-input-wrapper"
                          src={
                            profile
                              ? profile.file
                                ? URL.createObjectURL(profile?.file)
                                : profile
                              : "/media/logos/jewel.png"
                          }
                          alt="Logo"
                        />
                        <label
                          className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                          data-action="change"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Change avatar"
                        >
                          <i className="fa fa-pen icon-sm text-muted"></i>
                          <input
                            type="file"
                            name="profile"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => {
                              setProfile({ file: e.target.files[0] });
                            }}
                          />

                          <input type="hidden" name="profile_avatar_remove" />
                        </label>
                      </div>
                      <span className="form-text text-muted pt-3">
                        Allowed file types: png, jpg, jpeg.
                      </span>
                    </div>
                  </div> */}
                </>
              ) : (
                <></>
              )}
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                  First Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      pattern="/^\S*$/"
                      className={`form-control form-control-lg form-control-light h5 `}
                      name="firstName"
                      value={inputValue?.firstName}
                      onChange={(e) => handleOnChange(e)}
                    />
                    <span className="text-danger">{errors.firstName}</span>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                  Last Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control form-control-lg form-control-light h5 `}
                    value={inputValue?.lastName}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <span className="text-danger">{errors.lastName}</span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                  Email
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    name="email"
                    className={`form-control form-control-lg form-control-light h5 `}
                    value={inputValue?.email}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <span className="text-danger">{errors.email}</span>
                </div>
              </div>
            </>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                Contact
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  className={`form-control form-control-lg form-control-light h5 `}
                  type="number"
                  name="contact"
                  value={inputValue?.contact}
                  onChange={(e) =>
                    e.target.value.length <= 10 && handleOnChange(e)
                  }
                />
                <span className="text-danger">{errors.contact}</span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                Address
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  className={`form-control form-control-lg form-control-light h5 `}
                  type="text"
                  name="address"
                  value={inputValue?.address}
                  onChange={(e) => handleOnChange(e)}
                />
                <span className="text-danger">{errors.address}</span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                City
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  className={`form-control form-control-lg form-control-light h5 `}
                  type="numtexter"
                  name="city"
                  value={
                    inputValue?.city === "undefined"
                      ? inputValue?.city
                      : inputValue?.city
                  }
                  onChange={(e) => handleOnChange(e)}
                />
                <span className="text-danger">{errors.city}</span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                Pincode
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  className={`form-control form-control-lg form-control-light h5 `}
                  type="number"
                  name="pinCode"
                  value={
                    inputValue?.pinCode === "undefined"
                      ? inputValue?.pinCode
                      : inputValue?.pinCode
                  }
                  onChange={(e) =>
                    e.target.value.length <= 7 && handleOnChange(e)
                  }
                />
                <span className="text-danger">{errors.pinCode}</span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label  h4 font-weight-bold">
                State
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  className={`form-control form-control-lg form-control-light h5 `}
                  type="text"
                  name="state"
                  value={inputValue?.state}
                  onChange={(e) => handleOnChange(e)}
                />
                <span className="text-danger">{errors.state}</span>
              </div>
            </div>
            <div className="pl-2 text-center">
              <Button className="bg-primary  " onClick={(e) => handleSubmit(e)}>
                <span>Update Profile</span>
                {loading && (
                  <span className="mx-3 spinner spinner-white"></span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;

{
  /* <p>First Name : {doctorData?.firstName}</p>
<br />
<p>Last Name : {doctorData?.lastName}</p>
<br />
<p>Email : {doctorData?.email}</p>
<br />
<p>Contact : {doctorData?.contact}</p>
<br />
<p>Address : {doctorData?.address}</p>
<br />
<p>City : {doctorData?.city}</p>
<br /> */
}
