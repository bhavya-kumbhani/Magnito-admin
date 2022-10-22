import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiGet,
  ApiPost,
  ApiDelete,
  ApiPut,
} from "../../../helpers/API/ApiData";
import { Slide } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, CarouselItem, Carousel } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Dialog } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { List } from "@material-ui/core";
import { getUserInfo } from "../../../utils/user.util";
import CreateIcon from "@material-ui/icons/Create";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";
import "../../../_metronic/_assets/sass/layout/_basic.scss";
import { Modal } from "react-bootstrap";
import { DataLoaded } from "../../../app/App";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Gallerys = () => {
  const{ProductData,ServiceData,GalleryData,ContactData,ProjectData}=useContext(DataLoaded);
  const[imgNum, setImgNum]=GalleryData;

  let userInfo = getUserInfo();
  const [inputValue, setInputValue] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitValue, setSubmitValue] = useState(false);
  const [seeOrders, setSeeOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [allproduct, setAllproduct] = useState([]);
  const [manufactureProduct, setManufactureProduct] = useState();
  const [filterManuPro, setFliterManuPro] = useState();
  const [idForDeleteProduct, setIdForDeleteProduct] = useState("");
  const [show, setShow] = useState(false);
  const [idForUpdateProduct, setIdForUpdateProduct] = useState("");
  const [uploadFiles, setUploadImages] = useState();
  const [orderData, setOrderData] = useState({});
  const [openImageData, setOpenImageData] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState();
  const [AddgalleryData, setAddgalleryData] = useState(false);
  const [getImage, setGetImage] = useState();
  const [updateImg,setUpdateImg]=useState()

  const response = { data: { toggle: 0 } };
  const [toggle, setToggle] = useState(response.data.toggle);

  useEffect(() => {
    GetAllgallery();
  }, []);

  const handleClickOpen = () => {
    console.log("cddbjv");
    setUploadImages("");
    setOpen(true);
    setAddgalleryData(true);
    setSubmitValue(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenImageData(false);
    setIsLoaderVisible(false);
    setSeeOrders(false);
    setShow(false);
    setErrors("");
    setOrderData("");
  };

  const handleChangeimg=(e)=>{
    setUploadImages(e.target.files[0]);
    setErrors({...errors,[e.target.name]:" "})
  }

  const Validation = () => {
    let error = {};
    let Formvalid = true;
    if (!uploadFiles && uploadFiles === "") {
      Formvalid = false;
      error["image"] = "Image is not selected*";
    }
    setErrors(error);
    return Formvalid;
  };

  const handleUpdateProduct = () => {
    setOpen(true);
    setSubmitValue(true);
  };

  const GetAllgallery = async () => {
    setIsLoaderVisible(true);
    console.log("mid in GetAllgallery");
    await ApiGet(`gallary/list`)
      .then((res) => {
        console.log("gallery===", res);
        setIsLoaderVisible(false);
        setManufactureProduct(res?.data?.data?.result);
        setFliterManuPro(res?.data?.data?.result);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoaderVisible(false);
        toast.error(err?.response?.data?.message);
      });
    setIsLoaderVisible(false);
  };

  const Addgallery = async (e) => {
    e.preventDefault();
    console.log("inputValueeeeeeeeee", inputValue);
    const ProductData = new FormData();
    ProductData.append("image", uploadFiles);

    // form data log open
    for (var pair of ProductData.entries()) {
      console.log("ProductData--------->", pair[0] + ", " + pair[1]);
    }
    // form data log close
    if (Validation()) {
      setLoading(true);
      await ApiPost("gallary", ProductData, {
        "Content-Type": "multipart/form-data",
      })
        .then((res) => {
          if (res?.status === 200) {
            console.log("##############",res)
            setLoading(false);
            toast.success("Image added successfully");
            handleClose();
            GetAllgallery();
            setUploadImages("");
          } else {
            setLoading(false);
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err?.message);
          setLoading(false);
        });
    }
  };

  const deletegallery = () => {
    ApiPut(`gallary/delete/${idForDeleteProduct}`)
      .then((res) => {
        console.log("deleteproduct", res);
        setShow(false);
        toast.success("image deleted successfully");
        GetAllgallery();
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const Updategallery = (e) => {
    e.preventDefault();
    setLoading(true);
    const ProductData = new FormData();
    ProductData.append("image", uploadFiles );
    
    // form data log open
    for (var pair of ProductData.entries()) {
      console.log("ProductDataUpdate--------->", pair[0] + ", " + pair[1]);
    }
    console.log("inn")
    // form data log close

    ApiPut(`gallary/${idForUpdateProduct}`, ProductData,{"Content-Type": "multipart/form-data"})
      .then((res) => {
        if (res?.data?.status === 200) {
          console.log("INNNN",res)
          setLoading(false);
          toast.success("Image updated successfully");
          setOpen(true);
          setSubmitValue(true);
          handleClose();
          GetAllgallery();
          setUploadImages("")
        } else {
          console.log("elseee")
          setLoading(false);
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err",err)
        toast.error(err)
      });
  };

  return (
    <>
      <ToastContainer />
      {/*start get all product data */}
      <div className="card p-1">
        <div className="p-2 mb-2">
          <div className="row d-flex justify-content-between mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">All Gallery</h2>
            </div>

            <div className=" d-flex ">
              <Button
                className="bg-customprimary "
                onClick={() => {
                  console.log("sbfhbgjfnd");
                  handleClickOpen();
                }}
              >
                Add Gallery
              </Button>
            </div>
          </div>
        </div>

        {/* delete model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Alert!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to want to delete this image ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deletegallery();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {userInfo?.roles === "admin" && (
          <div className="">
            {isLoaderVisible && (
              <div className="d-flex justify-content-center">
                <Loader type="Puff" color="#334D52" height={30} width={30} />
              </div>
            )}
            {isLoaderVisible === false && filterManuPro?.length === 0 && (
              <div className="d-flex justify-content-center"> There are no records to display</div>
            )}

            <div className="all-dis-card">
              {filterManuPro?.map((data, key) => {
                return (
                  <div className=" " key={key}>
                    <div className="p-5">
                      <div className="card body pb-2 shadow p-2 bg-white rounded">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div style={{ width: "150px" }}>
                            
                                <img
                                  className="shadow d-block justify-content-center bg-dark"
                                  src={`https://api.magnitochemicals.com${data?.image}`}
                                  alt="Product"
                                  style={{
                                    height: "150px",
                                    width: "150px",
                                    borderRadius: "5%",
                                  }}
                                />
                              
                          </div>
                        </div>

                        <div className="d-flex justify-content-center p-3">
                          <div
                            className="cursor-pointer mr-2"
                            onClick={() => {
                              setShow(true);
                              setIdForDeleteProduct(data?._id);
                            }}
                          >
                            <DeleteIcon />
                          </div>
                          <div
                            className="cursor-pointer mr-2"
                            onClick={() => {
                              setToggle();
                              handleUpdateProduct(data?._id);
                              setIdForUpdateProduct(data?._id);
                              setInputValue({
                                image: setGetImage(data.image),
                              });
                            }}
                          >
                            <CreateIcon />
                          </div>
                        </div>
                        <br />
                        {data?.isApproved === 0 && (
                          <span class="badge badge-dark w-100">
                            Not approved by admin
                          </span>
                        )}
                        {data?.isApproved === 1 && (
                          <span class="badge badge-success w-100">
                            Approved by admin
                          </span>
                        )}
                        {data?.isApproved === 2 && (
                          <span class="badge badge-danger w-100">
                            Rejected by admin
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/*end get all product data */}

      {/* //open modal for add product */}
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
        <List>
          <form>
            <div className="form ml-30 ">

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
                          name="image"
                          className={`form-control form-control-lg form-control-solid `}
                          onChange={(e) => {
                            setUploadImages(e.target.files[0]);
                            console.log("select@@@@",e.target.files[0])
                          }}
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
                              // objectFit: "cover",
                            }}
                          />
                        ):(
                          <img
                            src={`https://api.magnitochemicals.com${getImage}`}
                            alt=""
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "10px",
                              // objectFit: "cover",
                            }}
                          />
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <>

                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Images
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          className={`form-control form-control-lg form-control-solid `}
                          onChange={(e)=>{handleChangeimg(e)}}                        
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
                          {errors["image"]}
                        </span>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex align-items-center justify-content-center">
                {submitValue && submitValue === true ? (<>
                  {uploadFiles ? (<> <button
                    onClick={(e) => {
                      Updategallery(e);
                    }}
                    className="btn bg-customprimary mr-2"
                  >
                    <span>Update Image</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button></>):(<></>)}
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      Addgallery(e);
                    }}
                    className="btn bg-customprimary mr-2"
                  >
                    <span>Add Image</span>
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
      {/* //close modal for add product */}

      <Dialog
        fullScreen
        open={openImageData}
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

        <List>
          <div className="mx-30 d-flex justify-content-center">
            {!imageData?.length ? (
              <div className="text-dark h3">No Product Images</div>
            ) : (
              imageData?.map((data) => {
                return (
                  <div className="d-flex px-4 ">
                    <img
                      className="border rounded shadow"
                      width="250px"
                      src={data?.media}
                    ></img>
                  </div>
                );
              })
            )}
          </div>
        </List>
      </Dialog>
    </>
  );
};

export default Gallerys;
