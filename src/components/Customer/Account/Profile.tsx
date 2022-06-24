import React from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

interface ProfileProps {
  state: any;
  dispatch: any;
}

interface IState {
  email: any;
  nickname: any;
  firstname: any;
  lastname: any;
  phoneNumber: any;
  toast: boolean;
  toastIsSuccess: boolean;
}

class Profile extends React.Component<ProfileProps, IState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      email: "",
      nickname: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      toast: false,
      toastIsSuccess: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      email: this.props.state.userInfos.email,
      nickname: this.props.state.userInfos.nickname,
      firstname: this.props.state.userInfos.firstname,
      lastname: this.props.state.userInfos.lastname,
      phoneNumber: this.props.state.userInfos.phoneNumber,
    });
  };

  closeModal = () => {
    let accountModals = {
      ...this.props.state.accountModals,
      profile: false,
    };
    this.props.dispatch({
      type: "SET_ACCOUNT_MODALS",
      payload: accountModals,
    });
    this.setState({
      email: this.props.state.userInfos.email,
      nickname: this.props.state.userInfos.nickname,
      firstname: this.props.state.userInfos.firstname,
      lastname: this.props.state.userInfos.lastname,
      phoneNumber: this.props.state.userInfos.phoneNumber,
    });
  };

  verifyChanges = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      this.state.email.match(validRegex) &&
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0 &&
      this.state.phoneNumber.length === 10
    ) {
      this.props.dispatch({
        type: "CHANGE_USER_INFOS",
        payload: {
          email: this.state.email,
          nickname: this.state.nickname,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          phoneNumber: this.state.phoneNumber,
        },
      });
      this.setState({
        toast: true,
        toastIsSuccess: true,
      });
      setTimeout(() => {
        let accountModals = {
          ...this.props.state.accountModals,
          profile: false,
        };
        this.props.dispatch({
          type: "SET_ACCOUNT_MODALS",
          payload: accountModals,
        });
      }, 1000);
    } else {
      this.setState({
        toast: true,
        toastIsSuccess: false,
      });
    }
  };

  render() {
    return (
      <>
        <IonModal
          className="order-list-modal"
          isOpen={this.props.state.accountModals.profile}
        >
          <IonToolbar>
            <IonTitle className="page-header">
              <IonButton
                onClick={() => {
                  this.closeModal();
                }}
                size="small"
                className="page-header-close"
              >
                X
              </IonButton>
              Profil
            </IonTitle>
          </IonToolbar>
          <IonContent>
            <IonToast
              isOpen={this.state.toast}
              onDidDismiss={() => {
                this.setState({ toast: false });
              }}
              message={
                this.state.toastIsSuccess
                  ? "Changements enregistrés"
                  : "Erreur lors de la modification"
              }
              color={this.state.toastIsSuccess ? "success" : "danger"}
              duration={2000}
            />
            <IonList lines="full">
              <IonListHeader lines="full">
                <IonLabel>Modifier mon profil</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel position="stacked">Pseudo</IonLabel>
                <IonInput
                  value={this.state.nickname}
                  disabled={false}
                  onIonChange={(e) => {
                    this.setState({ nickname: e.detail.value });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  value={this.state.email}
                  disabled={false}
                  type="email"
                  onIonChange={(e) => {
                    this.setState({ email: e.detail.value });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Prénom</IonLabel>
                <IonInput
                  value={this.state.firstname}
                  disabled={false}
                  type="text"
                  onIonChange={(e) => {
                    this.setState({ firstname: e.detail.value });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Nom</IonLabel>
                <IonInput
                  value={this.state.lastname}
                  disabled={false}
                  type="text"
                  onIonChange={(e) => {
                    this.setState({ lastname: e.detail.value });
                  }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Numéro de téléphone</IonLabel>
                <IonInput
                  value={this.state.phoneNumber}
                  disabled={false}
                  type="tel"
                  onIonChange={(e) => {
                    this.setState({ phoneNumber: e.detail.value });
                  }}
                />
              </IonItem>
            </IonList>
            <IonButton
              onClick={() => {
                this.verifyChanges();
              }}
              expand="block"
              color="primary"
            >
              Sauvegarder
            </IonButton>
          </IonContent>
        </IonModal>
        <style>
          {`

          `}
        </style>
      </>
    );
  }
}

export default Profile;
