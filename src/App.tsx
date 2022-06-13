import React from "react";
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
import { homeOutline, basketOutline, personOutline } from "ionicons/icons";
import HomePage from "./pages/HomePage";
import Basket from "./pages/Basket";
import Account from "./pages/Account";
import WelcomePage from "./pages/WelcomePage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Global theme */
import "./theme/global.css";

import { useModule } from "./store/context";

setupIonicReact();

const App: React.FC = () => {
  const { state, dispatch } = useModule();
  return (
    <>
      <IonApp>
        {state.userAuth ? (
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/homePage">
                  <HomePage state={state} dispatch={dispatch} />
                </Route>
                <Route exact path="/basket">
                  <Basket state={state} dispatch={dispatch} />
                </Route>
                <Route path="/account">
                  <Account state={state} dispatch={dispatch} />
                </Route>
                <Route exact path="/">
                  <Redirect to="/homePage" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="homePage" href="/homePage">
                  <IonIcon icon={homeOutline} />
                  <IonLabel>Accueil</IonLabel>
                </IonTabButton>
                <IonTabButton tab="basket" href="/basket">
                  <IonIcon icon={basketOutline} />
                  <IonLabel>Panier</IonLabel>
                </IonTabButton>
                <IonTabButton tab="account" href="/account">
                  <IonIcon icon={personOutline} />
                  <IonLabel>Mon compte</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        ) : (
          <WelcomePage state={state} dispatch={dispatch} />
        )}
      </IonApp>
      <style>
        {`
            
          `}
      </style>
    </>
  );
};

export default App;
