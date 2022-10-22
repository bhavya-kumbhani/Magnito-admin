/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { getUserInfo } from "../../../../../utils/user.util";
import "../../../../_assets/sass/layout/_basic.scss";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  let userInfo = getUserInfo();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${
          !hasSubmenu && "menu-item-active"
        } menu-item-open menu-item-not-hightlighted`
      : "";
  };
  return (
    <>
   
      {/* /////////////////////////////////////////////////////////////     Food owner Menus      //////////////////////////////////////////////////////// */}

      {userInfo?.roles === "admin" && (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li
            className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>

           <li
            className={`menu-item ${getMenuItemActive("/products", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/products">
              <span className="svg-icon menu-icon">
                <i className="fa fa-list" style={{ color: "white" }}></i>
              </span>
              <span className="menu-text">Products</span>
            </NavLink>
          </li>

         <li
            className={`menu-item ${getMenuItemActive("/ChooseSection",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/ChooseSection">
              <span className="svg-icon menu-icon">
                <img src={toAbsoluteUrl("/media/allIconsForTable/user.svg")} />
              </span>
              <span className="menu-text">Choose Us</span>
            </NavLink>
          </li>


          {/* about us */}
          <li
            className={`menu-item ${getMenuItemActive(
              "/exploreproject",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/exploreproject">
              <span className="svg-icon menu-icon">
                <i className="fa fa-list" style={{ color: "white" }}></i>

              </span>
              <span className="menu-text">Project</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive(
              "/project-header",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/project-header">
              <span className="svg-icon menu-icon">
                <i className="fa fa-list" style={{ color: "white" }}></i>

              </span>
              <span className="menu-text">Project Header</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/aboutus",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/aboutus">
              <span className="svg-icon menu-icon">
                <img src={toAbsoluteUrl("/media/allIconsForTable/info.svg")} />
              </span>
              <span className="menu-text">About Us</span>
            </NavLink>
          </li>

          {/* <li
            className={`menu-item ${getMenuItemActive(
              "/contactus",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/contactus">
              <span className="svg-icon menu-icon">
                <i className='fa fa-phone' style={{color: "white" , rotate:"-270deg"}}></i>
              </span>
              <span className="menu-text">Contact Us</span>
            </NavLink>
          </li> */}

          <li
            className={`menu-item ${getMenuItemActive(
              "/service",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/service">
              <span className="svg-icon menu-icon">
                <i className="fa fa-cog" style={{color : "white"}}></i>
               </span>
              <span className="menu-text">Service</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive(
              "/service-provider",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/service-provider">
              <span className="svg-icon menu-icon">
                <i className="fa fa-cogs" style={{color : "white"}}></i>
               </span>
              <span className="menu-text">Service Provider</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive(
              "/footersection",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/footersection">
              <span className="svg-icon menu-icon">
              <i className="fa fa-list" style={{ color: "white" }}></i>
               </span>
              <span className="menu-text">Header & Footer</span>
            </NavLink>
          </li>

          <li
            className={`menu-item ${getMenuItemActive(
              "/benefits",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/benefits">
              <span className="svg-icon menu-icon">
              <span className="svg-icon menu-icon">
                <img src={toAbsoluteUrl("/media/allIconsForTable/info.svg")} />
              </span>
               </span>
              <span className="menu-text">Benefits</span>
            </NavLink>
          </li>

          <li
            className={`menu-item ${getMenuItemActive("/founder",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/founder">
              <span className="svg-icon menu-icon">
                <img src={toAbsoluteUrl("/media/allIconsForTable/user.svg")} />
              </span>
              <span className="menu-text">Founder</span>
            </NavLink>
          </li>


          <li
            className={`menu-item ${getMenuItemActive(
              "/gallery",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/gallery">
               <span className="svg-icon menu-icon" style={{fill:"#ffff"}}>
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/image-gallery-svgrepo-com.svg")}
                />
              </span>
              <span className="menu-text">Gallery</span>
            </NavLink>
          </li>

          <li
            className={`menu-item ${getMenuItemActive(
              "/Conta",
              false
            )}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/Contactus">
            <span className="svg-icon menu-icon">
                <i className='fa fa-phone' style={{color: "white" , rotate:"-270deg"}}></i>
              </span>
              <span className="menu-text">Contact Us</span>
            </NavLink>
          </li>
          
        </ul>
      )}
    </>
  );
}
