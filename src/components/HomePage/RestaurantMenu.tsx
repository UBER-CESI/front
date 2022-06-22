import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Restaurant } from "../../models/restaurant";
import { Item } from "../../models/item";
import { Option } from "../../models/itemOption";
import { Value } from "../../models/itemOptionValue";
import { add, checkmarkDoneOutline, closeOutline } from "ionicons/icons";

interface RestaurantMenuProps {
  state: any;
  dispatch: any;
}

interface IState {
  menu: Array<Item>;
  itemQuantity: Array<number>;
  showToast: boolean;
  toastError: boolean;
}

class RestaurantMenu extends React.Component<RestaurantMenuProps, IState> {
  constructor(props: RestaurantMenuProps) {
    super(props);
    this.state = {
      menu: [],
      itemQuantity: [],
      showToast: false,
      toastError: false,
    };
  }

  componentDidMount = () => {
    this.setState({ menu: this.findMenu() });
    setTimeout(() => {
      this.addCheckboxes();
    }, 0);
  };

  addCheckboxes = () => {
    let menu = [...this.state.menu];
    menu.forEach((item: Item) => {
      item.options.forEach((option: Option) => {
        option.values.forEach((value: Value) => {
          value.checked = false;
        });
      });
    });
    this.setState({ menu: menu });
    this.addItemQuantity();
  };

  addItemQuantity = () => {
    let itemQuantity = [...this.state.itemQuantity];
    this.state.menu.forEach((item: Item) => {
      itemQuantity.push(0);
    });
    this.setState({ itemQuantity: itemQuantity });
  };

  selectedOptions = (itemIndex: number) => {
    let menu = JSON.parse(JSON.stringify(this.state.menu));
    let options: Array<Option> = [];
    menu[itemIndex].options.forEach((option: Option) => {
      option.values.forEach((value: Value, valueIndex: number) => {
        if (!value.checked) {
          delete option.values[valueIndex];
        }
      });
      options.push(option);
    });
    return options;
  };

  addToCart = (itemIndex: number) => {
    const { dispatch, state } = this.props;
    if (!state.basket.items) {
      dispatch({
        type: "SET_BASKET",
        payload: {
          restaurant_id: state.selectedRestaurantId,
          restaurant_name: this.restaurantName(),
          items: [
            {
              id: 0,
              name: this.state.menu[itemIndex].name,
              description: this.state.menu[itemIndex].description,
              allergens: this.state.menu[itemIndex].allergens,
              price: this.state.menu[itemIndex].price,
              quantity: this.state.itemQuantity[itemIndex],
              restaurantId: state.selectedRestaurantId,
              options: this.selectedOptions(itemIndex),
            },
          ],
        },
      });
      this.setState({ showToast: true, toastError: false });
    } else {
      if (state.selectedRestaurantId !== state.basket.restaurant_id) {
        this.setState({ showToast: true, toastError: true });
      } else {
        let basket = JSON.parse(JSON.stringify(state.basket));
        basket.items.push({
          id: state.basket.items.length,
          name: this.state.menu[itemIndex].name,
          description: this.state.menu[itemIndex].description,
          allergens: this.state.menu[itemIndex].allergens,
          price: this.state.menu[itemIndex].price,
          quantity: this.state.itemQuantity[itemIndex],
          restaurantId: state.selectedRestaurantId,
          options: this.selectedOptions(itemIndex),
        });
        dispatch({
          type: "SET_BASKET",
          payload: basket,
        });
        this.setState({ showToast: true, toastError: false });
      }
    }
  };

  changeCheckbox = (
    itemIndex: number,
    optionIndex: number,
    valueIndex: number
  ) => {
    let menu = [...this.state.menu];
    menu[itemIndex].options[optionIndex].values[valueIndex].checked =
      !menu[itemIndex].options[optionIndex].values[valueIndex].checked;
    this.setState({ menu: menu });
  };

  itemPrice = (itemIndex: number) => {
    let price = this.state.menu[itemIndex].price;
    this.state.menu[itemIndex].options.forEach((option: Option) => {
      option.values.forEach((value: Value) => {
        if (value.checked) {
          price += value.priceOffset;
        }
      });
    });
    return price;
  };

