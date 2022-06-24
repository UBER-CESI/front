import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { checkmarkDoneOutline } from "ionicons/icons";
import { Clipboard } from "@capacitor/clipboard";

interface SponsorProps {
  state: any;
  dispatch: any;
}

interface IState {
  sponsorCode: string;
  toast: boolean;
}

class Sponsor extends React.Component<SponsorProps, IState> {
  constructor(props: SponsorProps) {
    super(props);
    this.state = {
      sponsorCode: "",
      toast: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      sponsorCode: "CESI-EATS-" + Math.round(Math.random() * 1000),
    });
  };

  closeModal = () => {
    let accountModals = {
      ...this.props.state.accountModals,
      promotions: false,
    };
    this.props.dispatch({
      type: "SET_ACCOUNT_MODALS",
      payload: accountModals,
    });
  };

  copyToClipboard = async () => {
    await Clipboard.write({
      string: this.state.sponsorCode,
    })
      .then(() => {
        this.setState({ toast: true });
      })
      .catch(() => {
        navigator.clipboard.writeText(this.state.sponsorCode).then(() => {
          this.setState({ toast: true });
        });
      });
  };

  render() {
    return (
      <>
        <IonModal
          className="order-list-modal"
          isOpen={this.props.state.accountModals.promotions}
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
              Parrainage
            </IonTitle>
          </IonToolbar>
          <IonContent>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Parrainage</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Vous pouvez parrainer votre ami pour le permettre d'obtenir
                  10% sur sa première commande !
                </p>
                <br />
                <h3>
                  <b>Conditions</b>
                </h3>
                <ul>
                  <li>Vous devez être un utilisateur inscrit sur le site.</li>
                  <li>
                    Votre ami doit utiliser ce code lors de son incription sur
                    l'application CESI Eats.
                  </li>
                </ul>
              </IonCardContent>
            </IonCard>
            <div className="ion-text-center ion-padding-top">
              <IonButton
                onClick={() => {
                  this.copyToClipboard();
                }}
                size="default"
                className="ion-text-center"
              >
                Code : {this.state.sponsorCode}
              </IonButton>
              <IonToast
                isOpen={this.state.toast}
                onDidDismiss={() => {
                  this.setState({ toast: false });
                }}
                message={"Code copié dans le presse-papier"}
                icon={checkmarkDoneOutline}
                color={"success"}
                duration={2000}
              />
            </div>
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

export default Sponsor;
