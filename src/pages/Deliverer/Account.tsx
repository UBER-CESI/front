import Cookies from "js-cookie";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import React from "react";
import SettingsList from "../../components/Deliverer/Account/SettingsList";
import { logout } from "../../services/index";

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
          <IonContent fullscreen>
            <IonText className="account-username ion-text-center">
              <IonIcon
                icon={personCircleOutline}
                className="user-avatar-icon"
              />
              <h2 className="username-fullname">
                {this.props.state.userInfo.nickname}
              </h2>
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

export default DelivererAccount;