  findMenu = (): Array<Item> => {
    let menu = require("../../restaurantMenus-" +
      this.props.state.selectedRestaurantId +
      ".json");
    return menu;
  };

  restaurantName = () => {
    const { state } = this.props;
    const restaurant = state.restaurants.find(
      (r: Restaurant) => r.id === state.selectedRestaurantId
    );
    return restaurant.name;
  };

  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <IonBackButton className="page-header-logo" text={"Retour"} />
                {this.restaurantName()}
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {this.state.menu?.map((item: Item, itemIndex: number) => (
              <IonCard key={itemIndex}>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonText>{item.name}</IonText>
                    <IonText className="item-price">
                      {this.itemPrice(itemIndex)}€
                    </IonText>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <b>Description : </b>
                    {item.description}
                  </IonText>
                  <br />
                  <br />
                  <IonText>
                    <b>Allergènes : </b>{" "}
                    {item.allergens.map((allergen: string, i: number) => {
                      return (
                        <span key={i}>
                          {allergen}
                          {i !== item.allergens.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </IonText>
                  <br />
                  <br />
                  <IonItemDivider color={"primary"}>
                    <IonText>
                      <b>Options</b>
                    </IonText>
                  </IonItemDivider>
                  <IonText className="options">
                    {item.options.map((option: Option, optionIndex: number) => (
                      <div key={optionIndex}>
                        <IonText>
                          <h2>
                            <b>{option.name}</b>
                          </h2>
                        </IonText>
                        <IonList lines="none">
                          {option.values.map(
                            (value: Value, valueIndex: number) => (
                              <IonItem key={valueIndex}>
                                <IonText>
                                  <b>{value.value}</b>
                                </IonText>
                                <IonText slot="end">
                                  {value.priceOffset > 0 && (
                                    <IonText>+{value.priceOffset}€</IonText>
                                  )}
                                </IonText>
                                <IonCheckbox
                                  slot="end"
                                  checked={
                                    this.state.menu.length > 0
                                      ? this.state.menu[itemIndex].options[
                                          optionIndex
                                        ].values[valueIndex].checked
                                      : false
                                  }
                                  onClick={() => {
                                    this.changeCheckbox(
                                      itemIndex,
                                      optionIndex,
                                      valueIndex
                                    );
                                  }}
                                />
                              </IonItem>
                            )
                          )}
                        </IonList>
                        <br />
                      </div>
                    ))}
                  </IonText>
                  <hr />
                  <IonLabel>
                    <b>Quantité</b>
                  </IonLabel>
                  <IonSelect
                    value={
                      this.state.itemQuantity.length > 0
                        ? this.state.itemQuantity[itemIndex]
                        : 0
                    }
                    onIonChange={(e) => {
                      let itemQuantity = [...this.state.itemQuantity];
                      itemQuantity[itemIndex] = e.detail.value;
                      this.setState({ itemQuantity: itemQuantity });
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i: number) => (
                      <IonSelectOption key={i} value={i}>
                        {i}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                  <IonButton
                    disabled={
                      this.state.itemQuantity[itemIndex] > 0 ? false : true
                    }
                    className="add-button"
                    onClick={() => {
                      this.addToCart(itemIndex);
                    }}
                  >
                    <IonIcon slot="start" icon={add} />
                    <IonLabel>Ajouter au panier</IonLabel>
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
            <IonToast
              isOpen={this.state.showToast}
              onDidDismiss={() => this.setState({ showToast: false })}
              message={
                this.state.toastError
                  ? "Votre panier ne peut contenir des plats que du même restaurant !"
                  : "Ajouté au panier !"
              }
              duration={2000}
              color={this.state.toastError ? "danger" : "success"}
              icon={this.state.toastError ? closeOutline : checkmarkDoneOutline}
            />
          </IonContent>
        </IonPage>
        <style>
          {`
            .menu-return-arrow {
              position: absolute;
              right: 10px;
              top: 5px;
              width: 32px;
              height: 32px;
              color: blue;
            }
            .options {
              margin-left: 10px;
              margin-top: 10px;
            }
            .add-button {
              margin-top: 10px;
            }
            .item-price {
              position: absolute;
              right: 10px;
            }
          `}
        </style>
      </>
    );
  }
}

export default RestaurantMenu;
