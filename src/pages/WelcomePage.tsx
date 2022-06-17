import React from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";

import LoginModal from "./User/LogIn";
import RegisterModal from "./User/Register";

interface WelcomePageProps {
  state: any;
  dispatch: any;
}

class WelcomePage extends React.Component<WelcomePageProps> {
  render() {
    return (
      <>
        <IonPage>
          <IonContent fullscreen>
            <LoginModal
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
            <RegisterModal
              state={this.props.state}
              dispatch={this.props.dispatch}
            />
            <div className="login-register-container">
              <IonButton
                onClick={() => {
                  this.props.dispatch({ type: "CHANGE_LOGIN_MODAL" });
                }}
                className="register-login-button btn-left"
              >
                Se connecter
              </IonButton>
              <IonButton
                onClick={() => {
                  this.props.dispatch({ type: "CHANGE_REGISTER_MODAL" });
                }}
                className="register-login-button btn-right"
              >
                S'inscrire
              </IonButton>
            </div>
            <div className="welcome-content">
              <h1>Bienvenue sur CESI Eats</h1>
              <p>
                Votre application de commande en ligne pour toutes les faims.
              </p>
            </div>
          </IonContent>
        </IonPage>
        <style>
          {`
            .login-register-container {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              width: 100%;
            }
            .register-login-button {
              width: 120px;
            }
            .btn-left {
              margin-left: 30px;
            }
            .btn-right {
              margin-right: 30px;
              align: right;
            }
          `}
        </style>
      </>
    );
  }
}

export default WelcomePage;
