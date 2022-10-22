import React, { useMemo } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import Auth from "../../../../../helpers/Auth";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import objectPath from "object-path";
import { toAbsoluteUrl } from "../../../../_helpers";
import { getUserInfo } from "../../../../../utils/user.util";
import { Link, useHistory } from "react-router-dom";
import ViewProfile from "./ViewProfile";

export function UserProfileDropdown() {
  let userInfo = getUserInfo();
  const history = useHistory();
  const uiService = useHtmlClassService();

  const Logout = async () => {
    await Auth.deauthenticateLocalUser();
    window.location.reload();
  };

  const ViewProfile = (e) => {
    e.preventDefault();
    history.push("/viewprofile");
  };

  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
          }
        >
          <span className="text-muted font-weight-bold font-size-base d-md-inline mr-1">
            Hi,
          </span>{" "}
          {userInfo?.roles === "admin" ? (
            <>
              <span className="text-dark-50 font-weight-bolder font-size-base d-md-inline mr-3">
                {userInfo?.first_name?.toUpperCase()}
              </span>
              <span className="symbol symbol-35 symbol-light-success">
                <span className="symbol-label font-size-h5 font-weight-bold">
                  {userInfo?.last_name[0]?.toUpperCase() + ". "}
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="text-dark-50 font-weight-bolder font-size-base d-md-inline mr-3">
                {userInfo?.first_name?.toUpperCase() +
                  "  " +
                  userInfo?.last_name?.toUpperCase()}
              </span>
              <span className="symbol symbol-35 symbol-light-success">
                <span className="symbol-label font-size-h5 font-weight-bold">
                  {userInfo?.firstName[0]?.toUpperCase() +
                    userInfo?.lastName[0]?.toUpperCase() +
                    ". "}
                </span>
              </span>
            </>
          )}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <>
          {!layoutProps.light && (
            <>
              <div
                className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    "/media/misc/contact-banner.jpg"
                  )})`,
                }}
              >
                <div className="symbol bg-dark-o-15 mr-3">
                  {userInfo?.roles === "admin" ? (
                    <span className="bg-dark symbol-label text-success font-weight-bold font-size-h4">
                      {userInfo?.first_name[0]?.toUpperCase()}
                    </span>
                  ) : (
                    <span className="bg-light symbol-label text-success font-weight-bold font-size-h3">
                      {userInfo?.first_name[0]?.toUpperCase() +
                        userInfo?.last_name[0]?.toUpperCase()}
                    </span>
                  )}

                  {/*<img alt="Pic" className="hidden" src={user.pic} />*/}
                </div>
                <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
                  {userInfo?.roles === "admin" ? (
                    <div>{userInfo?.first_name?.toUpperCase()}</div>
                  ) : (
                    <div>
                      {!userInfo?.first_name?.toUpperCase() +
                      " " +
                      userInfo?.last_name?.toUpperCase()
                        ? ""
                        : userInfo?.first_name?.toUpperCase() +
                          " " +
                          userInfo?.last_name?.toUpperCase()}
                    </div>
                  )}
                  {userInfo?.roles === "admin" ? (
                    <span className="font-weight-light h6">
                      {userInfo?.emailIDForOTP}
                    </span>
                  ) : (
                    <>
                      <span className="font-weight-light h6">
                        {userInfo?.email}
                      </span>
                    </>
                  )}
                </div>

                {/* <span className="label label-success label-lg font-weight-bold label-inline">
                3 messages
              </span> */}
              </div>
            </>
          )}
        </>

        <div className="d-flex navi navi-spacer-x-0 ">
          {/* {userInfo?.role !== "admin" && (
            <div className="navi-footer px-8 py-1">
              <Link to="/userprofile">
                <div
                  className="btn btn-light-primary font-weight-bold"
                  onClick={ViewProfile}
                >
                  My Profile
                </div>
              </Link>
            </div>
          )} */}
          <div
            className="navi-footer  px-8 py-5"
            onClick={() => {
              Logout();
            }}
          >
            <Link className="btn bg-customprimary font-weight-bold">
              Sign Out
            </Link>
          </div>
          <div className="navi-footer  px-8 py-5">
            <Link
              className="btn bg-customprimary font-weight-bold"
              to="/updatepassword"
            >
              Profile
            </Link>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
