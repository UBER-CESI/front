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
import { getOrderList, updateOrder } from "../../services/orders";

interface DelivererAvailableOrdersProps {
  state: any;
  dispatch: any;
}

interface IState {
  availableOrders: Array<Order>;
  showToast: boolean;
  toastError: boolean;
}

class DelivererAvailableOrders extends React.Component<
  DelivererAvailableOrdersProps,
  IState
> {
  constructor(props: DelivererAvailableOrdersProps) {
    super(props);
    this.state = {
      availableOrders: [],
      showToast: false,
      toastError: false,
    };
  }

  componentDidMount = () => {
    this.getOrders();
  };

  getOrders = (event?: CustomEvent<RefresherEventDetail>) => {
    getOrderList()
      .then((ordersData: any) => {
        let orders = ordersData.data;
        let availableOrders = orders.filter(
          (order: Order) => order.status === "prepared" && !order.delivererId
        );
        this.setState({
          availableOrders: availableOrders,
        });
      })
      .then(() => {
        if (event) {
          event.detail.complete();
        }
      });
  };

  orderStatusChange = (orderIndex: number) => {
    let orders = JSON.parse(JSON.stringify(this.state.availableOrders));
    let order = orders[orderIndex];
    order.status = "delivering";
    delete orders[orderIndex];
    updateOrder(order._id, order)
      .then((orderData: any) => {
        if (orderData.status === 200) {
          this.setState({
            availableOrders: orders,
            showToast: true,
            toastError: false,
          });
        } else {
          this.setState({
            showToast: true,
            toastError: true,
          });
        }
      })
      .then(() => {
        this.getOrders();
      });
  };

  restaurantName = (id: string) => {
    let { restaurants } = this.props.state;
    let restaurant: any;
    restaurants.forEach((r: any) => {
      if (r._id === +id) {
        restaurant = r;
      }
    });
    return restaurant.name;
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
                <h2>Commandes à livrer</h2>
              </IonListHeader>
              <IonAccordionGroup>
                {this.state.availableOrders?.map(
                  (order: any, orderIndex: number) => {
                    return (
                      <IonAccordion value={order.status} key={orderIndex}>
                        <IonLabel>
                          <h2>{this.restaurantName(order.restaurantId)}</h2>
                          <p>{order.address}</p>
                          <p>{order.totalPrice}</p>
                          <IonButton
                            slot="end"
                            size="small"
                            onClick={() => {
                              this.orderStatusChange(orderIndex);
                            }}
                          >
                            Commande à récupérer
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
              message={
                this.state.toastError
                  ? "Erreur, veuillez recharger la page et réessayer"
                  : "Statut de la commande modifié"
              }
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

export default DelivererAvailableOrders;
