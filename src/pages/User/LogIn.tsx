import React from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

interface LogInModalProps {
  state: any;
  dispatch: any;
}

interface IState {
  email: string;
  password: string;
  toast: boolean;
  toastIsSuccess: boolean;
}

class LogInModal extends React.Component<LogInModalProps, IState> {
  constructor(props: LogInModalProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toast: false,
      toastIsSuccess: false,
    };
  }

  checkForm = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.state.email.match(validRegex) && this.state.password.length > 9) {
      this.setState({ toast: true, toastIsSuccess: true });
      setTimeout(() => {
        this.closeModal();
        this.props.dispatch({ type: "CHANGE_USER_AUTH" });
      }, 1000);
    } else {
      this.setState({ toast: true, toastIsSuccess: false });
    }
  };

  closeModal = () => {
    this.props.dispatch({
      type: "CHANGE_LOGIN_MODAL",
    });
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <>
        <IonModal className="login-modal" isOpen={this.props.state.loginModal}>
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
              Connexion
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
                  ? "Connexion réussie"
                  : "Email ou mot de passe incorrect"
              }
              color={this.state.toastIsSuccess ? "success" : "danger"}
              duration={2000}
            />
            <IonLabel>Email</IonLabel>
            <IonInput
              placeholder="Email"
              type="email"
              value={this.state.email}
              onIonChange={(e) => {
                this.setState({ email: e.detail.value! });
              }}
            />
            <IonLabel>Mot de passe</IonLabel>
            <IonInput
              type="password"
              placeholder="Mot de passe"
              value={this.state.password}
              onIonChange={(e) => {
                this.setState({ password: e.detail.value! });
              }}
            />
            <IonButton
              onClick={() => {
                this.checkForm();
              }}
              className="register-login-confirmation"
            >
              Connexion
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

export default LogInModal;
