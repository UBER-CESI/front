import React from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { register } from "../services/loginRegister";
import { login } from "../services/index";
import Cookies from "universal-cookie";
import { makeCalls } from "../App";

interface RegisterModalProps {
  state: any;
  dispatch: any;
}

interface IState {
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  typeUser: "customer" | "deliverer";
  email: string;
  password: string;
  passwordConfirmation: string;
  sponsorCode: string;
  toast: boolean;
  toastIsSuccess: boolean;
}

class RegisterModal extends React.Component<RegisterModalProps, IState> {
  constructor(props: RegisterModalProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      nickname: "",
      phoneNumber: "",
      typeUser: "customer",
      email: "",
      password: "",
      passwordConfirmation: "",
      sponsorCode: "",
      toast: false,
      toastIsSuccess: false,
    };
  }

  checkForm = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      this.state.email.match(validRegex) &&
      this.state.password.length > 5 &&
      this.state.password === this.state.passwordConfirmation &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      (this.state.sponsorCode.length === 0 ||
        this.state.sponsorCode.slice(0, 10) === "CESI-EATS-")
    ) {
      let user: any = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.email,
        pwd: this.state.password,
        nickname: this.state.nickname,
        phoneNumber: this.state.phoneNumber,
        typeUser: this.state.typeUser,
      };
      register(user).then((res) => {
        let loginUser = {
          email: this.state.email,
          password: this.state.password,
        };
        login(loginUser)
          .then((res) => {
            const cookies = new Cookies();
            cookies.set("userData", res.data, { path: "/" });
            this.setState({ toast: true, toastIsSuccess: true });
            this.props.dispatch({
              type: "CHANGE_USER_INFO",
              payload: res.data,
            });
            this.props.dispatch({
              type: "CHANGE_TYPE_USER",
              payload: res.data.typeUser,
            });
            makeCalls(res.data, this.props.state, this.props.dispatch);
            this.context.navigate("/");
            if (this.state.sponsorCode.length > 0)
              this.props.dispatch({ type: "SET_REGISTER_SPONSOR" });
            setTimeout(() => {
              this.closeModal();
              this.props.dispatch({ type: "CHANGE_USER_AUTH", payload: true });
            }, 1000);
          })
          .catch((err) => {
            this.setState({ toast: true, toastIsSuccess: false });
          });
      });
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
              type="text"
              value={this.state.firstName}
              onIonChange={(e) => {
                this.setState({ firstName: e.detail.value! });
              }}
            />
            <IonLabel>Nom de famille</IonLabel>
            <IonInput
              placeholder="Nom de famille"
              type="text"
              value={this.state.lastName}
              onIonChange={(e) => {
                this.setState({ lastName: e.detail.value! });
              }}
            />
            <IonLabel>Pseudo</IonLabel>
            <IonInput
              placeholder="Pseudo"
              type="text"
              value={this.state.nickname}
              onIonChange={(e) => {
                this.setState({ nickname: e.detail.value! });
              }}
            />
            <IonLabel>Téléphone</IonLabel>
            <IonInput
              placeholder="N° de téléphone"
              value={this.state.phoneNumber}
              type="tel"
              onIonChange={(e) => {
                this.setState({ phoneNumber: e.detail.value! });
              }}
            />
            <IonLabel>Type d'utilisateur</IonLabel>
            <IonSelect
              value={this.state.typeUser}
              onIonChange={(e) => {
                this.setState({ typeUser: e.detail.value! });
              }}
            >
              <IonSelectOption value="customer">Client</IonSelectOption>
              <IonSelectOption value="deliverer">Livreur</IonSelectOption>
            </IonSelect>
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
            <IonLabel>Code de parrainage</IonLabel>
            <IonInput
              placeholder="Code de parrainage"
              type="text"
              value={this.state.sponsorCode}
              onIonChange={(e) => {
                this.setState({ sponsorCode: e.detail.value! });
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
