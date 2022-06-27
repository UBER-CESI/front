/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  basketOutline,
  personOutline,
  fastFoodOutline,
  gridOutline,
  listOutline,
} from "ionicons/icons";

import WelcomePage from "./pages/WelcomePage";

import CustomerHomePage from "./pages/Customer/HomePage";
import CustomerBasket from "./pages/Customer/Basket";
import CustomerAccount from "./pages/Customer/Account";
import Order from "./components/Customer/Basket/Order";
import CustomerRestaurantMenu from "./components/Customer/HomePage/RestaurantMenu";

import DelivererAccount from "./pages/Deliverer/Account";
import DelivererAvailableOrders from "./pages/Deliverer/AvailableOrders";
import DelivererCurrentOrders from "./pages/Deliverer/CurrentOrders";

import RestaurantAccount from "./pages/Restaurant/Account";
import RestaurantMenu from "./pages/Restaurant/Menu";
import RestaurantOrders from "./pages/Restaurant/Orders";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import "./theme/global.css";

import { useModule } from "./store/context";

import { login } from "./services/loginRegister";
import { loginType } from "./models/loginRegister";
import { getRestaurantList } from "./services/restaurant";
import {setupNotifications} from "./services/notifications"
setupIonicReact();
setupNotifications("http://127.0.0.1:3000/notifications")
const App: React.FC = () => {
  const { state, dispatch } = useModule();
  const [loadingScreen, setLoadingScreen] = React.useState(true);

  useEffect(() => {
    let userLogin: loginType = {
      email: "r@r.com",
      password: "password",
    };
    login(userLogin)
      .then((res) => {
        dispatch({
          type: "CHANGE_USER_AUTH",
          payload: true,
        });
        dispatch({
          type: "CHANGE_TYPE_USER",
          payload: res.typeUser,
        });
        getRestaurantList().then((restaurants) => {
          console.log("restaurants", restaurants);
        });
        switch (res.typeUser) {
          case "customer":
            console.log("customer");
            break;
          case "restaurant":
            console.log("restaurant");
            break;
          case "deliverer":
            console.log("deliverer");
            break;
          case "admin":
            console.log("admin");
            break;
        }
        dispatch({
          type: "CHANGE_USER_INFO",
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setLoadingScreen(false);
    }, 2100);
  }, []);

  const firstTab = () => {
    switch (state.typeUser) {
      case "customer":
        return {
          tab: "homePage",
          href: "/homePage",
          icon: homeOutline,
          label: "Accueil",
        };
      case "restaurant":
        return {
          tab: "restaurantOrders",
          href: "/restaurantOrders",
          icon: fastFoodOutline,
          label: "Commandes",
        };
      case "deliverer":
        return {
          tab: "delivererCurrentOrders",
          href: "/delivererCurrentOrders",
          icon: fastFoodOutline,
          label: "Commandes en cours",
        };
    }
  };

  const secondTab = () => {
    switch (state.typeUser) {
      case "customer":
        return {
          tab: "basket",
          href: "/basket",
          icon: basketOutline,
          label: "Panier",
        };
      case "restaurant":
        return {
          tab: "restaurantMenu",
          href: "/restaurantMenu",
          icon: gridOutline,
          label: "Menu",
        };
      case "deliverer":
        return {
          tab: "delivererAvailableOrders",
          href: "/delivererAvailableOrders",
          icon: listOutline,
          label: "Commandes disponibles",
        };
    }
  };

  const thirdTab = () => {
    switch (state.typeUser) {
      case "customer":
        return {
          tab: "customerAccount",
          href: "/customerAccount",
        };
      case "restaurant":
        return {
          tab: "restaurantAccount",
          href: "/restaurantAccount",
        };
      case "deliverer":
        return {
          tab: "delivererAccount",
          href: "/delivererAccount",
        };
    }
  };

  const defaultTab = () => {
    switch (state.typeUser) {
      case "customer":
        return "/homePage";
      case "restaurant":
        return "/restaurantOrders";
      case "deliverer":
        return "/delivererCurrentOrders";
      default:
        return "/homePage";
    }
  };

  return (
    <>
      <IonApp>
        {loadingScreen ? (
          <div className="loading-screen">
            <div className="loading-screen-content">
              <img
                src="/assets/icon/cesi-eats.png"
                alt="CESI Eats"
                className="loading-screen-content-logo"
              />
            </div>
          </div>
        ) : state.userAuth ? (
          <>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  {/* Customer routes */}
                  <Route exact path="/homePage">
                    <CustomerHomePage state={state} dispatch={dispatch} />
                  </Route>
                  <Route exact path="/basket">
                    <CustomerBasket state={state} dispatch={dispatch} />
                  </Route>
                  <Route path="/account">
                    <CustomerAccount state={state} dispatch={dispatch} />
                  </Route>
                  <Route path="/restaurant/menu">
                    <CustomerRestaurantMenu state={state} dispatch={dispatch} />
                  </Route>
                  <Route path="/order">
                    <Order state={state} dispatch={dispatch} />
                  </Route>

                  {/* Restaurant routes */}
                  <Route path="/restaurantOrders">
                    <RestaurantOrders state={state} dispatch={dispatch} />
                  </Route>
                  <Route path="/restaurantMenu">
                    <RestaurantMenu state={state} dispatch={dispatch} />
                  </Route>
                  <Route path="/restaurantAccount">
                    <RestaurantAccount state={state} dispatch={dispatch} />
                  </Route>

                  {/* Deliverer routes */}
                  <Route path="/delivererAccount">
                    <DelivererAccount state={state} dispatch={dispatch} />
                  </Route>
                  <Route path="/delivererAvailableOrders">
                    <DelivererAvailableOrders
                      state={state}
                      dispatch={dispatch}
                    />
                  </Route>
                  <Route path="/delivererCurrentOrders">
                    <DelivererCurrentOrders state={state} dispatch={dispatch} />
                  </Route>

                  <Route exact path="/">
                    <Redirect to={defaultTab()} />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab={firstTab()?.tab} href={firstTab()?.href}>
                    <IonIcon icon={firstTab()?.icon} />
                    <IonLabel>{firstTab()?.label}</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab={secondTab()?.tab} href={secondTab()?.href}>
                    <IonIcon icon={secondTab()?.icon} />
                    <IonLabel>{secondTab()?.label}</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab={thirdTab()?.tab} href={thirdTab()?.href}>
                    <IonIcon icon={personOutline} />
                    <IonLabel>Mon compte</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </>
        ) : (
          <WelcomePage state={state} dispatch={dispatch} />
        )}
      </IonApp>
      <style>
        {`
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #gray;
            z-index: 9999;
          }
          .loading-screen-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .loading-screen-content-logo {
            width: 200px;
            height: 200px;
            border: 3px solid white;
            border-radius: 50px;
            -webkit-animation: spin 2s linear infinite;
            -moz-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
          }
          @-moz-keyframes spin { 
            100% { -moz-transform: rotate(360deg); } 
          }
          @-webkit-keyframes spin { 
            100% { -webkit-transform: rotate(360deg); } 
          }
          @keyframes spin { 
            100% { 
              -webkit-transform: rotate(360deg); 
              transform:rotate(360deg); 
            } 
          }
        `}
      </style>
    </>
  );
};

export default App;
