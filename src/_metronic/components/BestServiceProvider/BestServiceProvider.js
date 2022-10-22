import React, { useEffect, useState } from "react";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from "../../../helpers/API/ApiData";
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
import { SettingsInputComponent } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import TextArea from "antd/lib/input/TextArea";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BestServiceProvider = () => {
  const [sectionData, setSectiondata] = useState({});
  const [show, setShow] = useState(false);
  const [fId, setFeedbackId] = useState();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [open, setOpen] = useState(false); //add modal open for add section
  const [inputValue, setInputValue] = useState({
    title :"",
    description:"",
    history :{
      title :"",
      description:"",
    },
    reliability :{
      title :"",
      description:"",
    },
    tools :{
      title :"",
      description:"",
    }
  });
  const [uploadFiles, setUploadImages] = useState();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idForEdit, setIdForEdit] = useState("");
  const [editImage, seteditimage] = useState();
  const [submitValue, setSubmitValue] = useState(false);

  let userInfo = getUserInfo();

  //////////////////////////////////////////////////////////////////  Get section Data ////////////////////////////////////////////////////////

  useEffect(() => {
    GetAbout();
  }, []);

  const GetAbout = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`bestServices`)
      .then((res) => {
        console.log("bestServices", res?.data?.data?.result);
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
    console.log("eeee",e.target.value)
    // if (name === "title" && value.charAt(e.length) === " ") return;
    // if (name === "description" && value.charAt(e.length) === " ") return;
    // else {
      setInputValue({ ...inputValue, [name]: value  });
      setErrors({ ...errors, [name]: "" });
    // }
  };

//   const handleChange = (event) => {
 
//     const {name, value} = event?.target
//     if(name === "name" || name === "title")
//     {
//       setInputValue((inputValue) => {
//         console.log("prevPerson",inputValue)
//           return {...inputValue, [name]: value}
//       })
//     }
//     if(name === "history_title" || name === "history_description")
//     {
//       setInputValue((inputValue) => {
//         console.log("prevPersonhistory",inputValue)
//         const newPerson = {...inputValue}
//         newPerson.history[name] = value
//       })
//     }
//     if(name === "reliability_title" || name === "reliability_description")
//     {
//       setInputValue((prevPerson) => {
//         console.log("prevPersonreliability",prevPerson)
//         const newPerson = {...prevPerson}
//         newPerson.reliability[name] = value
//         return newPerson
//       })
//     }
//     if(name === "tools_title" || name === "tools_description")
//     {
//       setInputValue((prevPerson) => {
//         console.log("prevPersontools",prevPerson)
//         const newPerson = {...prevPerson}
//         newPerson.tools[name] = value
//         return newPerson
//       })
//     }
// }

  const handleChangeimg = (e) => {
    setUploadImages(e.target.files[0]);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validation = () => {
    let error = {};
    let FormValid = true;
    if (!inputValue.title) {
      FormValid = false;
      error["title"] = "title is required*";
    }

    if (!inputValue.description) {
      FormValid = false;
      error["description"] = "description is required*";
    }

    setErrors(error);
    return FormValid;
  };
  //////////////////////////////////////////////////////////////////  Add Section Data ////////////////////////////////////////////////////////

  const AddAbout = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", inputValue?.title);
    formData.append("sub_title", inputValue?.sub_title);
    formData.append("description", inputValue?.description);
    formData.append("image", uploadFiles);
    if (validation()) {
      setLoading(true);
      await ApiPost(`aboutUs`, formData, {
        "content-type": "multipart/form-data",
      })
        .then((res) => {
          console.log("ressss", res);
          if (res?.data?.status === 200) {
            GetAbout();
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

  const EditAbout = async (e) => {
    e.preventDefault();
    const body = {
      title: inputValue?.title,
      description: inputValue?.description,
      history:{
        title:inputValue?.history_title,
        description:inputValue?.history_description,
    },
    reliability:{
        title:inputValue?.reliability_title,
        description:inputValue?.reliability_description,
    },
    tools:{
        title:inputValue?.tools_title,
        description:inputValue?.tools_description,
    }
    };
    setLoading(true);
    await ApiPost(`bestServices`, body)
      .then((res) => {
        console.log("ressss", res);
        if (res?.data?.status === 200) {
          GetAbout();
          toast.success("Data updated successfully");
          setOpen(false);
          setUploadImages("");
          setLoading(false);
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
      {console.log(inputValue,"inputValue")}
      <div>
        <div className="card p-1">
          <div className="p-2 mb-2">
            <div className="row d-flex justify-content-between mb-4 pr-3">
              <div className="d-flex justify-content-between pt-2 col">
                <h3 className="pt-2 pl-2">Best Service Provider</h3>
              </div>
              <div className=" d-flex ">
                <div>
                  {/* <Button
                    className="bg-customprimary"
                    onClick={(e) => {
                      handleClickAdd();
                    }}
                  >
                    Add About
                  </Button> */}
                  <div
                    className="cursor-pointer mr-2"
                    onClick={() => {
                      console.log("row", sectionData);
                      handleClickAdd(sectionData?._id);
                      setSubmitValue(true);
                      setIdForEdit(sectionData?._id);
                      setInputValue({
                        title: sectionData?.title,
                        description: sectionData?.description,
                        history_title: sectionData?.history?.title,
                        history_description: sectionData?.history?.description,
                        reliability_title:sectionData?.reliability?.title,
                        reliability_description: sectionData?.reliability?.description,
                        tools_title:sectionData?.tools?.title,
                        tools_description: sectionData?.tools?.description,
                      });
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
                        <h3>
                          <b>{sectionData?.title}</b>
                        </h3>
                      </div>
                      <div className="text-primary">
                        {moment(sectionData?.created_at).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div className="pl-1">
                      <b>Title &nbsp;:</b> &nbsp;&nbsp;
                      {sectionData?.title}
                    </div>
                    <div className="pl-1">
                      <b>Description&nbsp;:</b> &nbsp;&nbsp;
                      {sectionData?.description}
                    </div>
                    <hr className="bg-light" />
                    <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <h3>
                          <b>History</b>
                        </h3>
                      </div>
                      <div className="col-10 p-0">
                        <b>Title&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.history?.title}
                      </div>
                      <div className="col-10 p-0">
                        <b>Description&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.history?.description}
                      </div>
                    </div>
                    <hr className="bg-light" />
                    <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <h3>
                          <b>Reliability</b>
                        </h3>
                      </div>
                      <div className="col-10 p-0">
                        <b>Title&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.reliability?.title}
                      </div>
                      <div className="col-10 p-0">
                        <b>Description&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.reliability?.description}
                      </div>
                    </div>
                    <hr className="bg-light" />
                    <div className="row row-cols-2 m-1">
                      <div className="col-10 p-0">
                        <h3>
                          <b>Tools</b>
                        </h3>
                      </div>
                      <div className="col-10 p-0">
                        <b>Title&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.tools?.title}
                      </div>
                      <div className="col-10 p-0">
                        <b>Description&nbsp;:</b> &nbsp;&nbsp;
                        {sectionData?.tools?.description}
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
                      id="title"
                      name="title"
                      value={inputValue?.title}
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
                    {errors["title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <textarea cols="50" rows="5" type="text"
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
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  History Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="history_title"
                      name="history_title"
                      value={inputValue?.history_title}
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
                    {errors["history_title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  History Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                  <textarea cols="50" rows="5" type="text" 
                      className={`form-control form-control-lg form-control-solid `}
                      id="history_description"
                      name="history_description"
                      value={inputValue?.history_description}
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
                    {errors["history_description"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Reliability Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="reliability_title"
                      name="reliability_title"
                      value={inputValue?.reliability_title}
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
                    {errors["reliability_title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Reliability Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                  <textarea cols="50" rows="5" type="text" className={`form-control form-control-lg form-control-solid `}
                      id="reliability_description"
                      name="reliability_description"
                      value={inputValue?.reliability_description}
                      onChange={(e) => {
                        handleChange(e);
                      }} ></textarea>
                    
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["reliability_description"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Tools Title
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="tools_title"
                      name="tools_title"
                      value={inputValue?.tools_title}
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
                    {errors["tools_title"]}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Tools Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                  <textarea cols="50" rows="5" type="text" className={`form-control form-control-lg form-control-solid `}
                      id="tools_description"
                      name="tools_description"
                      value={inputValue?.tools_description}
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
                    {errors["tools_description"]}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                {submitValue && submitValue === true ? (
                  <button
                    onClick={(e) => {
                      EditAbout(e);
                    }}
                    className="btn bg-customprimary mr-2"
                  >
                    <span>Edit Project Header</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      AddAbout(e);
                    }}
                    className="btn bg-customprimary mr-2"
                  >
                    <span>Add Project Header</span>
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

export default BestServiceProvider;
