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
import { Restaurant } from "../../../models/restaurant";
import { Item } from "../../../models/item";
import { Option } from "../../../models/itemOption";
import { Value } from "../../../models/itemOptionValue";
import { add, checkmarkDoneOutline, closeOutline } from "ionicons/icons";
import {
  getRestaurantItem,
  getRestaurantMenuList,
} from "../../../services/restaurant";
import { Menu } from "../../../models/menu";

interface CustomerRestaurantMenuProps {
  state: any;
  dispatch: any;
}

interface IState {
  menus: Menu | any;
  menuQuantity: Array<number>;
  showToast: boolean;
  toastError: boolean;
}

class CustomerRestaurantMenu extends React.Component<
  CustomerRestaurantMenuProps,
  IState
> {
  constructor(props: CustomerRestaurantMenuProps) {
    super(props);
    this.state = {
      menus: {},
      menuQuantity: [],
      showToast: false,
      toastError: false,
    };
  }

  componentDidMount = () => {
    getRestaurantMenuList(this.props.state.selectedRestaurantId).then(
      (menusData: any) => {
        let menus = JSON.parse(JSON.stringify(menusData.data));
        let items = menus.map((menu: Menu) => {
          return menu.items;
        });
        menus.forEach((menu: Menu) => {
          menu.items = [];
        });

        menus.forEach((menu: Menu, i: number) => {
          items[i].forEach((item: any, j: number) => {
            getRestaurantItem(item).then((it: any) => {
              menu.items.push(it.data);
              if (i === menus.length - 1 && j === items[i].length - 1) {
                this.addCheckboxes(menus);
              }
            });
          });
        });
      }
    );
  };

  addCheckboxes = (menus: Array<Menu>) => {
    menus.forEach((menu: Menu) => {
      menu.items.forEach((item: Item) => {
        item.options.forEach((option: Option) => {
          option.values.forEach((value: Value) => {
            value.checked = false;
          });
        });
      });
    });
    this.setState({ menus: menus });
    this.addMenuQuantity(menus);
  };

  addMenuQuantity = (menus: Array<Menu>) => {
    let menuQuantity: Array<number> = [];
    menus.forEach((menu: Menu) => {
      menuQuantity.push(0);
    });
    this.setState({ menuQuantity: menuQuantity });
  };

  selectedOptions = (menu: Menu, itemIndex: number, menuIndex: number) => {
    let options: Array<Option> = [];
    menu.items[itemIndex].options.forEach((option: Option) => {
      option.values.forEach((value: Value, valueIndex: number) => {
        if (!value.checked) {
          option.values.splice(valueIndex, 1);
        }
      });
      options.push(option);
    });
    return options;
  };

  addToCart = (menuIndex: number) => {
    const { dispatch, state } = this.props;
    let menu = JSON.parse(JSON.stringify(this.state.menus[menuIndex]));
    menu.items.forEach((item: Item, itemIndex: number) => {
      item.options = this.selectedOptions(menu, itemIndex, menuIndex);
    });
    menu.quantity = this.state.menuQuantity[menuIndex];
    if (!state.basket.menus) {
      dispatch({
        type: "SET_BASKET",
        payload: {
          restaurant_id: state.selectedRestaurantId,
          restaurant_name: this.restaurantName(),
          menus: [menu],
        },
      });
      this.setState({ showToast: true, toastError: false });
    } else {
      if (state.selectedRestaurantId !== state.basket.restaurant_id) {
        this.setState({ showToast: true, toastError: true });
      } else {
        let basket = JSON.parse(JSON.stringify(state.basket));
        basket.menus.push(menu);
        dispatch({
          type: "SET_BASKET",
          payload: basket,
        });
        this.setState({ showToast: true, toastError: false });
      }
    }
  };

  changeCheckbox = (
    menuIndex: number,
    itemIndex: number,
    optionIndex: number,
    valueIndex: number
  ) => {
    let menu = JSON.parse(JSON.stringify(this.state.menus));
    menu[menuIndex].items[itemIndex].options[optionIndex].values[
      valueIndex
    ].checked =
      !menu[menuIndex].items[itemIndex].options[optionIndex].values[valueIndex]
        .checked;
    this.setState({ menus: menu });
  };

  menuPrice = (menuIndex: number) => {
    let price = this.state.menus[menuIndex].price;
    this.state.menus[menuIndex].items.forEach((item: Item) => {
      item.options.forEach((option: Option) => {
        option.values.forEach((value: Value) => {
          if (value.checked) {
            price += value.priceOffset;
          }
        });
      });
    });
    return price;
  };

  restaurantName = () => {
    const { state } = this.props;
    const restaurant = state.restaurants.find(
      (r: Restaurant) => r._id === state.selectedRestaurantId
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
            {this.state.menus.length > 0 &&
              this.state.menus?.map((menu: Menu, menuIndex: number) => (
                <IonCard key={menuIndex}>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonText>{menu.name}</IonText>
                      <IonText className="item-price">
                        {this.menuPrice(menuIndex)}€
                      </IonText>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {menu.items?.map((item: Item, itemIndex: number) => (
                      <div key={itemIndex}>
                        <IonItemDivider color={"primary"}>
                          <IonText>
                            <b>{item.name}</b>
                          </IonText>
                        </IonItemDivider>
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
                        <IonText>
                          <h2>
                            <b>Options</b>
                          </h2>
                        </IonText>
                        <IonText className="options">
                          {item.options.map(
                            (option: Option, optionIndex: number) => (
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
                                            <IonText>
                                              +{value.priceOffset}€
                                            </IonText>
                                          )}
                                        </IonText>
                                        <IonCheckbox
                                          slot="end"
                                          checked={
                                            this.state.menus[menuIndex].items[
                                              itemIndex
                                            ].options[optionIndex].values[
                                              valueIndex
                                            ].checked
                                          }
                                          onClick={() => {
                                            this.changeCheckbox(
                                              menuIndex,
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
                            )
                          )}
                        </IonText>
                        <hr />
                      </div>
                    ))}
                    <IonLabel>
                      <b>Quantité</b>
                    </IonLabel>
                    <IonSelect
                      value={
                        this.state.menuQuantity.length > 0
                          ? this.state.menuQuantity[menuIndex]
                          : 0
                      }
                      onIonChange={(e) => {
                        let menuQuantity = [...this.state.menuQuantity];
                        menuQuantity[menuIndex] = e.detail.value;
                        this.setState({ menuQuantity: menuQuantity });
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
                        this.state.menuQuantity[menuIndex] > 0 ? false : true
                      }
                      className="add-button"
                      onClick={() => {
                        this.addToCart(menuIndex);
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

export default CustomerRestaurantMenu;
