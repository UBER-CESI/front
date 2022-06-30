import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { checkmarkDoneOutline, closeOutline } from "ionicons/icons";
import {
  getRestaurantItem,
  getRestaurantMenuList,
} from "../../services/restaurant";
import { Menu } from "../../models/menu";
import { Item } from "../../models/item";
import { Option } from "../../models/itemOption";
import { Value } from "../../models/itemOptionValue";

interface RestaurantMenuProps {
  state: any;
  dispatch: any;
}

interface IState {
  menus: Array<Menu> | any;
  previousMenus: Array<Menu> | any;

  menusToCreate: Array<Menu>;
  menusToUpdate: Array<Menu>;
  menusToDelete: Array<string>;
  itemsToCreate: Array<Item>;
  itemsToUpdate: Array<Item>;
  itemsToDelete: Array<string>;

  showToast: boolean;
  toastError: boolean;
}

class RestaurantMenu extends React.Component<RestaurantMenuProps, IState> {
  constructor(props: RestaurantMenuProps) {
    super(props);
    this.state = {
      menus: [],
      previousMenus: [],

      menusToCreate: [],
      menusToUpdate: [],
      menusToDelete: [],
      itemsToCreate: [],
      itemsToUpdate: [],
      itemsToDelete: [],

      showToast: false,
      toastError: false,
    };
  }

