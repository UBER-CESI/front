import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonToast,
  IonList,
  IonListHeader,
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  IonItem,
  IonButton,
} from "@ionic/react";
import { closeOutline, checkmarkDoneOutline } from "ionicons/icons";
import React from "react";
import { Item } from "../../models/item";
import { Value } from "../../models/itemOptionValue";
import { Order } from "../../models/order";
import { getOrdersByRestaurantId, updateOrder } from "../../services/orders";

interface RestaurantOrdersProps {
  state: any;
  dispatch: any;
}

interface IState {
  acceptedOrders: Array<Order>;
  pendingOrders: Array<Order>;
  showToast: boolean;
  toastMessage: string;
  toastError: boolean;
}

class RestaurantOrders extends React.Component<RestaurantOrdersProps, IState> {
  constructor(props: RestaurantOrdersProps) {
    super(props);
    this.state = {
      acceptedOrders: [],
      pendingOrders: [],
      showToast: false,
      toastMessage: "",
      toastError: false,
    };
  }

  componentDidMount = () => {
    this.getOrders();
  };

  getOrders = (event?: CustomEvent<RefresherEventDetail>) => {
    getOrdersByRestaurantId(this.props.state.restaurantInfo._id)
      .then((ordersData: any) => {
        let orders = ordersData.data;
        let acceptedOrders = orders.filter(
          (order: Order) => order.status === "preparing"
        );
        let pendingOrders = orders.filter(
          (order: Order) => order.status === "paid"
        );
        this.setState({
          acceptedOrders: acceptedOrders,
          pendingOrders: pendingOrders,
        });
      })
      .then(() => {
        if (event) {
          event.detail.complete();
        }
      });
  };

