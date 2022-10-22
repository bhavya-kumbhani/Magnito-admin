import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import DashboardPage from "./pages/DashboardPage";
import { getUserInfo } from "../../src/utils/user.util";
import ViewProfile from "../_metronic/layout/components/extras/dropdowns/ViewProfile";
import ChangePassword from "./modules/Auth/pages/changepassowrd";
import UpdatePassword from "./modules/Auth/pages/UpdatePassword";
import ChooseSection from "../_metronic/components/ChooseSection/ChooseSection";
import Products from "../_metronic/components/Product/Product";
import Service from "../_metronic/components/Service/Service";
import Exploreproject from "../_metronic/components/ExploreProject/Exploreprojectt";
import Aboutuss from "../_metronic/components/Aboutusss/Aboutuss";
import Contact from "../_metronic/components/contact/Contact";
import FooterSection from "../_metronic/components/FooterSection/FooterSection";
import Gallery from "../_metronic/components/Gallery/Gallerys";
import Conta from "../_metronic/components/Conta/Conta";
import Benefits from "../_metronic/components/Benefits/Benefits";
import Founder from "../_metronic/components/FounderSection/Founder";
import BestServiceProvider from "../_metronic/components/BestServiceProvider/BestServiceProvider";
import ProjectHeader from "../_metronic/components/ProjectHeader/ProjectHeader";
export default function BasePage() {
  let userInfo = getUserInfo();

  return (
    <>

      {userInfo?.roles === "admin" && (
        <Suspense fallback={<LayoutSplashScreen />}>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <ContentRoute exact path="/dashboard" component={DashboardPage} />
            <ContentRoute exact path="/ChooseSection" component={ChooseSection} />
            <ContentRoute exact path="/exploreproject" component={Exploreproject} /> 
            <ContentRoute exact path="/products" component={Products} />
            <ContentRoute exact path="/service" component={Service} />
            <ContentRoute exact path="/aboutus" component={Aboutuss} />
            {/* <ContentRoute exact path="/contactus" component={Contact} /> */}
            <ContentRoute exact path="/footersection" component={FooterSection} />
            <ContentRoute exact path="/gallery" component={Gallery} />
            <ContentRoute exact path="/Contactus" component={Conta} />
            <ContentRoute exact path="/benefits" component={Benefits} />
            <ContentRoute exact path="/founder" component={Founder} />
            <ContentRoute exact path="/service-provider" component={BestServiceProvider} />
            <ContentRoute exact path="/project-header" component={ProjectHeader} />
           <ContentRoute
              exact
              path="/updatepassword"
              component={UpdatePassword}
            />
            <Redirect to="error/error-v6" />
          </Switch>
        </Suspense>
      )}

    </>
  );
}
