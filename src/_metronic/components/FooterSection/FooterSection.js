import React, { useEffect, useState } from "react";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Slide, Tooltip } from "@material-ui/core";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../_metronic/_assets/sass/layout/_basic.scss";
import { getUserInfo } from "../../../utils/user.util";
import Loader from "react-loader-spinner";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FooterSection = () => {
  const [sectionData, setSectiondata] = useState([]);
  const [show, setShow] = useState(false);
  const [fId, setFeedbackId] = useState();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [open, setOpen] = useState(false); //add modal open for add section
  const [inputValue, setInputValue] = useState({});
  const [uploadFiles, setUploadImages] = useState();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idForEdit, setIdForEdit] = useState("");
  const [editImage, seteditimage] = useState();


  let userInfo = getUserInfo();

  //////////////////////////////////////////////////////////////////  Get section Data ////////////////////////////////////////////////////////

  useEffect(() => {
    GetSection();
  }, []);

  const bindInput = (value) => {
    var regex = new RegExp("^[^0-9]*$");
    var key = String.fromCharCode(
      !value.charCode ? value.which : value.charCode
    );
    if (regex.test(key)) {
      value.preventDefault();
      return false;
    }
  };

  const GetSection = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`footerSection`)
      .then((res) => {
        console.log("first", res?.data?.data?.aboutUs);
        if (res?.status === 200) {
          setSectiondata(res?.data?.data?.aboutUs);
          setIsLoaderVisible(false);
        }
      })
      .catch((err) => {
        console.log("err", err?.response);
      });
  };

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleclose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "privacy_info" && value.charAt(e.length) === " ") return;
    // if (name === "privacy_title" && value.charAt(e.length) === " ") return;
    // if (name === "terms_use_title" && value.charAt(e.length) === " ") return;
    // if (name === "copyright_title" && value.charAt(e.length) === " ") return;
    // if (name === "description" && value.charAt(e.length) === " ") return;
    else {
      console.log("wwwwwwwwww",e.target.value)
      setInputValue({ ...inputValue, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleChangeimg = (e) => {
    setUploadImages(e.target.files[0]);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validation = () => {
    let error = {};
    let FormValid = true;
    if (!inputValue.privacy_title) {
      FormValid = false;
      error["privacy_title"] = "Privacy title is required*";
    }
    if (!inputValue.terms_use_title) {
      FormValid = false;
      error["terms_use_title"] = "Term use title is required*";
    }
    if (!inputValue.copyright_title) {
      FormValid = false;
      error["copyright_title"] = "Copyright title is required*";
    }
    if (!inputValue.description) {
      FormValid = false;
      error["description"] = "description is required*";
    }
    if (!uploadFiles) {
      FormValid = false;
      error["logo"] = "Please choose image*";
    }
    if (!inputValue?.mobile || inputValue?.mobile.trim() === "") {
      FormValid = false;
      error["mobile"] = "MobileNo field is required.";
    } else if (!inputValue.mobile || inputValue.mobile.length < 10) {
      error["mobile"] = "Enter valid mobile no.*";
    }
    setErrors(error);
    return FormValid;
  };
  //////////////////////////////////////////////////////////////////  Add Section Data ////////////////////////////////////////////////////////

  const AddSection = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    // formData.append("privacy_title", inputValue?.privacy_title);
    // formData.append("terms_use_title", inputValue?.terms_use_title);
    formData.append("copyright_title", inputValue?.copyright_title);
    // formData.append("description", inputValue?.description);
    formData.append("logo", uploadFiles);
    if (validation()) {
      setLoading(true);
      await ApiPost(`footerSection`, formData, {
        "content-type": "multipart/form-data",
      })
        .then((res) => {
          console.log("ressss", res);
          if (res?.data?.status === 200) {
            GetSection();
            setInputValue({});
            setUploadImages("");
            toast.success("Data add successfully");
            setOpen(false);
            setLoading(false);
          } else {
            setLoading(false);
            toast.error();
          }
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.message);
        });
    }
  };

  const EditSection = async (e) => {
    e.preventDefault();
    // if(validation()){
    let formData = new FormData();
    // formData.append("privacy_info ", inputValue?.privacy_info);
    // formData.append("privacy_title", inputValue?.privacy_title);
    // formData.append("terms_use_title", inputValue?.terms_use_title);
    formData.append("copyright_title", inputValue?.copyright_title);
    // formData.append("description", inputValue?.description);
    formData.append("mobile", inputValue?.mobile);
    formData.append("email", inputValue?.email);
    // formData.append("logo", uploadFiles);

    console.log(formData)
    formData.append("logo", uploadFiles ? uploadFiles : editImage?.slice(32));
      setLoading(true);
      await ApiPost(`footerSection`, formData, {
        "content-type": "multipart/form-data",
      })
        .then((res) => {
          console.log("ressss", res);
          if (res?.data?.status === 200) {
            GetSection();
            toast.success("Data updated successfully");
            setOpen(false);
            setLoading(false);
          } else {
            setLoading(false);
            toast.error();
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log("err", err);
          toast.error(err.message);
        });
      // }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ToastContainer />
      <div>
        <div className="card p-1">
          <div className="p-2 mb-2">
            <div className="row d-flex justify-content-between mb-4 pr-3">
              <div className="d-flex justify-content-between pt-2 col">
                <h3 className="pt-2 pl-2">Header & Footer Section</h3>
              </div>
              <div className=" d-flex ">
              <div>
                {/* <Button
                  className="bg-customprimary"
                  onClick={(e)=>{
                    handleClickAdd();
                  }}
                >
                  Add Section
                </Button> */}
                <div
                            className="cursor-pointer mr-2"
                            onClick={() => {
                              console.log("row",sectionData)
                              handleClickAdd(sectionData?._id);
                              setIdForEdit(sectionData?._id)
                              setInputValue({
                                // privacy_title:sectionData?.privacy_title,
                                // terms_use_title:sectionData?.terms_use_title,
                                copyright_title:sectionData?.copyright_title,
                                // description:sectionData?.description,
                                email:sectionData?.email,
                                // privacy_info:sectionData?.privacy_info,
                                mobile:sectionData?.mobile,
                                image: seteditimage(
                                  `https://api.magnitochemicals.com${sectionData?.logo}`
                                ),
                              })
                            }}
                          >
                            <Tooltip title="Edit">

                            <CreateIcon />
                            </Tooltip>
                          </div>
              </div>
            </div>
            </div>
            {isLoaderVisible && (
              <div className="d-flex justify-content-center">
                <Loader type="Puff" color="#334D52" height={30} width={30} />
              </div>
            )}

            {sectionData && sectionData.length !== 0 ? (
              <div className="p-5 ">
                <div className="card body pt-2 pl-8 pr-8 pb-2 shadow p-3 mb-5 bg-white rounded">
                  <div>
                    <div className="d-flex justify-content-between   m-1">
                      <div className="col-10 p-0">
                        {/* <h3><b>{sectionData?.main_title}</b></h3> */}
                      </div>
                      <div className="text-primary">
                        {moment(sectionData?.created_at).format("DD/MM/YYYY")}
                      </div>
                    </div>
                   
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <img
                            className="shadow d-block justify-content-center bg-dark"
                            src={`https://api.magnitochemicals.com${sectionData?.logo}`}
                            alt="Product"
                            style={{
                              width: "346px",
                              height: "200px",
                              borderRadius: "5%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pl-1">
                      <b>Copyright Title &nbsp;:</b> &nbsp;&nbsp;
                      {sectionData?.copyright_title}
                    </div>
                    <hr className="bg-light" />
                    
                   
                    <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <b>Email&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.email}
                      </div>
                    </div>
                    <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <b>Mobile No.&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.mobile}
                      </div>
                    </div>
                    {/* <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <b>Privacy&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.privacy_info}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {isLoaderVisible === false && (
                  <div className="d-flex justify-content-center">
                    There are no records to display
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleclose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleclose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        {/* add product form */}
        <List>
          <form>
            <div className="form ml-30 ">
              {/* <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Privacy Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="privacy_title"
                      name="privacy_title"
                      value={inputValue?.privacy_title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["privacy_title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Term Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="terms_use_title"
                      name="terms_use_title"
                      value={inputValue?.terms_use_title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["terms_use_title"]}
                  </span>
                </div>
              </div> */}

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Copyright Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="copyright_title"
                      name="copyright_title"
                      value={inputValue?.copyright_title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["copyright_title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Email
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="email"
                      className={`form-control form-control-lg form-control-solid `}
                      id="email"
                      name="email"
                      value={inputValue?.email}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["email"]}
                  </span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                mobile
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      onKeyPress={bindInput}
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="mobile"
                      name="mobile"
                      value={inputValue?.mobile}
                      onChange={(e) => {
                        e.target.value.length <= 10 && handleChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["mobile"]}
                  </span>
                </div>
              </div>
              {/* <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                Privacy Policy
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="privacy_info"
                      name="privacy_info"
                      value={inputValue?.privacy_info}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["privacy_info"]}
                  </span>
                </div>
              </div> */}
              {/* <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <textarea cols="50" rows="6" type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="description"
                      name="description"
                      value={inputValue?.description}
                      onChange={(e) => {
                        handleChange(e);
                      }}></textarea>
                    
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["description"]}
                  </span>
                </div>
              </div> */}

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Image
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className={`form-control form-control-lg form-control-solid `}
                      id="logo"
                      name="logo"
                      onChange={(e) => handleChangeimg(e)}
                    />
                  </div>
                  <br />
                  {uploadFiles ? (
                          <img
                            src={URL.createObjectURL(uploadFiles)}
                            alt=""
                            style={{
                              width: "346px",
                              height: "200px",
                              borderRadius: "10px",
                              // objectFit: "cover",
                            }}
                          />
                        ) : (
                          <img
                            src={editImage}
                            alt=""
                            style={{
                              width: "346px",
                              height: "200px",
                              borderRadius: "10px",
                              // objectFit: "cover",
                            }}
                          />
                        )}

                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["logo"]}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={(e) => {
                    EditSection(e);
                  }}
                  className="btn bg-customprimary mr-2"
                >
                  <span>Edit Section</span>
                  {loading && (
                    <span className="mx-3 spinner spinner-white"></span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </List>
      </Dialog>
    </>
  );
};

export default FooterSection;
