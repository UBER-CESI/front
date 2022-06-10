import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./HomePage.css";

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
              <IonTitle>Accueil</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Accueil</IonTitle>
              </IonToolbar>
            </IonHeader>
            <ExploreContainer name="Tab 1 page" />
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
