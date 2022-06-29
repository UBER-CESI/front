import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { Option } from "../../models/itemOption";
import { Value } from "../../models/itemOptionValue";

interface CustomerBasketProps {
  state: any;
  dispatch: any;
}

class CustomerBasket extends React.Component<CustomerBasketProps> {
  changeMenuQuantity = (menu: any, quantity: number) => {
    const { dispatch } = this.props;
    if (quantity > 0 && quantity <= 10) {
      dispatch({
        type: "SET_BASKET",
        payload: {
          ...this.props.state.basket,
          menus: this.props.state.basket.menus.map((m: any) => {
            if (m._id === menu._id) {
              return { ...m, quantity: quantity };
            }
            return m;
          }),
        },
      });
    }
    if (quantity <= 0) {
      dispatch({
        type: "SET_BASKET",
        payload: {
          ...this.props.state.basket,
          menus: this.props.state.basket.menus.filter(
            (m: any) => m._id !== menu._id
          ),
        },
      });
    }
    if (this.props.state.basket.menus.length === 0) {
      dispatch({
        type: "SET_BASKET",
        payload: {},
      });
    }
  };

  calculateTotal = () => {
    const { basket } = this.props.state;
    let total = 0;
    basket.menus.forEach((menu: any) => {
      total += menu.price * menu.quantity;
    });
    total += +this.props.state.tip;
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
            {this.props.state.basket.menus?.length > 0 ? (
              <>
                <IonLabel>
                  <h1 className="restaurant-name">
                    Commande {this.props.state.basket.restaurant_name}
                  </h1>
                </IonLabel>
                {this.props.state.basket.menus.map(
                  (menu: any, menuIndex: number) => {
                    return (
                      <IonCard key={menuIndex}>
                        <IonCardHeader>
                          <h2>
                            <b>{menu.name}</b>
                          </h2>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonItem>
                            {Math.round(menu.price * menu.quantity * 100) / 100}
                            €<IonNote slot="end">Quantité : </IonNote>
                            <IonNote slot="end">
                              <IonButton
                                color="success"
                                size="small"
                                className="quantity-buttons"
                                onClick={() => {
                                  this.changeMenuQuantity(
                                    menu,
                                    menu.quantity + 1
                                  );
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
                                value={menu.quantity}
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
                                      menus: this.props.state.basket.menus.map(
                                        (m: any, mIndex: number) => {
                                          if (mIndex === menuIndex) {
                                            return {
                                              ...m,
                                              quantity: e.target.value,
                                            };
                                          }
                                          return m;
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
                                  this.changeMenuQuantity(
                                    menu,
                                    menu.quantity - 1
                                  );
                                }}
                              >
                                -
                              </IonButton>
                            </IonNote>
                          </IonItem>
                          <IonList>
                            {menu.items.map((item: any, itemIndex: number) => {
                              return (
                                <IonItem key={itemIndex}>
                                  <IonLabel>
                                    <h2>{item.name}</h2>
                                    {item.options && (
                                      <>
                                        <b>Options :</b>{" "}
                                        {item.options.map(
                                          (
                                            option: Option,
                                            optionIndex: number
                                          ) => {
                                            return (
                                              <div key={optionIndex}>
                                                {option.values.length > 0 && (
                                                  <>
                                                    <br />
                                                    {option.name}
                                                    <ul>
                                                      {option.values.map(
                                                        (
                                                          value: Value,
                                                          valueIndex: number
                                                        ) => {
                                                          return (
                                                            <div
                                                              key={valueIndex}
                                                            >
                                                              {value && (
                                                                <li
                                                                  key={
                                                                    valueIndex
                                                                  }
                                                                >
                                                                  {value.value}
                                                                </li>
                                                              )}
                                                            </div>
                                                          );
                                                        }
                                                      )}
                                                    </ul>
                                                  </>
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </>
                                    )}
                                  </IonLabel>
                                </IonItem>
                              );
                            })}
                          </IonList>
                        </IonCardContent>
                      </IonCard>
                    );
                  }
                )}
                <IonText>
                  Pourboire :
                  <IonInput
                    type="number"
                    value={this.props.state.tip}
                    min="0"
                    onInput={(e: any) => {
                      this.props.dispatch({
                        type: "CHANGE_TIP",
                        payload: e.target.value,
                      });
                    }}
                  />
                  €
                </IonText>
                <IonText>
                  <h2>Commande : {this.calculateTotal()}€</h2>
                </IonText>
                <IonText>
                  <h2>Frais de livraison : 2€</h2>
                </IonText>
                <IonText>
                  <h2>Total : {this.calculateTotal() + 2}€</h2>
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
              margin-bottom: 50px;
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
            .restaurant-name {
              margin-top: 20px;
              margin-bottom: 20px;
              color: #5fb709;
            }
          `}
        </style>
      </>
    );
  }
}

export default CustomerBasket;
