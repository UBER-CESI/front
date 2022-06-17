import React from "react";
import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";

interface BasketProps {
  state: any;
  dispatch: any;
}

interface Basket {
  restaurant_id: number;
  restaurant_name: string;
  items: [BasketItem];
}

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  option: Array<string>;
}

class Basket extends React.Component<BasketProps> {
  changeItemQuantity = (item: BasketItem, quantity: number) => {
    const { dispatch } = this.props;
    if (quantity > 0 && quantity <= 10) {
      dispatch({
        type: "SET_BASKET",
        payload: {
          ...this.props.state.basket,
          items: this.props.state.basket.items.map((i: BasketItem) => {
            if (i.id === item.id) {
              return {
                ...i,
                quantity: quantity,
              };
            }
            return i;
          }),
        },
      });
    }
    if (quantity <= 0) {
      dispatch({
        type: "SET_BASKET",
        payload: {
          ...this.props.state.basket,
          items: this.props.state.basket.items.filter((i: BasketItem) => {
            return i.id !== item.id;
          }),
        },
      });
    }
  };

  calculateTotal = () => {
    const { basket } = this.props.state;
    let total = 0;
    basket.items.forEach((item: BasketItem) => {
      total += item.price * item.quantity;
    });
    return Math.round(total * 100) / 100;
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
                Panier
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen className="ion-text-center">
            {this.props.state.basket.items.length ? (
              <>
                <IonList>
                  <IonListHeader>
                    {this.props.state.basket.restaurant_name}
                  </IonListHeader>
                  {this.props.state.basket.items.map((item: BasketItem) => {
                    return (
                      <IonItem key={item.id}>
                        <IonLabel>
                          <h2>{item.name}</h2>
                          {item.option && (
                            <p>
                              Options :{" "}
                              <ul>
                                {item.option?.map((o: string, i: number) => {
                                  return <li key={i}>{o}</li>;
                                })}
                              </ul>
                            </p>
                          )}
                        </IonLabel>
                        <IonNote slot="end" color="primary">
                          {Math.round(item.price * item.quantity * 100) / 100}€
                        </IonNote>
                        <IonNote slot="end">
                          <IonButton
                            color="success"
                            size="small"
                            className="quantity-buttons"
                            onClick={() => {
                              this.changeItemQuantity(item, item.quantity + 1);
                            }}
                          >
                            +
                          </IonButton>
                        </IonNote>
                        <IonNote
                          slot="end"
                          color="primary"
                          className="basket-quantity-input"
                        >
                          <IonInput
                            type="number"
                            value={item.quantity}
                            className="ion-text-center"
                            min="0"
                            max="11"
                            onInput={(e: any) => {
                              this.props.dispatch({
                                type: "SET_BASKET",
                                payload: {
                                  restaurant_id:
                                    this.props.state.basket.restaurant_id,
                                  restaurant_name:
                                    this.props.state.basket.restaurant_name,
                                  items: this.props.state.basket.items.map(
                                    (i: BasketItem) => {
                                      if (i.id === item.id) {
                                        return {
                                          ...i,
                                          quantity: e.target.value,
                                        };
                                      }
                                      return i;
                                    }
                                  ),
                                },
                              });
                            }}
                          />
                        </IonNote>
                        <IonNote slot="end">
                          <IonButton
                            color="danger"
                            size="small"
                            onClick={() => {
                              this.changeItemQuantity(item, item.quantity - 1);
                            }}
                          >
                            -
                          </IonButton>
                        </IonNote>
                      </IonItem>
                    );
                  })}
                </IonList>
                <IonText>
                  <h2>Total : {this.calculateTotal()}€</h2>
                </IonText>
                <IonChip color="primary" className="order-chip" outline>
                  <IonText>
                    <Link to="/order" className="homepage-link">
                      <h5>Commander</h5>
                    </Link>
                  </IonText>
                </IonChip>
              </>
            ) : (
              <>
                <img
                  src="/images/empty-cart.svg"
                  alt="Empty cart"
                  className="empty-cart"
                />
                <IonText>
                  <h2 className="empty-cart-title">Votre panier est vide</h2>
                </IonText>
                <IonChip color="primary" className="order-chip" outline>
                  <IonText>
                    <Link to="/homePage" className="homepage-link">
                      Commander
                    </Link>
                  </IonText>
                </IonChip>
              </>
            )}
          </IonContent>
        </IonPage>
        <style>
          {`
            .empty-cart {
              width: 80%;
              height: auto;
              margin-top: 100px;
            }
            .empty-cart-title {
              text-align: center;
              margin-top: 80px;
            }
            .order-chip {
              margin-top: 50px;
            }
            .homepage-link {
              text-decoration: none;
            }
            .basket-item-quantity {
              width: 10px;
            }
            .basket-quantity-input {
              width: 28px;
              margin: 0;
              margin-left: 11px;
            }
            .quantity-buttons {
              margin: 0;
              margin-left: 11px;
            }
          `}
        </style>
      </>
    );
  }
}

export default Basket;