  orderStatusChange = (
    orderIndex: number,
    status: "preparing" | "prepared"
  ) => {
    let orders = JSON.parse(
      JSON.stringify(
        status === "prepared"
          ? this.state.acceptedOrders
          : this.state.pendingOrders
      )
    );
    let order = orders[orderIndex];
    order.status = status;
    delete orders[orderIndex];
    updateOrder(order._id, order)
      .then((orderData: any) => {
        if (orderData.status === 200) {
          status === "prepared"
            ? this.setState({ acceptedOrders: orders })
            : this.setState({ pendingOrders: orders });
          this.setState({
            showToast: true,
            toastError: false,
            toastMessage:
              status === "preparing"
                ? 'Commande passée à "En préparation"'
                : 'Commande passée à "Préparée"',
          });
        } else {
          this.setState({
            showToast: true,
            toastError: true,
            toastMessage:
              "Une erreur est survenue, veuillez réessayer ou rafraîchir la page",
          });
        }
      })
      .then(() => {
        this.getOrders();
      });
  };

  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <img
                  src="/assets/icon/favicon.png"
                  alt="Logo"
                  width={"32px"}
                  height={"32px"}
                  className="page-header-logo"
                />
                Commandes
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonRefresher slot="fixed" onIonRefresh={this.getOrders}>
              <IonRefresherContent className="refresh-content" />
            </IonRefresher>
            <IonList>
              <IonListHeader>
                <h2>Commandes à préparer</h2>
              </IonListHeader>
              <IonAccordionGroup>
                {this.state.acceptedOrders?.map(
                  (order: any, orderIndex: number) => {
                    return (
                      <IonAccordion value={order.status} key={orderIndex}>
                        <IonLabel>
                          <h2>{this.props.state.restaurantInfo.name}</h2>
                          <p>{order.totalPrice}</p>
                          <IonButton
                            slot="end"
                            size="small"
                            onClick={() => {
                              this.orderStatusChange(orderIndex, "prepared");
                            }}
                          >
                            Commande préparée
                          </IonButton>
                        </IonLabel>
                        <IonList>
                          {order.menus?.map((menu: any, menuIndex: number) => {
                            return (
                              <>
                                <IonListHeader key={menuIndex}>
                                  <IonItem>
                                    <IonLabel>
                                      <h2>{menu.name}</h2>
                                    </IonLabel>
                                  </IonItem>
                                </IonListHeader>
                                {menu.items?.map(
                                  (item: Item, itemIndex: number) => {
                                    return (
                                      <IonItem key={itemIndex}>
                                        <IonLabel>
                                          <h2>{item.name}</h2>
                                          <p>{item.description}</p>
                                        </IonLabel>
                                        {item.options?.map(
                                          (
                                            option: any,
                                            optionIndex: number
                                          ) => {
                                            return (
                                              <IonItem key={optionIndex}>
                                                <IonLabel>
                                                  <h2>{option.name}</h2>
                                                  <p>
                                                    {option.values.map(
                                                      (
                                                        value: Value,
                                                        valueIndex: number
                                                      ) => {
                                                        return (
                                                          <span
                                                            key={valueIndex}
                                                          >
                                                            {value.value}
                                                            {valueIndex <
                                                            option.values
                                                              .length -
                                                              1
                                                              ? ", "
                                                              : ""}
                                                          </span>
                                                        );
                                                      }
                                                    )}
                                                  </p>
                                                </IonLabel>
                                              </IonItem>
                                            );
                                          }
                                        )}
                                      </IonItem>
                                    );
                                  }
                                )}
                              </>
                            );
                          })}
                        </IonList>
                      </IonAccordion>
                    );
                  }
                )}
              </IonAccordionGroup>
            </IonList>
            <IonList>
              <IonListHeader>
                <h2>Commandes à accepter</h2>
              </IonListHeader>
              <IonAccordionGroup>
                {this.state.pendingOrders?.map(
                  (order: any, orderIndex: number) => {
                    return (
                      <IonAccordion value={order.status} key={orderIndex}>
                        <IonLabel>
                          <h2>{this.props.state.restaurantInfo.name}</h2>
                          <p>{order.totalPrice}</p>
                          <IonButton
                            slot="end"
                            size="small"
                            onClick={() => {
                              this.orderStatusChange(orderIndex, "preparing");
                            }}
                          >
                            Accepter la commande
                          </IonButton>
                        </IonLabel>
                        <IonList>
                          {order.menus?.map((menu: any, menuIndex: number) => {
                            return (
                              <>
                                <IonListHeader key={menuIndex}>
                                  <IonItem>
                                    <IonLabel>
                                      <h2>{menu.name}</h2>
                                    </IonLabel>
                                  </IonItem>
                                </IonListHeader>
                                {menu.items?.map(
                                  (item: Item, itemIndex: number) => {
                                    return (
                                      <IonItem key={itemIndex}>
                                        <IonLabel>
                                          <h2>{item.name}</h2>
                                          <p>{item.description}</p>
                                        </IonLabel>
                                        {item.options?.map(
                                          (
                                            option: any,
                                            optionIndex: number
                                          ) => {
                                            return (
                                              <IonItem key={optionIndex}>
                                                <IonLabel>
                                                  <h2>{option.name}</h2>
                                                  <p>
                                                    {option.values.map(
                                                      (
                                                        value: Value,
                                                        valueIndex: number
                                                      ) => {
                                                        return (
                                                          <span
                                                            key={valueIndex}
                                                          >
                                                            {value.value}
                                                            {valueIndex <
                                                            option.values
                                                              .length -
                                                              1
                                                              ? ", "
                                                              : ""}
                                                          </span>
                                                        );
                                                      }
                                                    )}
                                                  </p>
                                                </IonLabel>
                                              </IonItem>
                                            );
                                          }
                                        )}
                                      </IonItem>
                                    );
                                  }
                                )}
                              </>
                            );
                          })}
                        </IonList>
                      </IonAccordion>
                    );
                  }
                )}
              </IonAccordionGroup>
            </IonList>
            <IonToast
              isOpen={this.state.showToast}
              onDidDismiss={() => this.setState({ showToast: false })}
              message={this.state.toastMessage}
              duration={2000}
              color={this.state.toastError ? "danger" : "success"}
              icon={this.state.toastError ? closeOutline : checkmarkDoneOutline}
            />
          </IonContent>
        </IonPage>
        <style>
          {`

          `}
        </style>
      </>
    );
  }
}

export default RestaurantOrders;
