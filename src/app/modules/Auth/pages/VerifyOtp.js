import React, { useState } from "react";
import { useFormik } from "formik";
import { ApiPost, ApiPostNoAuth, ApiPutNoAuth } from "../../../../helpers/API/ApiData";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import * as auth from "../_redux/authRedux";
// import { requestPassword } from "../_redux/authCrud";

const initialValues = {
  otp: "",
};

function VerifyOtp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, seterror] = useState("");
  const [invalid, setinvalid] = useState("");

  const [isRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    otp: Yup.string().required("Varification otp is Required"),
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
        otp: values.otp,
      };
      console.log("verify otp data", data);
      await ApiPost(`user/verify-otp`, data)
        .then((res) => {
          console.log("verify OTP res", res);
          if (res?.data?.status === 200) {
            localStorage.setItem("otptoken", res?.data?.data?.token)
            history.push("/auth/newpassword");
            setTimeout(function () {
              toast.success("OTP verified");
            }, 50);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("errerr",err)
          toast.error(err);
        });
    },
  });

  return (
    <>
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
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center pb-8">
            <h3 className="font-size-h1">Verify OTP</h3>
            <div className="text-muted font-weight-bold">
              Enter verification code which is sent on your Email address.
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
                type="otp"
                placeholder="Enter otp"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "otp"
                )}`}
                name="otp"
                onChange={(e) => setEmail(e.target.value)}
                {...formik.getFieldProps("otp")}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.otp}</div>
                </div>
              ) : null}
            </div>

            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn bg-customprimary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Verify
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

export default VerifyOtp;
