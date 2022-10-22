import React, { useEffect, useRef, useState } from "react";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from "../../../helpers/API/ApiData";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Slide } from "@material-ui/core";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../_metronic/_assets/sass/layout/_basic.scss";
import { getUserInfo } from "../../../utils/user.util";
import Loader from "react-loader-spinner";
import moment from "moment";
import { SettingsInputComponent } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { Tooltip } from "@material-ui/core";
import SunEditor from "suneditor-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChooseSection = () => {
  const [sectionData, setSectiondata] = useState();
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
  const [submitValue, setSubmitValue] = useState(false);
  const [editorData, setEditorData] = useState();

  let userInfo = getUserInfo();
  const editor = useRef();
  //////////////////////////////////////////////////////////////////  Get section Data ////////////////////////////////////////////////////////

  useEffect(() => {
    GetChooseUs();
  }, []);

  const handleAddBlogData = (content) => {
    setEditorData(content);
    // setErrorsForAdd({ ...errorsForAdd, blogDescription: "" });
    setErrors({ ...errors, description: "" });
  };

  const GetChooseUs = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`whyChooseSection`)
      .then((res) => {
        console.log("benefits", res);
        if (res?.status === 200) {
          setSectiondata(res?.data?.data?.result);
          setIsLoaderVisible(false);
        }
      })
      .catch((err) => {
        console.log("err", err?.message);
      });
  };

  const handleClickAdd = () => {
    setOpen(true);
    setInputValue({});
  };

  const handleclose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "main_title" && value.charAt(e.length) === " ") return;
    if (name === "sub_title" && value.charAt(e.length) === " ") return;
    if (name === "description" && value.charAt(e.length) === " ") return;
    else {
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
    if (!inputValue.main_title) {
      FormValid = false;
      error["main_title"] = "title is required*";
    }
    if (!inputValue.sub_title) {
      FormValid = false;
      error["sub_title"] = "Sub title is required*";
    }
    // if (!inputValue.description) {
    //   FormValid = false;
    //   error["description"] = "description is required*";
    // }
    if (!editorData) {
      FormValid = false;
      error["description"] = "description is required*";
    }
    if (!uploadFiles) {
      FormValid = false;
      error["image"] = "Please choose image*";
    }
    setErrors(error);
    return FormValid;
  };
  //////////////////////////////////////////////////////////////////  Add Section Data ////////////////////////////////////////////////////////

  const AddChooseUs = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("main_title", inputValue?.main_title);
    formData.append("sub_title", inputValue?.sub_title);
    // formData.append("description", inputValue?.description);
    formData.append("description", editorData);
    formData.append("image", uploadFiles);
    if (validation()) {
      setLoading(true);
      await ApiPost(`whyChooseSection`, formData, {
        "content-type": "multipart/form-data",
      })
        .then((res) => {
          console.log("ressss", res);
          if (res?.data?.status === 200) {
            GetChooseUs();
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


  const EditChooseUs = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("main_title", inputValue?.main_title);
    // formData.append("description", inputValue?.description);
    formData.append("description", editorData ? editorData : sectionData?.description);
    formData.append("sub_title", inputValue?.sub_title);
    formData.append("image", uploadFiles ? uploadFiles : editImage?.slice(32));
    setLoading(true);
    await ApiPost(`whyChooseSection`, formData, {
      "content-type": "multipart/form-data",
    })
      .then((res) => {
        console.log("ressss", res);
        if (res?.data?.status === 200) {
          GetChooseUs();
          toast.success("Data updated successfully");
          setOpen(false);
          setLoading(false);
          setUploadImages("")
          setSubmitValue(false);
        } else {
          setLoading(false);
          toast.error();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err.message);
      });
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
                <h3 className="pt-2 pl-2">Why Choose Us?</h3>
              </div>
              <div className=" d-flex ">
                <div>
                  {/* <Button
                    className="bg-customprimary"
                    onClick={(e) => {
   xb                   handleClickAdd();
                    }}
                  >
                    Add Section
                  </Button> */}
                  <div
                      className="cursor-pointer mr-2"
                      onClick={() => {
                        setSubmitValue(true);
                        console.log("row", sectionData);
                        handleClickAdd(sectionData?._id);
                        setIdForEdit(sectionData?._id);
                        setInputValue({
                          main_title: sectionData?.main_title,
                          sub_title: sectionData?.sub_title,
                          description: sectionData?.description,
                          image: seteditimage(
                            `https://api.magnitochemicals.com${sectionData?.image}`
                          ),
                        });
                      }}
                    >
                      <Tooltip title="Edit">
                        <CreateIcon  />
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
                        <h3><b>{sectionData?.main_title}</b></h3>
                      </div>
                      <div className="text-primary">
                        {moment(sectionData?.created_at).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    {/* <div
                      className="cursor-pointer mr-2"
                      onClick={() => {
                        setSubmitValue(true);
                        console.log("row", sectionData);
                        handleClickAdd(sectionData?._id);
                        setIdForEdit(sectionData?._id);
                        setInputValue({
                          main_title: sectionData?.main_title,
                          sub_title: sectionData?.sub_title,
                          description: sectionData?.description,
                          image: seteditimage(
                            `https://api.magnitochemicals.com${sectionData?.image}`
                          ),
                        });
                      }}
                    >
                      <Tooltip title="Edit">

                      <CreateIcon />
                      </Tooltip> 
                    </div>*/}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div >
                          <img
                            className="shadow d-block justify-content-center bg-dark"
                            src={`https://api.magnitochemicals.com${sectionData?.image}`}
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
                      <b>Sub Title &nbsp;:</b> &nbsp;&nbsp;
                      {sectionData?.sub_title}
                    </div>
                    <hr className="bg-light" />
                    <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <b>Description&nbsp;:</b> &nbsp;&nbsp;
                        {<p dangerouslySetInnerHTML={{ __html : sectionData?.description}} />}
                      </div>
                    </div>
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
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="main_title"
                      name="main_title"
                      value={inputValue?.main_title}
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
                    {errors["main_title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Sub Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="sub_title"
                      name="sub_title"
                      value={inputValue?.sub_title}
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
                    {errors["sub_title"]}
                  </span>
                </div>
              </div>

              {/* <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="description"
                      name="description"
                      value={inputValue?.description}
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
                    {errors["description"]}
                  </span>
                </div>
              </div> */}
<div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Description
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <SunEditor
                        ref={editor}
                        name="description"
                        defaultValue={inputValue?.description}
                        onChange={handleAddBlogData}
                        setOptions={{
                          buttonList: [
                            ["undo", "redo"],
                            ["font", "fontSize", "formatBlock"],
                            [
                              "bold",
                              "underline",
                              "italic",
                              "strike",
                              "superscript",
                              "subscript",
                            ],
                            ["removeFormat"],
                            ["outdent", "indent"],
                            ["align", "horizontalRule", "list", "lineHeight"],
                            ["table"],
                            ["link", "image", "video"],
                            ["fullScreen", "showBlocks", "codeView"],
                            ["preview"],
                          ],
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
                      {errors["description"]}
                    </span>
                  </div>
                </div>
              {submitValue && submitValue === true ? (
                <>
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Update Image
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className={`form-control form-control-lg form-control-solid `}
                          id="image"
                          name="image"
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
                        {errors["image"]}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                          id="image"
                          name="image"
                          onChange={(e) => handleChangeimg(e)}
                        />
                      </div>
                      <br />
                      {uploadFiles && (
                        <img
                          src={URL.createObjectURL(uploadFiles)}
                          alt=""
                          style={{
                            width: "346px",
                            height: "200px",
                            borderRadius: "10px",
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
                        {errors["image"]}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex align-items-center justify-content-center">
                {submitValue && submitValue === true ? (
                  <button
                    onClick={(e) => {
                      EditChooseUs(e);
                    }}
                    className="btn bg-customprimary mr-2"
                  >
                    <span>Edit section</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      AddChooseUs(e);
                    }}
                    className="btn bg-customprimary mr-2"
                  >
                    <span>Add section</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </List>
      </Dialog>
    </>
  );
};

export default ChooseSection;
