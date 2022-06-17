import React from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonAvatar,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Order } from "../../services/orders";
import { Item } from "../../services/restaurant";
import { Option } from "../../services/restaurant";
import { Value } from "../../services/restaurant";

interface OrdersProps {
  state: any;
  dispatch: any;
}

class Orders extends React.Component<OrdersProps> {
  closeModal = () => {
    let accountModals = {
      ...this.props.state.accountModals,
      orders: false,
    };
    this.props.dispatch({
      type: "SET_ACCOUNT_MODALS",
      payload: accountModals,
    });
  };

  restaurantName = (id: string) => {
    let { restaurants } = this.props.state;
    let restaurant: any;
    restaurants.forEach((r: any) => {
      if (r.id === +id) {
        restaurant = r;
      }
    });
    return restaurant.name;
  };

  orderStatus = (status: string) => {
    switch (status) {
      case "paid":
        return "Commande payée";
      case "preparing":
        return "Commande en préparation";
      case "prepared":
        return "Commande préparée";
      case "delivering":
        return "Commande en cours de livraison";
      case "delivered":
        return "Commande livrée";
    }
  };

  render() {
    return (
      <>
        <IonModal
          className="order-list-modal"
          isOpen={this.props.state.accountModals.orders}
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
              Commandes
            </IonTitle>
          </IonToolbar>
          <IonContent>
            <IonAccordionGroup className="orders-list">
              {this.props.state.orders.map((order: Order, i: number) => {
                return (
                  <IonAccordion value={order.status} key={i}>
                    <IonItem slot="header">
                      <>
                        <IonAvatar slot="start">
                          <img
                            src="/images/restaurant_avatar.png"
                            alt="restaurant avatar"
                          />
                        </IonAvatar>
                        <IonLabel>
                          <h2>{this.restaurantName(order.restaurantId)}</h2>
                          <p>21/05/22 - 19h45</p>
                          <p>{this.orderStatus(order.status)}</p>
                        </IonLabel>
                      </>
                    </IonItem>
                    <IonList slot="content">
                      {order.items.map((item: Item, j: number) => {
                        return (
                          <IonItem key={j}>
                            <IonLabel>
                              <h2>{item.name}</h2>
                              <p>{item.description}</p>
                              {item.allergens.length > 0 && (
                                <p>
                                  Allergènes :{" "}
                                  <ul>
                                    {item.allergens.map(
                                      (allergen: string, k: number) => {
                                        return <li key={k}>{allergen}</li>;
                                      }
                                    )}
                                  </ul>
                                </p>
                              )}
                              {item.options.length > 0 && (
                                <p>
                                  Options :{" "}
                                  <ul>
                                    {item.options.map(
                                      (option: Option, l: number) => {
                                        return (
                                          <li key={l}>
                                            {option.name} -{" "}
                                            {option.values.map(
                                              (value: Value) => {
                                                return value.value + " ";
                                              }
                                            )}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </p>
                              )}
                              <p>{item.price}€</p>
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                    </IonList>
                  </IonAccordion>
                );
              })}
            </IonAccordionGroup>
          </IonContent>
        </IonModal>
        <style>
          {`
            .orders-list {
              padding-top: 30px;
            }
          `}
        </style>
      </>
    );
  }
}

export default Orders;
