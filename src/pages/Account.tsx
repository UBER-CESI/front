import React from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SettingsList from "../components/Account/SettingsList";
import { personCircleOutline } from "ionicons/icons";

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
                {this.props.state.userInfos.firstname}{" "}
                {this.props.state.userInfos.lastname}
              </h2>
              <p className="username-nickname">
                @{this.props.state.userInfos.nickname}
              </p>
            </IonText>
            <SettingsList
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
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

export default Account;
