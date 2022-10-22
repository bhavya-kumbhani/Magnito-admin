import React, { useContext, useEffect, useState } from "react";
import { getUserInfo } from "../../../../utils/user.util";
import { ApiGet } from "../../../../helpers/API/ApiData";
import Logo from "../../../../_metronic/layout/components/Logos/camical.png";
import { DataLoaded } from "../../../../app/App";
import CountUp from "react-countup";
import { useHistory } from "react-router-dom";

// import {CatAtom} from '../../../Jotaistore';

export function MixedWidget1() {
  const history = useHistory();
  let userInfo = getUserInfo();
  const { ProductData, ServiceData, GalleryData, ContactData, ProjectData } =
    useContext(DataLoaded);
  const [Pronum, setProNum] = ProductData;
  const [serNum, setSerNum] = ServiceData;
  const [ProjectNum, SetProjectNum] = ProjectData;
  const [contactNum, setContactNum] = ContactData;
  const [imgNum, setImgNum] = GalleryData;

  // const [Pronum, setProNum]=useState()
  //   const[contactNum, setContactNum]=useState()

  useEffect(() => {
    if (userInfo?.roles === "admin") {
      GetAllServices();
      GetAllExpProject();
      GetProduct();
      getInquiryData();
      GetAllgallery();
    }
  }, []);

  const GetProduct = async () => {
    await ApiGet(`product?search`)
      .then((res) => {
        console.log("getblog", res);
        setProNum(res?.data?.data?.result?.total);
      })
      .catch((err) => {
        console.log("err", err?.response);
      });
  };
  const getInquiryData = async () => {
    await ApiGet(`contactUs?search`)
      .then((res) => {
        setContactNum(res?.data?.data?.result?.total);
      })
      .catch((err) => {
        console.log("err", err?.response);
      });
  };
  const GetAllServices = async () => {
    await ApiGet(`service?search`)
      .then((res) => {
        console.log(`service?search`, res);
        setSerNum(res?.data?.data?.result?.total);
      })
      .catch((err) => {
        console.log("err", err?.response);
      });
  };
  const GetAllExpProject = async () => {
    await ApiGet(`exploreProjects?search`)
      .then((res) => {
        console.log("Exploreproject", res);
        SetProjectNum(res?.data?.data?.result?.total);
      })
      .catch((err) => {
        console.log("err", err?.response);
      });
  };
  const GetAllgallery = async () => {
    console.log("mid in GetAllgallery");
    await ApiGet(`gallary`)
      .then((res) => {
        console.log("gallery===", res);
        setImgNum(res?.data?.data?.result?.total);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const jumpOnAdmins = () => {
    history.push("/products")
  };

  const jumpOnCategory = () => {
    history.push("/service");
  };

  const jumpOnCompany = () => {
    history.push("/exploreproject");
  };

  const jumpOnBulletin = () => {
    history.push("/Contactus");
  };

  const jumpOngallery = () => {
    history.push("/gallery");
  };
  return (
    //   <div>
    //   <div>
    //     <div className="honda-logo-center-alignment-page">
    //       <img alt="" src={Logo}   style={{width:"25%"}}/>
    //       <div></div>
    //       {userInfo?.roles === "user" && (
    //         <>
    //           <div className="card-spacer">
    //             <div className="row m-5"></div>
    //           </div>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <>
      <div
        className={`card card-custom`}
        style={{ backgroundColor: "#3F4255" }}
      >
        <div className="card-header border-0  py-1 px-1 m-5">
          <div className="card-body p-0 position-relative overflow-hidden">
            <div className="card-rounded-bottom" style={{ height: "25px" }}>
              <h4 className="font-weight-bolder text-white pt-2 pl-6">
                Dashboard
              </h4>
            </div>
            {userInfo?.roles === "admin" && (
              <>
                <div className="card-spacer">
                  <div
                    className="carder-box"
                    style={{
                      display: "grid",
                      gap: "12px",
                      gridTemplateColumns: "repeat(5,2fr)",
                      padding: "20px",
                    }}
                  >
                    {/* Product */}
                    <div className="bg-light-warning p-6 rounded">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h1
                                className="text-warning font-weight-bold"
                                style={{ fontSize: "40px" }}
                              >
                                {Pronum && (
                                  <CountUp end={Pronum} start={0} delay={1} />
                                )}
                              </h1>
                            </div>
                            <div style={{ display: "flex", marginTop: "6px" }}>
                              <i
                                className="fas fa-clipboard-list"
                                style={{ fontSize: "25px" }}
                              ></i>
                            </div>
                          </div>
                        </div>

                        <span className="text-warning font-weight-bold font-size-h3 d-block my-2 ml-3">
                          Products
                        </span>
                      </div>
                      <div
                        className="showMore d-flex justify-content-center"
                        onClick={(e) => jumpOnAdmins(e)}
                      >
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          {" "}
                          Show More{" "}
                          <span className="fa fa-arrow-right"></span>
                        </span>
                      </div>
                    </div>

                    {/* service */}
                    <div className="bg-light-warning p-6 rounded">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h1
                                className="text-warning font-weight-bold"
                                style={{ fontSize: "40px" }}
                              >
                                {serNum && (
                                  <CountUp end={serNum} start={0} delay={1} />
                                )}
                              </h1>
                            </div>
                            <div style={{ display: "flex", marginTop: "6px" }}>
                              <i
                                className="fa fa-cog"
                                style={{ fontSize: "25px" }}
                              ></i>
                              {/* <i className="fas fa-clipboard-list"></i> */}
                            </div>
                          </div>
                        </div>

                        <span
                          className="text-warning font-weight-bold font-size-h3 d-block my-2 ml-3"
                          style={{ cursor: "pointer" }}
                        >
                          Services
                        </span>
                      </div>

                      <div
                        className="showMore d-flex justify-content-center"
                        onClick={(e) => jumpOnCategory(e)}
                      >
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          {" "}
                          Show More{" "}
                          <span className="fa fa-arrow-right"></span>
                        </span>
                      </div>
                    </div>

                    {/* project */}
                    <div className="bg-light-warning p-6 rounded">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h1
                                className="text-warning font-weight-bold"
                                style={{ fontSize: "40px" }}
                              >
                                {ProjectNum && (
                                  <CountUp
                                    end={ProjectNum}
                                    start={0}
                                    delay={1}
                                  />
                                )}
                              </h1>
                            </div>
                            <div style={{ display: "flex", marginTop: "6px" }}>
                              <i
                                className="fas fa-clipboard-list"
                                style={{ fontSize: "25px" }}
                              ></i>
                            </div>
                          </div>
                        </div>

                        <span
                          className="text-warning font-weight-bold font-size-h3 d-block my-2 ml-3"
                          style={{ cursor: "pointer" }}
                        >
                          Project
                        </span>
                      </div>
                      <div
                        className="showMore d-flex justify-content-center"
                        onClick={(e) => jumpOnCompany(e)}
                      >
                        <span
                          className=" d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          {" "}
                          Show More{" "}
                          <span className="fa fa-arrow-right"></span>
                        </span>
                      </div>
                    </div>

                    {/* contact us */}
                    <div className="bg-light-warning p-6 rounded">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h1
                                className="text-warning font-weight-bold"
                                style={{ fontSize: "40px" }}
                              >
                                {contactNum && (
                                  <CountUp
                                    end={contactNum}
                                    start={0}
                                    delay={1}
                                  />
                                )}
                              </h1>
                            </div>
                            <div style={{ display: "flex", marginTop: "6px" }}>
                              <i
                                className="fa fa-phone"
                                style={{ fontSize: "25px",rotate:"-270deg" }}
                              ></i>
                            </div>
                          </div>
                        </div>

                        <span
                          className="text-warning font-weight-bold font-size-h3 d-block my-2 ml-3"
                          style={{ cursor: "pointer" }}
                        >
                          Contact Us
                        </span>
                      </div>
                      <div
                        className="showMore d-flex justify-content-center"
                        onClick={(e) => jumpOnBulletin(e)}
                      >
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          {" "}
                          Show More{" "}
                          <span className="fa fa-arrow-right"></span>
                        </span>
                      </div>
                    </div>

                    {/* gallery */}
                    <div className="bg-light-warning p-6 rounded">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h1
                                className="text-warning font-weight-bold"
                                style={{ fontSize: "40px" }}
                              >
                                {imgNum && (
                                  <CountUp end={imgNum} start={0} delay={1} />
                                )}
                              </h1>
                            </div>
                            <div style={{ display: "flex", marginTop: "6px" }}>
                              <i
                                className="fa fa-image"
                                style={{ fontSize: "30px" }}
                              ></i>
                            </div>
                          </div>
                        </div>

                        <span
                          className="text-warning font-weight-bold font-size-h3 d-block my-2 ml-3"
                          style={{ cursor: "pointer" }}
                        >
                          Gallery
                        </span>
                      </div>
                      <div
                        className="showMore"
                        onClick={(e) => jumpOngallery(e)}
                      >
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: "10px" }}
                        >
                          {" "}
                          Show More{" "}
                          <span className="fa fa-arrow-right"></span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
