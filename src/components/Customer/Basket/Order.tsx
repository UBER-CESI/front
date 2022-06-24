import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonContent,
  IonText,
} from "@ionic/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { Link } from "react-router-dom";
import { Option } from "../../../models/itemOption";
import { Value } from "../../../models/itemOptionValue";

interface BasketItem {
  id?: any;
  name: string;
  description: string;
  allergens: Array<string>;
  price: number;
  quantity: number;
  options: Array<Option>;
  restaurantId: any;
}

interface OrderProps {
  state: any;
  dispatch: any;
}

class Order extends React.Component<OrderProps> {
  linkRef: any;
  constructor(props: OrderProps) {
    super(props);
    this.linkRef = React.createRef();
  }

  calculateTotal = () => {
    const { basket } = this.props.state;
    let total = 0;
    if (basket.items) {
      basket.items.forEach((item: BasketItem) => {
        total += item.price * item.quantity;
      });
    }
    return Math.round(total * 100) / 100;
  };

  removeValuesCheck = () => {
    let basket = JSON.parse(JSON.stringify(this.props.state.basket));
    delete basket.restaurant_id;
    delete basket.restaurant_name;
    basket.items.forEach((item: BasketItem) => {
      item.restaurantId = item.restaurantId.toString();
      delete item.id;
      item.options.forEach((option: Option) => {
        option.values.forEach((value: Value) => {
          delete value.checked;
        });
      });
    });
    return basket.items;
  };

  confirmOrder = () => {
    const { dispatch } = this.props;

    let order = {
      customerId: "0",
      restaurantId: "0",
      delivererId: "0",
      address: this.props.state.address,
      totalPrice: this.calculateTotal(),
      tipAmount: 0,
      status: "paid",
      items: this.removeValuesCheck(),
    };

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
    this.linkRef.click();
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
            <Link
              ref={(link) => (this.linkRef = link)}
              to="/account/orders"
              className="hidden-redirect"
            />
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
