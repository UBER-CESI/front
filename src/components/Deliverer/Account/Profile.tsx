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
import { updateDeliverer } from "../../../services/deliverer";

interface ProfileProps {
  state: any;
  dispatch: any;
}

interface IState {
  email: any;
  nickname: any;
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
      phoneNumber: "",
      toast: false,
      toastIsSuccess: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      email: this.props.state.delivererInfo.email,
      nickname: this.props.state.delivererInfo.nickname,
      phoneNumber: this.props.state.delivererInfo.phoneNumber,
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
      email: this.props.state.delivererInfo.email,
      nickname: this.props.state.delivererInfo.nickname,
      phoneNumber: this.props.state.delivererInfo.phoneNumber,
    });
  };

  verifyChanges = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      this.state.email.match(validRegex) &&
      this.state.nickname.length > 0 &&
      this.state.phoneNumber.length === 10
    ) {
      let updatedDeliverer = {
        ...this.props.state.delivererInfo,
        email: this.state.email,
        nickname: this.state.nickname,
        phoneNumber: this.state.phoneNumber,
      };
      updateDeliverer(this.props.state.delivererInfo._id, updatedDeliverer)
        .then(() => {
          this.props.dispatch({
            type: "CHANGE_DELIVERER_INFO",
            payload: {
              email: this.state.email,
              nickname: this.state.nickname,
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
        })
        .catch((err) => {
          this.setState({
            toast: true,
            toastIsSuccess: false,
          });
        });
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
                <IonLabel position="stacked">Pseudo</IonLabel>
                <IonInput
                  value={this.state.nickname}
                  disabled={false}
                  type="text"
                  onIonChange={(e) => {
                    this.setState({ nickname: e.detail.value });
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
