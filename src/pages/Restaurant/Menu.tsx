import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";

interface RestaurantMenuProps {
  state: any;
  dispatch: any;
}

class RestaurantMenu extends React.Component<RestaurantMenuProps> {
  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <img
                  src="/assets/icon/favicon.png"
                  alt="Logo"
                  width={"32px"}
                  height={"32px"}
                  className="page-header-logo"
                />
                Menu du restaurant
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen></IonContent>
        </IonPage>
        <style>
          {`

          `}
        </style>
      </>
    );
  }
}

export default RestaurantMenu;
