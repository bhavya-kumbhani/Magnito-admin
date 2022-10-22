import React, { useEffect, useState, useRef, useContext } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from "../../../helpers/API/ApiData";
import { Slide } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../_metronic/_assets/sass/layout/_basic.scss";
import { Button } from "react-bootstrap";
import { List } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Dialog } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { DataLoaded } from "../../../app/App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Service = () => {
  const{ProductData,ServiceData}=useContext(DataLoaded);
  const[serNum,setSerNum] =ServiceData;

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [inputValue, setInputValue] = useState({});
  const [open, setOpen] = useState(false);
  const [submitValue, setSubmitValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [idForEdit, setIdForEdit] = useState();
  const [allproduct, setAllproduct] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [uploadFiles, setUploadImages] = useState();
  const [FilterBlogCategory, setFilteredBlogCategory] = useState();
  const [editImage, seteditimage] = useState();
  const [blogEditorData, setBlogEditorData] = useState();

  const editor = useRef();

  const handleClose = () => {
    setOpen(false);
    setErrors([]);
    setShow(false);
  };

  const handleUpdateDetails = () => {
    setSubmitValue(true);
    setOpen(true);
  };

  const handleClickAdd = () => {
    setOpen(true);
    setSubmitValue(false);
    setInputValue({});
  };

  useEffect(() => {
    GetAllServices();
  }, [page, countPerPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("eeeeee", value);

    if (name === "title" && value.charAt(e.length) === " ") return;
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
  

  const Validation = () => {
    let error = {};
    let Formvalid = true;
    if (!inputValue.title) {
      Formvalid = false;
      error["title"] = " Title is required*";
    }
   
    if (!inputValue?.description) {
      Formvalid = false;
      error["description"] = "description is required*";
    }
    if (!uploadFiles) {
      Formvalid = false;
      error["image"] = "Image is not selected*";
    }
    setErrors(error);
    return Formvalid;
  };

  const GetAllServices = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`service?search`)
      .then((res) => {
        console.log(`service?page=${page}&limit=${countPerPage}&search`, res);
        setIsLoaderVisible(false);
        setCount(res?.data?.data?.result?.total);
        setSerNum(res?.data?.data?.result?.total)
        setFilteredCategory(res?.data?.data?.result?.docs);
      })
      .catch((err) => {
        console.log("err", err?.response);
        toast.error(err?.message);
      });
  };


  const AddServices = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", inputValue?.title);
    formData.append("image", uploadFiles);
    formData.append("description", inputValue?.description);
    if (Validation()) {
      setLoading(true);
      await ApiPost(`service`, formData)
        .then((res) => {
          if (res?.data?.status === 200) {
            console.log("CreateData----->", res);
            setLoading(false);
            GetAllServices();
            setInputValue({
              title:"",
              description:""
            });
            setUploadImages("")
            toast.success("Service added successfully");
            setOpen(false);
          } else {
            setLoading(false);
            toast.error(res?.error);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
          toast.error(err?.message);
        });
    }
  };

  const EditServices = async (e) => {
    setLoading(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", inputValue?.title);
    formData.append("image", uploadFiles ? uploadFiles : editImage?.slice(32));
    formData.append("description", inputValue?.description);

    console.log("aboutUs", formData);
    await ApiPut(`service/${idForEdit}`, formData)
      .then((res) => {
        if (res?.data?.status === 200) {
          console.log("ressssss", res);
          setLoading(false);
          GetAllServices();
          toast.success("Service updated successfully");
          setOpen(false);
        } else {
          setLoading(false);
          toast.error(res?.data?.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        toast.error(err?.message);
      });
  };

  const DeleteServices = async () => {
    setLoading(true);
    await ApiPut(`service/delete/${idForEdit}`)
      .then((res) => {
        console.log("delete", res);
        if (res?.data?.status === 200) {
          setShow(false);
          setLoading(false);
          GetAllServices();
          toast.success("Service deleted successfully");
          setOpen(false);
        } else {
          setShow(false);
          setLoading(false);
          toast.error(res?.data?.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        setShow(false);
        toast.error(err?.message);
      });
  };

  const Columns = [
    {
      name: "SNo",
      cell: (row, index) =>  (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "Title",
      cell: (row) => {
        return <>{row?.title}</>;
      },
      selector: (row) => row?.title,
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => {
        return (
          <>
            {row?.description}
          </>
        );
      },
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-between">
            <div
              className="cursor-pointer"
              onClick={() => {
                console.log("updatedrow", row);
                setSubmitValue(true);
                handleUpdateDetails(row);
                setIdForEdit(row?._id);
                setInputValue({
                  image: seteditimage(
                    `https://api.magnitochemicals.com${row?.image}`
                  ),
                  title: row?.title,
                  description: row?.description,
                });
              }}
            >
              <CreateIcon />
            </div>
            <div
              className="cursor-pointer mr-2"
              onClick={() => {
                setShow(true);
                setIdForEdit(row?._id);
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
      width: "150px",
    },
  ];

  // * Table Style
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="card p-1">
        <div className="p-2 mb-2">
          <div className="row d-flex justify-content-between mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Services</h2>
            </div>
            <div className=" d-flex ">
              <div>
                <Button
                  className="bg-customprimary"
                  onClick={() => {
                    handleClickAdd();
                    
                  }}
                >
                  Add Service
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* active-deactive model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">
              {/*Warnung!*/}Warning!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete this data?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                DeleteServices();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end active-deactive model */}

        {isLoaderVisible ? (
          <>
           <div className="d-flex justify-content-center">
                <Loader type="Puff" color="#334D52" height={30} width={30} />
              </div>
          </>
        ) : (
          <DataTable
            columns={Columns}
            data={filteredCategory}
            customStyles={customStyles}
            style={{
              marginTop: "-3rem",
            }}
            progressPending={loading}
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={count}
            paginationPerPage={countPerPage}
            paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
            paginationDefaultPage={page}
            onChangePage={(page) => {
              setPage(page);
            }}
            onChangeRowsPerPage={(rowPerPage) => {
              setCountPerPage(rowPerPage);
            }}
          />
        )}

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
                              width: "150px",
                              height: "150px",
                              borderRadius: "10px",
                            }}
                          />
                        ) : (
                          <img
                            src={editImage}
                            alt=""
                            style={{
                              width: "150px",
                              height: "150px",
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
                              width: "150px",
                              height: "150px",
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
                        EditServices(e);
                      }}
                      className="btn bg-customprimary mr-2"
                    >
                      <span>Edit Service</span>
                      {loading && (
                        <span className="mx-3 spinner spinner-white"></span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        AddServices(e);
                      }}
                      className="btn bg-customprimary mr-2"
                    >
                      <span>Add Service</span>
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
      </div>
    </>
  );
};

export default Service;
