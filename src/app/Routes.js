import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Auth from "../helpers/Auth";

export function Routes() {
  return (
    <Switch>
      {!Auth.isUserAuthenticat() ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>

          <AuthPage/>
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth/login" to="/" />
      )}
      <Route path="/error" component={ErrorsPage} />
      {/* <Route path="/logout" component={Logout} /> */}

      {!Auth.isUserAuthenticat() ? (
        <>
          {/* /*Redirect to `/auth` when user is not authorized */}
          <Redirect to="/auth/login" />
          {/* <Redirect to="/auth/signup" /> */}
        </>
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
