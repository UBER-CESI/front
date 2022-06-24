import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import RestaurantList from "../../components/Customer/HomePage/RestaurantList";
import AddressDisplay from "../../components/Customer/HomePage/AddressDisplay";
import AddressModal from "../../components/Customer/HomePage/AddressPicker";

interface CustomerHomePageProps {
  state: any;
  dispatch: any;
}

class CustomerHomePage extends React.Component<CustomerHomePageProps> {
  homePageContent = () => {
    switch (this.props.state.userInfo.typeUser) {
      case "customer":
        return <></>;
      case "restaurant":
        return <></>;
      case "deliverer":
        return <></>;
      case "admin":
        return <></>;
    }
  };

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

export default CustomerHomePage;
