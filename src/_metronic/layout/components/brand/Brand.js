import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import Logo from "../../../layout/components/Logos/camical.png";
import { getUserInfo } from "../../../../utils/user.util";
import { useAtom } from "jotai";
import { ProfileAtom } from "../../../Jotaistore";
import { ApiGet } from "../../../../helpers/API/ApiData";

export function Brand() {
  const uiService = useHtmlClassService();
  let userInfo = getUserInfo();
  const [logoAtom, setLogoAtom] = useAtom(ProfileAtom);
  const id = userInfo?._id;

  useEffect(() => {
    // getUserData();
  }, []);
  // const getUserData = async () => {
  //   await ApiGet(`admin/get-admin/${id}`)
  //     .then((res) => {
  //       console.log("get user data", res?.data?.payload?.admin[0]);
  //       setLogoAtom(res?.data?.payload?.admin[0]?.photo);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses("brand", true),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo(),
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Brand */}
      <div
        className={`brand flex-column-auto ${layoutProps.brandClasses}`}
        id="kt_brand"
      >
        {/* begin::Logo */}
        <Link to="/dashboard" className="brand-logo">
          <div className="d-flex align-items-center">
            <img alt="logo" src={Logo} height="50px" />
            {/* <h4 className=" brand-name pl-6 m-0">Magnito Chemical</h4> */}
          </div>
        </Link>

        {/* <Link to="/dashboard" className="brand-logo">
                    <img alt="logo" src="" width="70%" />
                    <img alt="logo" src="public\media\logos\mini-logo1.png" width="70%" />
                </Link> */}
        {/* <logoImg /> */}
        {/* end::Logo */}

        {layoutProps.asideSelfMinimizeToggle && (
          <>
            {/* begin::Toggle */}
            <button
              className="brand-toggle btn btn-sm px-0"
              id="kt_aside_toggle"
            >
              <span className="svg-icon svg-icon-xl">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Navigation/Angle-double-left.svg"
                  )}
                />
              </span>
            </button>
            {/* end::Toolbar */}
          </>
        )}
      </div>
      {/* end::Brand */}
    </>
  );
}
