import React from "react";
import Cookies from "js-cookie";
import {
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SettingsList from "../../components/Customer/Account/SettingsList";
import { personCircleOutline } from "ionicons/icons";
import { logout } from "../../services/index";

interface CustomerAccountProps {
  state: any;
  dispatch: any;
}

class CustomerAccount extends React.Component<CustomerAccountProps> {
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
          <IonContent fullscreen>
            <IonText className="account-username ion-text-center">
              <IonIcon
                icon={personCircleOutline}
                className="user-avatar-icon"
              />
              <h2 className="username-fullname">
                {this.props.state.customerInfo.firstname}{" "}
                {this.props.state.customerInfo.lastname}
              </h2>
              <p className="username-nickname">
                @{this.props.state.customerInfo.nickname}
              </p>
            </IonText>
            <SettingsList
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
            <div className="ion-text-center">
              <IonChip
                color="danger"
                className="order-chip"
                outline
                onClick={() => {
                  logout();
                  Cookies.remove("userData");
                  this.props.dispatch({
                    type: "CHANGE_USER_AUTH",
                    payload: false,
                  });
                }}
              >
                <IonText>
                  <h5>Déconnexion</h5>
                </IonText>
              </IonChip>
            </div>
          </IonContent>
        </IonPage>
        <style>
          {`
            .username-fullname {
              font-size: 2rem;
              font-weight: bold;
              padding-left: 10px;
            }
            .username-nickname {
              font-size: 1rem;
              font-weight: bold;
              padding-left: 10px;
            }
            .user-avatar-icon {
              width: 100px;
              height: 100px;
              margin-top: 20px;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
          `}
        </style>
      </>
    );
  }
}

export default CustomerAccount;
