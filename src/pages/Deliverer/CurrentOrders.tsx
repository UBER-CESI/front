import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";

interface DelivererCurrentOrdersProps {
  state: any;
  dispatch: any;
}

class DelivererCurrentOrders extends React.Component<DelivererCurrentOrdersProps> {
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
                Commandes en cours
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

export default DelivererCurrentOrders;
