import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import RestaurantList from "../components/HomePage/RestaurantList";
import AddressDisplay from "../components/HomePage/AddressDisplay";
import AddressModal from "../components/HomePage/AddressPicker";

interface HomePageProps {
  state: any;
  dispatch: any;
}

class HomePage extends React.Component<HomePageProps> {
  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="page-header">
                <img
                  src="/assets/icon/favicon.png"
                  alt="Logo"
                  width={"32px"}
                  height={"32px"}
                  className="page-header-logo"
                />
                Accueil
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <AddressDisplay
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
            <RestaurantList
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
            <AddressModal
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
          </IonContent>
        </IonPage>
        <style>
          {`

          `}
        </style>
      </>
    );
  }
}

export default HomePage;
