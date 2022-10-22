/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useLayoutEffect, useEffect, useState } from "react";
import objectPath from "object-path";
import { useLocation } from "react-router-dom";
import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader,
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { getUserInfo } from "../../../../utils/user.util";
import { ApiGet } from "../../../../helpers/API/ApiData";

export function SubHeader() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  let userInfo = getUserInfo();
  const [price, setPrice] = useState();

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      ),
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs?.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title?.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  useEffect(() => {
    if (
      userInfo?.role?.roleName === "shop" ||
      userInfo?.role?.roleName === "manufacture"
    ) {
      getprice24();
    }
  }, []);

  const getprice24 = async () => {
    await ApiGet("price/?name=24")
      .then((res) => {
        console.log("res 24", res);
        if (res?.data?.message === "Success") {
          setPrice(res?.data?.payload?.price1[0]?.price);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getprice22 = async () => {
    await ApiGet("price/?name=22")
      .then((res) => {
        console.log("res 222222", res);
        if (res?.data?.message === "Success") {
          setPrice(res?.data?.payload?.price1[0]?.price);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getprice18 = async () => {
    await ApiGet("price/?name=18")
      .then((res) => {
        console.log("res 18", res);
        if (res?.data?.message === "Success") {
          setPrice(res?.data?.payload?.price1[0]?.price);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
    if (e.target.value === "18") {
      getprice18();
    } else if (e.target.value === "22") {
      getprice22();
    } else {
      getprice24();
    }
  };

  return (
    <div
      id="kt_subheader"
      className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
    >
      <div
        className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}

          <div className="d-flex align-items-baseline mr-5">
            <h5 className="text-dark font-weight-bold my-2 mr-5">
              <>{subheader.title}</>
              {/*<small></small>*/}
            </h5>
          </div>

          <BreadCrumbs items={subheader.breadcrumbs} />
        </div>

        {/* Toolbar */}
        <div className="d-flex align-items-center">
          <div className="mr-2">
            <a
              href="#"
              className="btn btn-light btn-sm font-weight-bold"
              id="kt_dashboard_daterangepicker"
              data-toggle="tooltip"
              title="Select dashboard daterange"
              data-placement="left"
            >
              <span
                className="text-muted font-weight-bold mr-2"
                id="kt_dashboard_daterangepicker_title"
              >
                Today
              </span>
              <span
                className="text-primary font-weight-bold"
                id="kt_dashboard_daterangepicker_date"
              >
                {date}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
