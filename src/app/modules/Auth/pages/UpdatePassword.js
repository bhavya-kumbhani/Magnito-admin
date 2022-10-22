import React, { useState } from "react";
import { useFormik } from "formik";
import { ApiPost, ApiPut } from "../../../../helpers/API/ApiData";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { object, string, ref } from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../../../../utils/user.util";
import { getToken } from "../../../../utils/auth.util";

const initialValues = {
  email:"",
  password: "",
  newPassword: "",
};

function UpdatePassword() {
  const history = useHistory();
  const [isRequested] = useState(false);
  let userInfo = getUserInfo();
  let userToken = getToken();

  const ForgotPasswordSchema = Yup.object().shape({
    // password: Yup.string()
    //   .min(3, "Minimum 3 symbols")
    //   .max(50, "Maximum 50 symbols")
    //   .required("Password is Required"),
    email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is Required"),
    newPassword: string().required("New password is Required"),
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
        // password: values.password,
        email : values.email,
        password: values.newPassword,
      };

      console.log("DATA", data);
      await ApiPut(`user/update-profile`, data)
        .then((res) => {
          if (res?.status === 200) {
            console.log("update pass res", res);
            setTimeout(function () {
              toast.success("Profile updated successfully");
            }, 300);
            history.push("/dashboard");
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("errrrr", err?.message);
          toast.error(err?.message);
        });
    },
  });

  return (
    <>
      <ToastContainer />
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="card p-1">
          <div className="login-form login-forgot" style={{ display: "block" }}>
            <div className="text-center mb-10 mb-lg-20">
              <h3 className="font-size-h1 m-6">Update Profile</h3>
              <div className="text-muted font-weight-bold">
                Pick a new email & password
              </div>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp 
               d-flex justify-content-center"
            >
              <div className="w-75">
                {formik.status && (
                  <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                    <div className="alert-text font-weight-bold">
                      {formik.status}
                    </div>
                  </div>
                )}
                {/* <div className="form-group fv-plugins-icon-container  w-100">
                  <input
                    type="password"
                    className={`form-control h-auto py-5 px-6 ${getInputClasses(
                      "password"
                    )}`}
                    name="password"
                    placeholder="Your Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.password}
                      </div>
                    </div>
                  ) : null}
                </div> */}
                <div className="form-group fv-plugins-icon-container  w-100">
                  <input
                    type="email"
                    className={`form-control h-auto py-5 px-6 ${getInputClasses(
                      "email"
                    )}`}
                    name="email"
                    placeholder="New Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.email}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group fv-plugins-icon-container  w-100">
                  <input
                    type="password"
                    className={`form-control h-auto py-5 px-6 ${getInputClasses(
                      "newPassword"
                    )}`}
                    name="newPassword"
                    placeholder="New password"
                    {...formik.getFieldProps("newPassword")}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.newPassword}
                      </div>
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
                    Update
                  </button>
                  {/* <Link to="/viewprofile"> */}
                  <button
                    type="button"
                    id="kt_login_forgot_cancel"
                    className="btn bg-customprimary font-weight-bold px-9 py-4 my-3 mx-4"
                    onClick={() => history.push("/dashboard")}
                  >
                    Cancel
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdatePassword;
