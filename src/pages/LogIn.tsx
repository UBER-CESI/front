import React from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonModal,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { Clipboard } from "@capacitor/clipboard";

interface LogInModalProps {
  state: any;
  dispatch: any;
}

interface IState {
  email: string;
  password: string;
  toast: boolean;
  toastIsSuccess: boolean;
  alert: boolean;
}

class LogInModal extends React.Component<LogInModalProps, IState> {
  constructor(props: LogInModalProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toast: false,
      toastIsSuccess: false,
      alert: false,
    };
  }

  checkForm = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.state.email.match(validRegex) && this.state.password.length > 9) {
      this.setState({ toast: true, toastIsSuccess: true });
      setTimeout(() => {
        this.closeModal();
        this.props.dispatch({ type: "CHANGE_USER_AUTH", payload: true });
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

  forgottenEmail = async () => {
    await Clipboard.write({
      string: "admin@cesi-eats.fr",
    })
      .then(() => {
        this.setState({ alert: true });
      })
      .catch(() => {
        navigator.clipboard.writeText("admin@cesi-eats.fr").then(() => {
          this.setState({ alert: true });
        });
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
            <br />
            <IonText
              onClick={() => this.forgottenEmail()}
              color={"primary"}
              className="forgotten-password"
            >
              Mot de passe oublié ?
            </IonText>
            <IonAlert
              isOpen={this.state.alert}
              onDidDismiss={() => {
                this.setState({ alert: false });
              }}
              header="Mot de passe oublié"
              message="Merci de contacter l'administrateur du site, son mail vient d'être copié dans votre presse-papier."
              buttons={[
                {
                  text: "OK",
                  handler: () => {
                    this.setState({ alert: false });
                  },
                },
              ]}
            />
            <br />
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
