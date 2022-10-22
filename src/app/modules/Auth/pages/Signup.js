import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { ApiPost, ApiPostNoAuth } from "../../../../helpers/API/ApiData";
import * as authUtil from "../../../../utils/auth.util";
import * as userUtil from "../../../../utils/user.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  firstName: "",
  lastName: "",
  contact: "",
  address: "",
  email: "",
  password: "",
  pinCode: "",
  city: "",
  state: "",
  role: "",
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const phoneRegExp = /^\s*-?[0-9]{1,10}\s*$/;

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("First name is Required"),
    lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Last name is Required"),

    contact: Yup.string()
      .required("Contact number is Required")
      .min(10, "Contact number is not valid")
      .max(10, "Contact number is not valid")
      .matches(phoneRegExp, "Contact number is not valid"),

    pinCode: Yup.string()
      .required("Pin Code is Required")
      .min(6, "Pin Code is not valid")
      .max(6, "Pin Code is not valid"),

    city: Yup.string().required("City is Required").min(3, "City is not valid"),

    state: Yup.string()
      .required("State is Required")
      .min(3, "State is not valid"),

    address: Yup.string()
      .min(3, "Minimum 3 symbols")
      .required("Address is Required"),

    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is Required"),

    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is Required"),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        contact: values.contact,
        address: values.address,
        pinCode: values.pinCode,
        city: values.city,
        state: values.state,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      await ApiPostNoAuth("admin/signup", data)
        .then((res) => {
          
          authUtil.setToken(res.data.payload.token);
          userUtil.setUserInfo(res.data.payload.admin);
          window.location.reload();
          setLoading(true);
          setSubmitting(false);
          history.push("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
          console.log("er");
        });
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="font-weight-md login-title d-flex justify-content-center mb-12 display-2">
      Magnito Chemical
      </div>
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}
          Registration
        </h3>
        <p className="text-muted font-weight-bold"></p>
      </div>
      {/* end::Head */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          ""
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter FirstName"
            type="firstName"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "firstName"
            )}`}
            name="firstName"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.firstName}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter Last Name"
            type="lastName"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "lastName"
            )}`}
            name="lastName"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.lastName}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter Address"
            type="address"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "address"
            )}`}
            name="address"
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.address}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter Pin-Code"
            type="number"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "pinCode"
            )}`}
            name="pinCode"
            {...formik.getFieldProps("pinCode")}
          />
          {formik.touched.pinCode && formik.errors.pinCode ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.pinCode}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter City"
            type="city"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "city"
            )}`}
            name="city"
            {...formik.getFieldProps("city")}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.city}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter State"
            type="state"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "state"
            )}`}
            name="state"
            {...formik.getFieldProps("state")}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.state}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Enter Contact"
            type="number"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "contact"
            )}`}
            name="contact"
            {...formik.getFieldProps("contact")}
          />
          {formik.touched.contact && formik.errors.contact ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.contact}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <select
            className={`form-control form-control-lg form-control-solid ${getInputClasses(
              "role"
            )}`}
            name="role"
            {...formik.getFieldProps("role")}
          >
            <option>Select Role...</option>
            <option value="61fb61a7f9bc76308ccbfca3">Jeweller</option>
            <option value="61aa0389803e260c3821ad14">Manufacturer</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.role}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-end align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={` login-button btn btn-dark font-weight-bold px-9 py-4 my-3`}
          >
            Register
          </button>
        </div>
        <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
          <span className="font-weight-bold text-dark-50">
            already have an account?
          </span>
          <Link
            to="/auth/login"
            className="font-weight-bold ml-2"
            id="kt_login_signup"
          >
            Sign In!
          </Link>
        </div>
      </form>
    </div>
  );
}
