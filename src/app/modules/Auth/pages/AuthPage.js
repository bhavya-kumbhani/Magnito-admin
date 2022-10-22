/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect, useHistory } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import Changepassword from "../pages/changepassowrd";
import Logo from "../../../../_metronic/layout/components/Logos/camical.png";
import VerifyOtp from "./VerifyOtp";
import NewPassword from "./Newpassword";



export function AuthPage() {
  const history = useHistory();

  console.log("history", history.location.pathname);

  const today = new Date().getFullYear();
  return (
    <>
   
        <div className="d-flex flex-column flex-root">
          <div
            className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
            id="kt_login"
          >
            <div className="login-aside d-flex flex-row-auto   justify-content-center bgi-size- bgi-no-repeat p-10 p-lg-10">
            <div className="d-flex align-items-center justify-content-center">
            <img alt="logo" src={Logo} width="380px"  ></img>  
            </div>
          </div>

            <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
              <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                <Switch>
                  <ContentRoute path="/auth/login" component={Login} />
                  {/* <ContentRoute path="/home" component={Homemain} /> */}
                  {/* <ContentRoute path="/auth/signup" component={Signup} /> */}
                  <ContentRoute
                    path="/auth/forgot-password"
                    component={ForgotPassword}
                  />
                  <ContentRoute path="/auth/verifyotp" component={VerifyOtp} />
                  <ContentRoute
                    path="/auth/newpassword"
                    component={NewPassword}
                  />

                  {/* <ContentRoute
                  path="/changepassword"
                  component={Changepassword}
                /> */}

                  <Redirect from="/auth/login" exact={true} to="/auth/login" />
                  <Redirect to="/auth/login" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
    
    </>
  );
}
