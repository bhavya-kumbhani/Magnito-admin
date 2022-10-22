/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
// import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";

export const DataLoaded = createContext();

export default function App() {
  const [Pronum, setProNum]=useState()
  const[serNum,setSerNum] =useState()
  const[ProjectNum,SetProjectNum] =useState()
  const [contactNum, setContactNum] = useState();
  const [imgNum, setImgNum] = useState();

  const store = {
    ProductData: [Pronum, setProNum],
    ServiceData:[serNum,setSerNum],
    ProjectData:[ProjectNum,SetProjectNum],
    ContactData:[contactNum, setContactNum],
    GalleryData:[imgNum, setImgNum],

  };
  return (
        <React.Suspense fallback={<LayoutSplashScreen />}>
          <BrowserRouter>
            <MaterialThemeProvider>
               {/* <I18nProvider> */}
               <DataLoaded.Provider value={store}>
                <Routes />
                </DataLoaded.Provider>
              {/* </I18nProvider> */}
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
  );
}
