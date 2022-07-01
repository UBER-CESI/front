import React from "react";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Order } from "../../../models/order";
import { getOrdersByDelivererId } from "../../../services/orders";

interface OrdersProps {
  state: any;
  dispatch: any;
}

interface IState {
  orders: Array<Order>;
}

class Orders extends React.Component<OrdersProps, IState> {
  constructor(props: OrdersProps) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount = () => {
    this.restrieveOrders();
  };

  restrieveOrders = () => {
    getOrdersByDelivererId(this.props.state.delivererInfo._id).then(
      (ordersData: any) => {
        if (ordersData) {
          let orders = JSON.parse(JSON.stringify(ordersData.data));
          orders.forEach((order: any) => {
            let orderMenus: any = [];
            order.menus.forEach((menu: any) => {
              orderMenus.push(JSON.parse(menu)[0]);
            });
            order.menus = orderMenus;
          });
          this.setState({
            orders: orders,
          });
        }
      }
    );
  };

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
      if (r._id === id) {
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
    console.log(this.state);
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
            {this.state.orders?.map((order: any, orderIndex: number) => {
              return (
                <div key={orderIndex}>
                  <IonLabel>
                    <h2>{this.restaurantName(order.restaurantId)}</h2>
                    <p>{this.orderStatus(order.status)}</p>
                  </IonLabel>

                  {order.menus?.map((menu: any, menuIndex: number) => {
                    return (
                      <IonList slot="content" key={menuIndex}>
                        <IonListHeader>
                          <IonItem slot="header">
                            <IonAvatar slot="start">
                              <img
                                src="/images/restaurant_avatar.png"
                                alt="restaurant avatar"
                              />
                            </IonAvatar>
                          </IonItem>
                        </IonListHeader>
                        <IonItem>
                          <IonLabel>
                            <h2>Nom : {menu.name}</h2>
                            <p>Description : {menu.description}</p>
                            <p>Prix total : {menu.totalPrice}€</p>
                          </IonLabel>
                        </IonItem>
                      </IonList>
                    );
                  })}
                </div>
              );
            })}
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
