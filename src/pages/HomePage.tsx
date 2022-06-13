import React from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { fastFoodOutline } from "ionicons/icons";

import RestaurantList from "../components/HomePage/RestaurantList";
import AddressDisplay from "../components/HomePage/AddressDisplay";

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
                <IonIcon icon={fastFoodOutline} className="page-header-logo" />
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
