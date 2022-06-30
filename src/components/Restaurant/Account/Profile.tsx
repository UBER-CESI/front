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
import { updateRestaurant } from "../../../services/restaurant";

interface ProfileProps {
  state: any;
  dispatch: any;
}

interface IState {
  email: any;
  name: any;
  address: any;
  phoneNumber: any;
  toast: boolean;
  toastIsSuccess: boolean;
}

class Profile extends React.Component<ProfileProps, IState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      email: "",
      name: "",
      address: "",
      phoneNumber: "",
      toast: false,
      toastIsSuccess: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      email: this.props.state.restaurantInfo.email,
      name: this.props.state.restaurantInfo.name,
      phoneNumber: this.props.state.restaurantInfo.phoneNumber,
    });
    this.props.state.restaurantInfo.address
      ? this.setState({ address: this.props.state.restaurantInfo.address })
      : this.setState({ address: "" });
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
      email: this.props.state.restaurantInfo.email,
      name: this.props.state.restaurantInfo.name,
      phoneNumber: this.props.state.restaurantInfo.phoneNumber,
    });
    this.props.state.restaurantInfo.address
      ? this.setState({ address: this.props.state.restaurantInfo.address })
      : this.setState({ address: "" });
  };

  verifyChanges = () => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      this.state.email.match(validRegex) &&
      this.state.name.length > 0 &&
      this.state.phoneNumber.length === 10 &&
      this.state.address.length > 0
    ) {
      let updatedRestaurant = {
        ...this.props.state.restaurantInfo,
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
      };
      updateRestaurant(this.props.state.restaurantInfo._id, updatedRestaurant)
        .then(() => {
          this.props.dispatch({
            type: "CHANGE_CUSTOMER_INFO",
            payload: {
              email: this.state.email,
              name: this.state.name,
              address: this.state.address,
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
                <IonLabel>Modifier mon restaurant</IonLabel>
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
                <IonLabel position="stacked">Nom</IonLabel>
                <IonInput
                  value={this.state.name}
                  disabled={false}
                  type="text"
                  onIonChange={(e) => {
                    this.setState({ name: e.detail.value });
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
              <IonItem>
                <IonLabel position="stacked">Adresse</IonLabel>
                <IonInput
                  value={this.state.address}
                  disabled={false}
                  type="text"
                  onIonChange={(e) => {
                    this.setState({ address: e.detail.value });
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
