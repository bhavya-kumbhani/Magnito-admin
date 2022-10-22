import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { ApiPost, ApiPostNoAuth } from "../../../../helpers/API/ApiData";
import * as authUtil from "../../../../utils/auth.util";
import * as userUtil from "../../../../utils/user.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import { number } from "prop-types";
import Loader from '../../../../_metronic/layout/components/Logos/loader.png'


const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPasssword] = useState(false)
  const history = useHistory();
  const LoginSchema = Yup.object().shape({
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
    validationSchema: LoginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };

      await ApiPost("user/login", data)
        .then((res) => {
          console.log("panotiiiiiiiiiiiii",res)
          if(res?.data?.status === 200){
            authUtil.setToken(res?.data?.data?.token);
            userUtil.setUserInfo(res?.data?.data?.user);
            window.location.reload();
            toast.success("Login successfully")
            setLoading(true);
            setSubmitting(false);
            history.push("/dashboard");
          }
          else{
            setLoading(false)
            toast.error("Enter valid credential ")
          }
          
        })
        .catch((error) => {
          // toast.error("Wrong email or password");
          setLoading(false)
          toast.error(error)
          console.log("er",error);
        });
    },
  });

  const showHidePassword = (e) => {
    setShowPasssword(!showPassword)
  }

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="login-title d-flex justify-content-center mb-12 display-4">
      Magnito Chemical
      </div>
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}
          Login Account
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your Login Credentials.
        </p>
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
            placeholder="Enter Email"
            type="email"
            className={`form-control  h-auto py-5 px-6 ${getInputClasses(
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
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className={`form-control  h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          <div style={{  top: "50%", right: "-344px" ,  transform: "translateY(-174%)",position:"relative" }}>
            {
              showPassword ?
                <i className="fa fa-eye" onClick={(e) => showHidePassword(e)} ></i>
                :
                <i className="fa fa-eye-slash" onClick={(e) => showHidePassword(e)}></i>
            }
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}

        </div>
        <div style={{textAlign:"end"}}>
        <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-success my-3 mr-2"
            id="kt_login_forgot"
          >
            forgot password?
          </Link>
          </div>
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
          
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`align-items-center d-flex btn bg-customprimary font-weight-bold px-9 py-4 my-3`}

          >
            Sign In
                {loading && (
              <span className="mx-3 spinner spinner-white"></span>
            )}
          </button>
        </div>
        {/* <div className="d-flex justify-content-center">
          <span className="font-weight-bold text-dark-50">
            Don't have an account yet?
          </span>
          <Link
            to="/auth/signup"
            className="font-weight-bold ml-2"
            id="kt_login_signup"
          >
            Sign Up!
          </Link>
        </div> */}

        {/* <div className="d-flex justify-content-center">
          <span className="font-weight-bold text-dark-50">
            Read our <Link>Onboarding Policy</Link> here.
          </span>
        </div> */}
      </form>
      {/*end::Form*/}
    </div>
  );
}
