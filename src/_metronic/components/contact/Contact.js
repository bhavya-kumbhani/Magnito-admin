import React, { useContext, useEffect, useState } from "react";
import { ApiDelete, ApiGet, ApiPut } from "../../../helpers/API/ApiData";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "react-bootstrap";
// import { getUserInfo } from "../../../utils/user.util";
import { Modal } from "react-bootstrap";
import {Slide} from "@material-ui/core";
import { getUserInfo } from "../../../utils/user.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { DataLoaded } from "../../../app/App";
import DataTable, { defaultThemes } from "react-data-table-component";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = () => {
  const{ProductData,ServiceData,GalleryData,ContactData,ProjectData}=useContext(DataLoaded);
  const[contactNum, setContactNum]=ContactData;

  let userInfo = getUserInfo(); 
  const [allUsers, setUserData] = useState([]);
  const [dataChange, setDataChange] = useState([]);
  const [docId, setDocId] = useState();
  const [show, setShow] = useState(false);
  const [staffModal, setStaffModal] = useState(false);
  const [key, setKey] = useState(-1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);





  const handleClose = () => {
    setShow(false);
  };
  ///////////////////////////////////////////////// get contact Data ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getInquiryData();
  }, [dataChange]);

  const getInquiryData = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`contactUs?search&page=${page}&limit=${countPerPage}`)
      .then((res) => {
        console.log("Exploreproject", res);
        setIsLoaderVisible(false);
        setCount(res?.data?.data?.result?.total);
        contactNum(res?.data?.data?.result?.total)
        setUserData(res?.data?.data?.result?.docs);
      })
      .catch((err) => {
        console.log("err", err?.response);
        toast.error(err?.message);
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleShow = (_id) => {
    console.log("11");
    setDocId(_id);
  };

  const handleDeleteInquiry = async () => {
    // setLoading(true);
    await ApiPut(`exploreProjects/delete/${docId}`)
      .then((res) => {
        console.log("delete", res);
        if (res?.data?.status === 200) {
          setShow(false);
          // setLoading(false);
          toast.success("Project deleted successfully");
          getInquiryData()
        } else {
          setShow(false);
          // setLoading(false);
          toast.error(res?.data?.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
        // setLoading(false);
        setShow(false);
        toast.error(err?.message);
      });
  };

  const handleShowStaff = (id) => {
    setStaffModal(!staffModal);
  };

  const Columns = [
    {
      name: "SNo",
      cell: (row, index) =>  (page - 1) * countPerPage + (index + 1),
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
      name: "Email",
      cell: (row) => {
        return (
          <>
            {row?.email}
          </>
        );
      },
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Message",
      cell: (row) => {
        return (
          <>
            {row?.message}
          </>
        );
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
                setDocId(row?._id);
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
          <Modal.Body>Are you sure want to delete this data?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                handleDeleteInquiry();
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
            data={allUsers}
            customStyles={customStyles}
            style={{
              marginTop: "-3rem",
            }}
            // progressPending={loading}
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
export default Contact;
