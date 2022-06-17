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

interface RegisterModalProps {
  state: any;
  dispatch: any;
}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  toast: boolean;
  toastIsSuccess: boolean;
}

class RegisterModal extends React.Component<RegisterModalProps, IState> {
  constructor(props: RegisterModalProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      toast: false,
      toastIsSuccess: false,
    };
  }

  checkForm = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      this.state.email.match(validRegex) &&
      this.state.password.length > 9 &&
      this.state.password === this.state.passwordConfirmation &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0
    ) {
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
      type: "CHANGE_REGISTER_MODAL",
    });
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <>
        <IonModal
          className="register-modal"
          isOpen={this.props.state.registerModal}
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
              Inscription
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
                  ? "Incrption réussie"
                  : "Veuillez remplir tous les champs et renseigner un email et un mot de passe valides"
              }
              color={this.state.toastIsSuccess ? "success" : "danger"}
              duration={2000}
            />
            <IonLabel>Prénom</IonLabel>
            <IonInput
              placeholder="Prénom"
              value={this.state.firstName}
              onIonChange={(e) => {
                this.setState({ firstName: e.detail.value! });
              }}
            />
            <IonLabel>Nom de famille</IonLabel>
            <IonInput
              placeholder="Nom de famille"
              value={this.state.lastName}
              onIonChange={(e) => {
                this.setState({ lastName: e.detail.value! });
              }}
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
            <IonLabel>Confirmation du mot de passe</IonLabel>
            <IonInput
              type="password"
              placeholder="Confirmation du mot de passe"
              value={this.state.passwordConfirmation}
              onIonChange={(e) => {
                this.setState({ passwordConfirmation: e.detail.value! });
              }}
            />
            <IonButton
              onClick={() => {
                this.checkForm();
              }}
              className="register-login-confirmation"
            >
              Inscrption
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

export default RegisterModal;
