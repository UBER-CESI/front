import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonContent,
  IonText,
  NavContext,
} from "@ionic/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { createOrder } from "../../../services/orders";

interface OrderProps {
  state: any;
  dispatch: any;
}

class Order extends React.Component<OrderProps> {
  static contextType = NavContext;
  calculateTotal = () => {
    const { basket } = this.props.state;
    let total = 2;
    total += +this.props.state.tip;
    if (basket.menus) {
      basket.menus.forEach((menu: any) => {
        total += menu.price * menu.quantity;
      });
    }
    return Math.round(total * 100) / 100;
  };

  confirmOrder = () => {
    const { dispatch } = this.props;

    let order = {
      customerId: this.props.state.customerInfo._id,
      restaurantId: this.props.state.basket.restaurant_id,
      address: this.props.state.address,
      totalPrice: this.calculateTotal(),
      tipAmount: this.props.state.tip,
      status: "paid",
      menus: JSON.stringify(this.props.state.basket.menus),
    };

    createOrder(order).then((res: any) => {
      this.context.navigate("/account");
      let newOrdersList = JSON.parse(JSON.stringify(this.props.state.orders));
      newOrdersList.push(order);

      dispatch({
        type: "SET_ORDERS",
        payload: newOrdersList,
      });

      setTimeout(() => {
        dispatch({
          type: "SET_BASKET",
          payload: {},
        });
      }, 5000);
    });
  };

  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <IonBackButton className="page-header-logo" text={"Retour"} />
                Commander
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-text-center">
            <IonText>
              <h2 className="total-payout">Total : {this.calculateTotal()}€</h2>
            </IonText>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: this.calculateTotal().toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data: any, actions: any) => {
                return actions.order.capture().then((details: any) => {
                  this.confirmOrder();
                });
              }}
            />
          </IonContent>
        </IonPage>
        <style>
          {`
            .total-payout {
              margin-top: 30px;
              margin-bottom: 20px;
            }
            .hidden-redirect {
              display: none;
            }
          `}
        </style>
      </>
    );
  }
}

export default Order;
