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

const Conta = () => {
  const { ProductData, ServiceData, GalleryData, ContactData, ProjectData } =
    useContext(DataLoaded);
  const [contactNum, setContactNum] = ContactData;

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

  const handleClickAdd = () => {
    setOpen(true);
    setSubmitValue(false);
    setInputValue({});
  };

  useEffect(() => {
    GetAllExpProject();
  }, [page, countPerPage]);

  const GetAllExpProject = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`contactUs?page=${page}&limit=${countPerPage}&search`)
      .then((res) => {
        console.log("Exploreproject", res);
        setIsLoaderVisible(false);
        setCount(res?.data?.data?.result?.total);
        setContactNum(res?.data?.data?.result?.total);
        setFilteredCategory(res?.data?.data?.result?.docs);
      })
      .catch((err) => {
        console.log("err", err?.response);
        toast.error(err?.message);
      });
  };

  const DeleteExpProject = async () => {
    setLoading(true);
    await ApiPut(`contactUs/delete/${idForEdit}`)
      .then((res) => {
        console.log("delete", res);
        if (res?.data?.status === 200) {
          setShow(false);
          setLoading(false);
          GetAllExpProject();
          toast.success("Contact deleted successfully");
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
      name: "Name",
      cell: (row) => {
        return <>{row?.first_name + " " + row?.surname}</>;
      },
      sortable: true,
    },
    {
      name: "Phone No.",
      cell: (row) => {
        return <>{"+" + row?.phone}</>;
      },

      sortable: true,
    },
    {
      name: "Email",
      cell: (row) => {
        return <>{row?.email}</>;
      },
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Message",
      cell: (row) => {
        return <>{row?.message}</>;
      },
      selector: (row) => row?.message,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-between">
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
              <h2 className="pl-3 pt-2">User Inquiry</h2>
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
          <Modal.Body>Are you sure want to delete this contact?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                DeleteExpProject();
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
      </div>
    </>
  );
};

export default Conta;
