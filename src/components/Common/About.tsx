import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface AboutProps {
  state: any;
  dispatch: any;
}

class About extends React.Component<AboutProps> {
  closeModal = () => {
    let accountModals = {
      ...this.props.state.accountModals,
      about: false,
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
          isOpen={this.props.state.accountModals.about}
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
              À propos
            </IonTitle>
          </IonToolbar>
          <IonContent>
            <IonCard>
              <IonCardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                pulvinar ante vitae dolor interdum suscipit. Pellentesque
                consequat nunc non laoreet cursus. Cras consectetur, libero a
                pellentesque elementum, felis mauris rhoncus dui, quis sagittis
                urna tortor quis enim. Donec at porttitor quam. Proin mi lacus,
                blandit blandit condimentum vel, consequat ac justo. Nulla vitae
                nulla sit amet sem placerat vestibulum vel et odio. Suspendisse
                nec gravida nibh. Donec nec enim ut mauris molestie interdum.
                Sed posuere turpis vel tellus finibus varius. Duis mollis
                dapibus massa, non fringilla sem sodales eget. Suspendisse
                feugiat non tortor a suscipit. Duis pretium ac eros at gravida.
                Maecenas maximus sem vel risus elementum, id pretium leo
                pharetra. In euismod sem ligula, sit amet aliquet justo suscipit
                consectetur. Pellentesque nec mattis orci. Mauris at dui luctus,
                luctus leo eget, congue nisl. Ut tincidunt pulvinar libero vel
                fermentum. Sed viverra id nunc sit amet cursus. Donec bibendum
                eget nunc ac tristique. Nullam a magna eget nunc consequat
                luctus in vel lacus. Donec imperdiet risus in molestie
                convallis. Sed et elit dui. Morbi suscipit mi a mauris
                consequat, quis fermentum odio malesuada. Proin posuere dui sit
                amet dolor eleifend tincidunt. Integer tellus risus, eleifend
                non sodales vel, facilisis a justo. Fusce a vehicula nibh. Donec
                vehicula lectus nibh, id malesuada dui feugiat interdum. Aliquam
                viverra scelerisque tortor, at hendrerit urna venenatis sit
                amet. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Suspendisse quis massa
                lobortis metus eleifend luctus facilisis quis tortor.
              </IonCardContent>
            </IonCard>
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

export default About;
