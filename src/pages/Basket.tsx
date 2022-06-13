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

interface BasketProps {
  state: any;
  dispatch: any;
}

class Basket extends React.Component<BasketProps> {
  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                Panier
                <IonIcon icon={fastFoodOutline} className="page-header-logo" />
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

export default Basket;
