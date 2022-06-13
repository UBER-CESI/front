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

interface AccountProps {
  state: any;
  dispatch: any;
}

class Account extends React.Component<AccountProps> {
  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                Mon compte
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

export default Account;
