import React, { useState } from "react";
import { useFormik } from "formik";
import { ApiPost, ApiPostNoAuth } from "../../../../helpers/API/ApiData";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { object, string, ref } from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import * as auth from "../_redux/authRedux";
// import { requestPassword } from "../_redux/authCrud";

const initialValues = {
  password: "",
  // confirmpassword: "",
};

function NewPassword() {
  const history = useHistory();
  const [isRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("New password is Required"),

    // confirmpassword: string()
    //   .required("Please confirm your password")
    //   .oneOf([ref("password")], "Passwords do not match"),
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
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const data = {
        token: localStorage.getItem("otptoken"),
        password: values.password,
      };

      console.log("DATA", data);
      await ApiPost("user/forgot-password", data)
        .then((res) => {
          if (res?.data?.status === 200) {
            console.log("forget pass api res", res);
            setTimeout(function () {
              toast.success("Password changed successfully");
            }, 50);
            history.push("/auth/login");
            localStorage.setItem("otptoken", null);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    },
  });

  return (
    <>
      <ToastContainer />
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Ready to Change Password?</h3>
            <div className="text-muted font-weight-bold">
              Pick a new password
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              <input
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "password"
                )}`}
                name="password"
                placeholder="New password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
            {/* <div className="form-group fv-plugins-icon-container">
              <input
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "confirmpassword"
                )}`}
                name="confirmpassword"
                placeholder="Confirm password"
                {...formik.getFieldProps("confirmpassword")}
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.confirmpassword}
                  </div>
                </div>
              ) : null}
            </div> */}
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn bg-customprimary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn bg-customprimary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default NewPassword;
