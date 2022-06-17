import React from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface PaymentsInformationProps {
  state: any;
  dispatch: any;
}

class PaymentsInformation extends React.Component<PaymentsInformationProps> {
  closeModal = () => {
    let accountModals = {
      ...this.props.state.accountModals,
      paymentsInformation: false,
    };
    this.props.dispatch({
      type: "SET_ACCOUNT_MODALS",
      payload: accountModals,
    });
  };
  render() {
    return (
      <>
        <IonModal
          className="order-list-modal"
          isOpen={this.props.state.accountModals.paymentsInformation}
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
              Moyens de paiement
            </IonTitle>
          </IonToolbar>
          <IonContent></IonContent>
        </IonModal>
        <style>
          {`

          `}
        </style>
      </>
    );
  }
}

export default PaymentsInformation;
