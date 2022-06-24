import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";

interface DelivererAccountProps {
  state: any;
  dispatch: any;
}

class DelivererAccount extends React.Component<DelivererAccountProps> {
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
                Mon compte
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

export default DelivererAccount;
