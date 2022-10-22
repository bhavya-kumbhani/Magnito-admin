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
import Loader from "react-loader-spinner";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Dialog } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { DataLoaded } from "../../../app/App";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { remove } from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Products = () => {
  const { ProductData } = useContext(DataLoaded);
  const [Pronum, setProNum] = ProductData;
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
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [uploadFiles, setUploadImages] = useState([]);
  const [editImage, seteditimage] = useState();
  const [editorData, setEditorData] = useState();
  const [file, setFile] = useState([]);
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

  function deleteFile(e) {
    const s = uploadFiles.filter((item, index) => index !== e);
    setUploadImages(s);
    console.log("sssssssssssssss",s);
  }

  useEffect(() => {
    GetProduct();
  }, [page, countPerPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("eeeeee", value);

    if (name === "title" && value.charAt(e.length) === " ") return;
    if (name === "description" && value.charAt(e.length) === " ") return;
    if (name === "product_id" && value.charAt(e.length) === " ") return;
    if (name === "product_tag" && value.charAt(e.length) === " ") return;
    if (name === "productattributes" && value.charAt(e.length) === " ") return;
    if (name === "purity" && value.charAt(e.length) === " ") return;
    if (name === "size" && value.charAt(e.length) === " ") return;
    if (name === "cas_no" && value.charAt(e.length) === " ") return;
    if (name === "appearance" && value.charAt(e.length) === " ") return;
    else {
      setInputValue({ ...inputValue, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };
  const handleAddBlogData = (content) => {
    setEditorData(content);
    // setErrorsForAdd({ ...errorsForAdd, blogDescription: "" });
    setErrors({ ...errors, description: "" });
  };

  const handleChangeimg = (e) => {
    setUploadImages(Array.from(e.target.files));
    setErrors({ ...errors, [e.target.name]: "" });
  };
  console.log("Fileeeee", uploadFiles);

  const removes = (index) => {
    setUploadImages((oldimg) => oldimg.filter((e) => e.name !== index))
  };

  const removeEditProduct = async (idForEdit, imgs) => {
    const body = {
      image: imgs,
    };
    await ApiPut(`product/image/${idForEdit}`, body)
      .then((res) => {
        console.log(res, "resssss");
        getimg(idForEdit);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getimg = async (id) => {
    await ApiGet(`product/${id}`)
      .then((res) => {
        console.log(res, "resssss");

        seteditimage(res?.data?.data?.product?.image);
        setInputValue({
          title: res?.data?.data?.product?.title,
          description: res?.data?.data?.product?.description,
          product_id: res?.data?.data?.product?.product_id,
          product_tag: res?.data?.data?.product?.product_tag,
          productattributes: res?.data?.data?.product?.product_attributes?.mf,
          purity: res?.data?.data?.product?.product_attributes?.purity,
          size: res?.data?.data?.product?.product_attributes?.size,
          cas_no: res?.data?.data?.product?.product_attributes?.cas_no,
          appearance: res?.data?.data?.product?.product_attributes?.appearance,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const Validation = () => {
    let error = {};
    let Formvalid = true;
    if (!inputValue?.title) {
      Formvalid = false;
      error["title"] = " Title is required*";
    }

    if (!editorData) {
      Formvalid = false;
      error["description"] = "description is required*";
    }
    // if (!inputValue?.product_id) {
    //   Formvalid = false;
    //   error["product_id"] = "Product id is required*";
    // }
    // if (!inputValue?.product_tag) {
    //   Formvalid = false;
    //   error["product_tag"] = "Product tag is required*";
    // }
    // if (!inputValue?.productattributes) {
    //   Formvalid = false;
    //   error["productattributes"] = "Product attributes is required*";
    // }
    // if (!inputValue?.purity) {
    //   Formvalid = false;
    //   error["purity"] = "Purity is required*";
    // }
    // if (!inputValue?.size) {
    //   Formvalid = false;
    //   error["size"] = "size is required*";
    // }
    // if (!inputValue?.cas_no) {
    //   Formvalid = false;
    //   error["cas_no"] = "Cas no is required*";
    // }
    // if (!inputValue?.appearance) {
    //   Formvalid = false;
    //   error["appearance"] = "Appearance is required*";
    // }
    if (!uploadFiles || uploadFiles.length === 0) {
      console.log("bbbbb");
      Formvalid = false;
      error["image"] = "Image is not selected*";
    }
    setErrors(error);
    console.log("error", error);
    return Formvalid;
  };

  const GetProduct = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`product?page=${page}&limit=${countPerPage}&search`)
      .then((res) => {
        console.log("getblog", res);
        setIsLoaderVisible(false);
        setCount(res?.data?.data?.result?.total);
        setProNum(res?.data?.data?.result?.total);
        setFilteredCategory(res?.data?.data?.result.docs);
      })
      .catch((err) => {
        console.log("err", err?.response);
        toast.error(err?.response?.data?.message);
      });
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    let formData = new FormData();
      formData.append("title", inputValue?.title ? inputValue?.title :"");
    formData.append("description", editorData ? editorData :"");
    formData.append("product_id", inputValue?.product_id ? inputValue?.product_id :"");
    formData.append("product_tag", inputValue?.product_tag ?  inputValue?.product_tag:"");
    formData.append("product_attributes.mf", inputValue?.productattributes ? inputValue?.productattributes :"");
    formData.append("product_attributes.purity", inputValue?.purity ? inputValue?.purity :"");
    formData.append("product_attributes.size", inputValue?.size ?  inputValue?.size :"");
    formData.append("product_attributes.cas_no", inputValue?.cas_no ? inputValue?.cas_no :"");
    formData.append("product_attributes.appearance", inputValue?.appearance ? inputValue?.appearance :"");
    // formData.append("image", uploadFiles);
    let fileArr = Array?.from(uploadFiles);
    fileArr.forEach((file) => {
      console.log("@@@@@@@@@@@@");
      formData.append("image", file);
    });
    console.log("fileArr", fileArr);
    if (Validation()) {
      setLoading(true);
      await ApiPost(`product`, formData, {
        "Content-Type": "multipart/form-data",
      })
        .then((res) => {
          if (res?.data?.status === 200) {
            console.log("CreateData----->", res);
            setLoading(false);
            GetProduct();
            setInputValue({});
            setUploadImages([]);
            toast.success("Product added successfully");
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
    }
  };

  const EditProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", inputValue?.title);
    // formData.append("image", uploadFiles ? uploadFiles : editImage);
    formData.append("description", editorData ? editorData : inputValue?.description);
    formData.append("product_id", inputValue?.product_id);
    formData.append("product_tag", inputValue?.product_tag);
    formData.append("product_attributes.mf", inputValue?.productattributes);
    formData.append("product_attributes.purity", inputValue?.purity);
    formData.append("product_attributes.size", inputValue?.size);
    formData.append("product_attributes.cas_no", inputValue?.cas_no);
    formData.append("product_attributes.appearance", inputValue?.appearance);
    let fileArr = Array?.from(uploadFiles ? uploadFiles : editImage);
    fileArr.forEach((file) => {
      console.log("@@@@@@@@@@@@");
      formData.append("image", file);
    });
    console.log("aboutUs", formData);
    await ApiPut(`product/${idForEdit}`, formData)
      .then((res) => {
        if (res?.data?.status === 200) {
          console.log("ressssss", res);
          setLoading(false);
          GetProduct();
          toast.success("Product updated successfully");
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

  const DeleteProduct = async () => {
    setLoading(true);
    await ApiPut(`product/delete/${idForEdit}`)
      .then((res) => {
        console.log("delete", res);
        if (res?.data?.status === 200) {
          setShow(false);
          setLoading(false);
          GetProduct();
          toast.success("Product deleted successfully");
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
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
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
            {
              <p
                dangerouslySetInnerHTML={{
                  __html: row?.description,
                }}
              />
            }
          </>
        );
      },
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Cas No.",
      cell: (row) => {
        return <>{row?.product_attributes?.cas_no}</>;
      },
      selector: (row) => row?.product_attributes?.cas_no,
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
                // seteditimage(row?.image);
                getimg(row?._id);
                setInputValue({
                  title: row?.title,
                  description: row?.description,
                  // product_id: row?.product_id,
                  // product_tag: row?.product_tag,
                  // productattributes: row?.product_attributes?.mf,
                  // purity: row?.product_attributes?.purity,
                  // size: row?.product_attributes?.size,
                  // cas_no: row?.product_attributes?.cas_no,
                  // appearance: row?.product_attributes?.appearance,
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
  console.log("editImage", editImage);

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
    checkbox: {
      style: {
        maxHeight: "18px",
        maxWidth: "18px",
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
              <h2 className="pl-3 pt-2">Products</h2>
            </div>
            <div className=" d-flex ">
              <div>
                <Button
                  className="bg-customprimary"
                  onClick={() => {
                    handleClickAdd();
                  }}
                >
                  Add Product
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
                DeleteProduct();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end active-deactive model */}

        {isLoaderVisible ? (
          <>
            <div className="d-flex justify-content-center pb-2">
              <Loader type="Puff" color="#334D52" height={30} width={30} />
            </div>
            {/* <div
              className="d-flex justify-content-center"
              style={{ marginTop: "20px" }}
            >
              <div className="spinner-border text-dark" role="status"></div>{" "}
            </div> */}
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
                        value={inputValue?.title || ""}
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
                        value={inputValue?.description || ""}
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

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Product ID
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="product_id"
                        name="product_id"
                        value={inputValue?.product_id || ""}
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
                      {/* {errors["product_id"]} */}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Product Tags
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="product_tag"
                        name="product_tag"
                        value={inputValue?.product_tag || ""}
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
                      {/* {errors["product_tag"]} */}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Product Attributes
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="productattributes"
                        name="productattributes"
                        value={inputValue?.productattributes || ""}
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
                      {/* {errors["productattributes"]} */}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Purity
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="purity"
                        name="purity"
                        value={inputValue?.purity || ""}
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
                      {/* {errors["purity"]} */}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Size
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="size"
                        name="size"
                        value={inputValue?.size || ""}
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
                      {/* {errors["size"]} */}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    CAS NO
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="cas_no"
                        name="cas_no"
                        value={inputValue?.cas_no || ""}
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
                      {/* {errors["cas_no"]} */}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Appearance
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="appearance"
                        name="appearance"
                        value={inputValue?.appearance || ""}
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
                      {/* {errors["appearance"]} */}
                    </span>
                  </div>
                </div>

                {submitValue && submitValue === true ? (
                  <>
                    {console.log("panoti")}
                    <div className="form-group row">
                      <label className="col-xl-3 col-lg-3 col-form-label">
                        Update Image
                      </label>
                      <div className="col-lg-9 col-xl-6">
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className={`form-control form-control-lg form-control-solid `}
                            id="image"
                            name="image"
                            onChange={(e) => handleChangeimg(e)}
                          />
                        </div>
                        <br />
                        <div
                          className="d-flex flex-wrap"
                          style={{ gap: "15px" }}
                        >
                          {uploadFiles && uploadFiles.length > 0 ? (
                            <>
                              {uploadFiles?.map((img, index) => {
                                return (
                                  <>
                                    <div className="position-relative">
                                      <img
                                        key={index}
                                        src={URL.createObjectURL(img)}
                                        alt=""
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          borderRadius: "10px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <div
                                        className="justify-content-center p-2 position-absolute"
                                        style={{ right: "-10px", top: "-13px" }}
                                      >
                                        <i
                                          class="fa fa-times"
                                          aria-hidden="true"
                                          onClick={() => deleteFile(index)}
                                        ></i>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              {editImage?.map((imgs, index) => {
                                console.log("in else");
                                return (
                                  <>
                                    <div className="position-relative">
                                      <img
                                        key={index}
                                        src={`https://api.magnitochemicals.com${imgs}`}
                                        alt=""
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                          borderRadius: "10px",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <div
                                        className="justify-content-center p-2 position-absolute"
                                        style={{ right: "-10px", top: "-13px" }}
                                      >
                                        <i
                                          class="fa fa-times"
                                          aria-hidden="true"
                                          onClick={(e) =>
                                            removeEditProduct(idForEdit, imgs)
                                          }
                                        ></i>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </div>
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
                            multiple
                            onChange={(e) => handleChangeimg(e)}
                          />
                        </div>
                        <br />
                        <div
                          className="d-flex flex-wrap"
                          style={{ gap: "15px" }}
                        >
                          {uploadFiles &&
                            uploadFiles.map((img, index) => {
                              return (
                                <>
                                  <div className="position-relative">
                                    <img
                                      key={index}
                                      src={URL.createObjectURL(img)}
                                      alt=""
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "10px",
                                        // objectFit: "cover",
                                      }}
                                    />
                                    <div
                                      className="justify-content-center p-2 position-absolute"
                                      style={{ right: "-10px", top: "-13px" }}
                                    >
                                      <i
                                        class="fa fa-times"
                                        aria-hidden="true"
                                        onClick={() => deleteFile(index)}
                                      ></i>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                        <span
                          style={{
                            color: "red",
                            top: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {errors.image}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="d-flex align-items-center justify-content-center">
                  {submitValue && submitValue === true ? (
                    <button
                      onClick={(e) => {
                        EditProduct(e);
                      }}
                      className="btn bg-customprimary mr-2"
                    >
                      <span>Edit Product</span>
                      {loading && (
                        <span className="mx-3 spinner spinner-white"></span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        AddProduct(e);
                      }}
                      className="btn bg-customprimary mr-2"
                    >
                      <span>Add Product</span>
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

export default Products;
