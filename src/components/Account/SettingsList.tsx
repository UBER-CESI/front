import React from "react";
import { IonItem, IonList, IonText } from "@ionic/react";
import OrderList from "./Orders";
import PaymentsInformation from "./PaymentsInformation";
import Profile from "./Profile";
import Sponsor from "./Sponsor";
import About from "./About";

interface SettingsListProps {
  state: any;
  dispatch: any;
}

class SettingsList extends React.Component<SettingsListProps> {
  openModal = (modalName: string) => {
    let accountModals = {
      ...this.props.state.accountModals,
      [modalName]: true,
    };
    this.props.dispatch({
      type: "SET_ACCOUNT_MODALS",
      payload: accountModals,
    });
  };
  render() {
    return (
      <>
        <IonList className="account-settings-list" inset={true}>
          <IonItem
            onClick={() => {
              this.openModal("orders");
            }}
          >
            <IonText>Mes commandes</IonText>
          </IonItem>
          <IonItem
            onClick={() => {
              this.openModal("paymentsInformation");
            }}
          >
            <IonText>Mes moyens de paiement</IonText>
          </IonItem>
          <IonItem
            onClick={() => {
              this.openModal("profile");
            }}
          >
            <IonText>Modifier mon profil</IonText>
          </IonItem>
          <IonItem
            onClick={() => {
              this.openModal("promotions");
            }}
          >
            <IonText>Promotions / parrainage</IonText>
          </IonItem>
          <IonItem
            onClick={() => {
              this.openModal("about");
            }}
          >
            <IonText>À propos</IonText>
          </IonItem>
        </IonList>
        <OrderList state={this.props.state} dispatch={this.props.dispatch} />
        <PaymentsInformation
          state={this.props.state}
          dispatch={this.props.dispatch}
        />
        <Profile state={this.props.state} dispatch={this.props.dispatch} />
        <Sponsor state={this.props.state} dispatch={this.props.dispatch} />
        <About state={this.props.state} dispatch={this.props.dispatch} />
        <style>
          {`
            
          `}
        </style>
      </>
    );
  }
}

export default SettingsList;