  componentDidMount = () => {
    getRestaurantMenuList(this.props.state.restaurantInfo._id).then(
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
                setTimeout(() => {
                  this.setState({
                    menus: menus,
                    previousMenus: menus,
                  });
                }, 10);
              }
            });
          });
        });
      }
    );
  };

  deleteMenu = (menuIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    menus[menuIndex]._id && this.addMenuToDelete(menus[menuIndex]._id);
    menus.splice(menuIndex, 1);
    this.setState({ menus: menus });
  };

  addMenu = () => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let newMenu = {
      name: "",
      description: "",
      price: 0,
      items: [],
    };
    menus.push(newMenu);
    this.setState({ menus: menus });
    this.addMenuToCreate(newMenu);
  };

  submitChanges = () => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let previousMenus = JSON.parse(JSON.stringify(this.state.previousMenus));

    this.setState({ previousMenus: menus });
  };

  discardChanges = () => {
    this.setState({
      menus: this.state.previousMenus,
      menusToCreate: [],
      menusToUpdate: [],
      menusToDelete: [],
      itemsToCreate: [],
      itemsToUpdate: [],
      itemsToDelete: [],
    });
  };

  addMenuToCreate = (menu: Menu) => {
    let menusToCreate = JSON.parse(JSON.stringify(this.state.menusToCreate));
    menusToCreate.push(menu);
    this.setState({ menusToCreate: menusToCreate });
  };

  addMenuToUpdate = (menu: Menu) => {
    let menusToUpdate = JSON.parse(JSON.stringify(this.state.menusToUpdate));
    menusToUpdate.push(menu);
    this.setState({ menusToUpdate: menusToUpdate });
  };

  addMenuToDelete = (menuId: string) => {
    let menusToDelete = JSON.parse(JSON.stringify(this.state.menusToDelete));
    menusToDelete.push(menuId);
    this.setState({ menusToDelete: menusToDelete });
  };

  addItemToCreate = (item: Item) => {
    let itemsToCreate = JSON.parse(JSON.stringify(this.state.itemsToCreate));
    itemsToCreate.push(item);
    this.setState({ itemsToCreate: itemsToCreate });
  };

  addItemToUpdate = (menuIndex: number, itemIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let itemsToUpdate = JSON.parse(JSON.stringify(this.state.itemsToUpdate));
    let item = menus[menuIndex].items[itemIndex];
    itemsToUpdate.push(item);
    this.setState({ itemsToUpdate: itemsToUpdate });
  };

  addItemToDelete = (itemId: string) => {
    let itemsToDelete = JSON.parse(JSON.stringify(this.state.itemsToDelete));
    itemsToDelete.push(itemId);
    this.setState({ itemsToDelete: itemsToDelete });
  };

  getAllergens = (allergens: Array<string>) => {
    let allergenString = "";
    allergens.forEach((allergen: string) => {
      allergenString += allergen + ", ";
    });
    return allergenString.slice(0, -2);
  };

  changeAllergens = (
    menuIndex: number,
    itemIndex: number,
    newValue: string
  ) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    menus[menuIndex].items[itemIndex].allergens = newValue.split(", ");
    this.setState({ menus: menus });
    this.addItemToUpdate(menuIndex, itemIndex);
  };

  addOption = (menuIndex: number, itemIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let option = {
      name: "",
      multiple: true,
      required: false,
      values: [],
    };
    menus[menuIndex].items[itemIndex].options.push(option);
    this.setState({ menus: menus });
    this.addItemToUpdate(menuIndex, itemIndex);
  };

  deleteOption = (
    menuIndex: number,
    itemIndex: number,
    optionIndex: number
  ) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    menus[menuIndex].items[itemIndex].options.splice(optionIndex, 1);
    this.setState({ menus: menus });
    this.addItemToUpdate(menuIndex, itemIndex);
  };

  deleteValue = (
    menuIndex: number,
    itemIndex: number,
    optionIndex: number,
    valueIndex: number
  ) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    menus[menuIndex].items[itemIndex].options[optionIndex].values.splice(
      valueIndex,
      1
    );
    this.setState({ menus: menus });
    this.addItemToUpdate(menuIndex, itemIndex);
  };

  changeValue = (
    menuIndex: number,
    itemIndex: number,
    optionIndex: number,
    valueIndex: number,
    newPrice: number
  ) => {
    if (newPrice >= 0) {
      let menus = JSON.parse(JSON.stringify(this.state.menus));
      menus[menuIndex].items[itemIndex].options[optionIndex].values[
        valueIndex
      ].priceOffset = newPrice;
      this.setState({ menus: menus });
      this.addItemToUpdate(menuIndex, itemIndex);
    }
  };

  addValue = (menuIndex: number, itemIndex: number, optionIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let value = {
      name: "",
      priceOffset: 0,
    };
    menus[menuIndex].items[itemIndex].options[optionIndex].values.push(value);
    this.setState({ menus: menus });
    this.addItemToUpdate(menuIndex, itemIndex);
  };

  addItem = (menuIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let item = {
      name: "",
      description: "",
      allergens: [],
      restaurantId: this.props.state.restaurantInfo._id,
      options: [],
    };
    menus[menuIndex].items.push(item);
    this.addMenuToUpdate(menus[menuIndex]);
    this.addItemToCreate(item);
    this.setState({ menus: menus });
  };

  deleteItem = (menuIndex: number, itemIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    menus[menuIndex].items[itemIndex]._id &&
      this.addItemToDelete(menus[menuIndex].items[itemIndex]._id);
    menus[menuIndex].items.splice(itemIndex, 1);
    this.setState({ menus: menus });
  };

  render() {
    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu du restaurant</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            {this.state.menus.length > 0 &&
              this.state.menus?.map((menu: Menu, menuIndex: number) => (
                <IonCard key={menuIndex}>
                  <IonCardHeader>
                    <IonButton
                      size="small"
                      color={"danger"}
                      onClick={() => this.deleteMenu(menuIndex)}
                    >
                      Supprimer
                    </IonButton>
                    <IonCardTitle>
                      <IonTextarea
                        value={menu.name}
                        className="menu-name"
                        placeholder="Nom du menu"
                        rows={1}
                        onIonChange={(e: any) => {
                          let menus = JSON.parse(
                            JSON.stringify(this.state.menus)
                          );
                          menus[menuIndex].name = e.detail.value;
                          this.setState({ menus: menus });
                          this.addMenuToUpdate(menus[menuIndex]);
                        }}
                      />
                      <IonInput
                        value={menu.price}
                        type="number"
                        className="menu-price"
                        placeholder="Prix du menu"
                        onIonChange={(e: any) => {
                          let menus = JSON.parse(
                            JSON.stringify(this.state.menus)
                          );
                          menus[menuIndex].price = e.detail.value;
                          this.setState({ menus: menus });
                          this.addMenuToUpdate(menus[menuIndex]);
                        }}
                      />
                      <IonText className="menu-price-currency">€</IonText>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {menu.items?.map((item: Item, itemIndex: number) => (
                      <div key={itemIndex}>
                        <IonItemDivider color={"primary"}>
                          <IonTextarea
                            value={item.name}
                            className="item-name"
                            placeholder="Nom de l'article"
                            rows={1}
                            onIonChange={(e: any) => {
                              let menus = JSON.parse(
                                JSON.stringify(this.state.menus)
                              );
                              menus[menuIndex].items[itemIndex].name =
                                e.detail.value;
                              this.setState({ menus: menus });
                              this.addItemToUpdate(menuIndex, itemIndex);
                            }}
                          />
                          <IonButton
                            size="small"
                            color={"danger"}
                            onClick={() =>
                              this.deleteItem(menuIndex, itemIndex)
                            }
                          >
                            Supprimer
                          </IonButton>
                        </IonItemDivider>
                        <IonText>
                          <b>Description : </b>
                          <IonTextarea
                            value={item.description}
                            className="item-description"
                            placeholder="Description de l'article"
                            rows={1}
                            onIonChange={(e: any) => {
                              let menus = JSON.parse(
                                JSON.stringify(this.state.menus)
                              );
                              menus[menuIndex].items[itemIndex].description =
                                e.detail.value;
                              this.setState({ menus: menus });
                              this.addItemToUpdate(menuIndex, itemIndex);
                            }}
                          />
                        </IonText>
                        <br />
                        <br />
                        <IonText>
                          <b>Allergènes : (Séparer avec des virgules)</b>{" "}
                          <IonTextarea
                            value={this.getAllergens(item.allergens)}
                            className="item-allergens"
                            placeholder="Allergènes de l'article"
                            rows={1}
                            onIonChange={(e: any) => {
                              this.changeAllergens(
                                menuIndex,
                                itemIndex,
                                e.detail.value
                              );
                              this.addItemToUpdate(menuIndex, itemIndex);
                            }}
                          />
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
                                    <IonTextarea
                                      value={option.name}
                                      className="option-name"
                                      placeholder="Nom de l'option"
                                      rows={1}
                                      onIonChange={(e: any) => {
                                        let menus = JSON.parse(
                                          JSON.stringify(this.state.menus)
                                        );
                                        menus[menuIndex].items[
                                          itemIndex
                                        ].options[optionIndex].name =
                                          e.detail.value;
                                        this.setState({ menus: menus });
                                        this.addItemToUpdate(
                                          menuIndex,
                                          itemIndex
                                        );
                                      }}
                                    />
                                    <IonButton
                                      size="small"
                                      color="danger"
                                      onClick={() => {
                                        this.deleteOption(
                                          menuIndex,
                                          itemIndex,
                                          optionIndex
                                        );
                                        this.addItemToUpdate(
                                          menuIndex,
                                          itemIndex
                                        );
                                      }}
                                    >
                                      X
                                    </IonButton>
                                  </h2>
                                </IonText>
                                <IonList lines="none" inset={false}>
                                  {option.values.map(
                                    (value: Value, valueIndex: number) => (
                                      <IonItem key={valueIndex}>
                                        <IonText slot="start">
                                          <IonButton
                                            size="small"
                                            color="danger"
                                            onClick={() => {
                                              this.deleteValue(
                                                menuIndex,
                                                itemIndex,
                                                optionIndex,
                                                valueIndex
                                              );
                                              this.addItemToUpdate(
                                                menuIndex,
                                                itemIndex
                                              );
                                            }}
                                          >
                                            X
                                          </IonButton>
                                        </IonText>
                                        <IonText>
                                          <IonTextarea
                                            value={value.value}
                                            className="value-value"
                                            placeholder="Nom de l'option"
                                            rows={1}
                                            onIonChange={(e: any) => {
                                              let menus = JSON.parse(
                                                JSON.stringify(this.state.menus)
                                              );
                                              menus[menuIndex].items[
                                                itemIndex
                                              ].options[optionIndex].values[
                                                valueIndex
                                              ].value = e.detail.value;
                                              this.setState({ menus: menus });
                                              this.addItemToUpdate(
                                                menuIndex,
                                                itemIndex
                                              );
                                            }}
                                          />
                                        </IonText>
                                        <IonText slot="end">
                                          <IonButton
                                            size="small"
                                            color="primary"
                                            onClick={() => {
                                              this.changeValue(
                                                menuIndex,
                                                itemIndex,
                                                optionIndex,
                                                valueIndex,
                                                value.priceOffset + 1
                                              );
                                              this.addItemToUpdate(
                                                menuIndex,
                                                itemIndex
                                              );
                                            }}
                                          >
                                            +
                                          </IonButton>
                                        </IonText>
                                        <IonText slot="end">
                                          {value.priceOffset}€
                                        </IonText>
                                        <IonText slot="end">
                                          <IonButton
                                            size="small"
                                            color="primary"
                                            onClick={() => {
                                              this.changeValue(
                                                menuIndex,
                                                itemIndex,
                                                optionIndex,
                                                valueIndex,
                                                value.priceOffset - 1
                                              );
                                              this.addItemToUpdate(
                                                menuIndex,
                                                itemIndex
                                              );
                                            }}
                                          >
                                            -
                                          </IonButton>
                                        </IonText>
                                      </IonItem>
                                    )
                                  )}
                                </IonList>
                                <IonButton
                                  color={"success"}
                                  size="small"
                                  onClick={() => {
                                    this.addValue(
                                      menuIndex,
                                      itemIndex,
                                      optionIndex
                                    );
                                    this.addItemToUpdate(menuIndex, itemIndex);
                                  }}
                                >
                                  Ajouter une valeur
                                </IonButton>
                                <br />
                                <br />
                              </div>
                            )
                          )}
                          <IonButton
                            size="small"
                            color={"success"}
                            onClick={() => this.addOption(menuIndex, itemIndex)}
                          >
                            Ajouter une option
                          </IonButton>
                        </IonText>
                        <hr />
                      </div>
                    ))}
                    <IonButton
                      size="small"
                      color={"success"}
                      onClick={() => this.addItem(menuIndex)}
                    >
                      Ajouter un article
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            <IonGrid>
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <IonButton color={"success"} onClick={() => this.addMenu()}>
                    Ajouter un menu
                  </IonButton>
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="menu-save-grid">
              <IonRow>
                <IonCol>
                  <IonButton
                    color={"danger"}
                    onClick={() => this.discardChanges()}
                  >
                    Annuler
                  </IonButton>
                </IonCol>
                <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol>
                  <IonButton
                    color={"success"}
                    onClick={() => this.submitChanges()}
                  >
                    Sauvegarder
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
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
            .options {
              margin-left: 10px;
              margin-top: 10px;
            }
            .item-price {
              position: absolute;
              right: 10px;
            }
            .menu-save-grid {
              margin-top: 10px;
              margin-bottom: 30px;
            }
            .menu-name {
              width: 100%;
              height: 50px;
            }
            .menu-price {
              width: 80px;
              height: 50px;
            }
            .menu-price-currency {
              position: absolute;
              left: 80px;
              top: 60px;
            }
            .item-name {
              width: 100%;
              height: 40px;
            }
            .item-description {
              width: 100%;
              height: 20px;
            }
            .item-allergens {
              width: 100%;
              height: 20px;
            }
          `}
        </style>
      </>
    );
  }
}

export default RestaurantMenu;
