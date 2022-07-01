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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import React from "react";
import { checkmarkDoneOutline, closeOutline } from "ionicons/icons";
import {
  createRestaurantMenu,
  updateRestaurantMenu,
  deleteRestaurantMenu,
  createRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem,
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

  menusToDelete: Array<Menu> | any;

  showToast: boolean;
  toastError: boolean;
}

class RestaurantMenu extends React.Component<RestaurantMenuProps, IState> {
  constructor(props: RestaurantMenuProps) {
    super(props);
    this.state = {
      menus: [],
      previousMenus: [],

      menusToDelete: [],

      showToast: false,
      toastError: false,
    };
  }

  componentDidMount = () => {
    this.getMenus();
  };

  getMenus = (event?: CustomEvent<RefresherEventDetail>) => {
    getRestaurantMenuList(this.props.state.restaurantInfo._id)
      .then((menusData: any) => {
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
      })
      .then(() => {
        if (event) {
          event.detail.complete();
        }
      });
  };

  deleteMenu = (menuIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
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
  };

  submitChanges = () => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    const restId: string = this.props.state.restaurantInfo._id;
    let error: boolean = false;

    menus.forEach((menu: any) => {
      if (!menu._id) {
        let items: Array<string> = [];
        menu.items.forEach((item: Item) => {
          createRestaurantItem(item).then((it: any) => {
            items.push(it.data._id);
            if (items.length === menu.items.length) {
              menu.items = items;
              menu.restaurantId = restId;
              createRestaurantMenu(restId, menu).then((m: any) => {
                this.getMenus();
              });
            }
          });
        });
      } else {
        let items: Array<string> = [];
        menu.items.forEach((item: Item) => {
          if (!item._id) {
            createRestaurantItem(item).then((it: any) => {
              items.push(it.data._id);
              if (items.length === menu.items.length) {
                menu.items = items;
                updateRestaurantMenu(menu._id, menu).then((m: any) => {
                  this.getMenus();
                });
              }
            });
          } else {
            updateRestaurantItem(item._id, item).then((it: any) => {
              items.push(it.data._id);
              if (items.length === menu.items.length) {
                menu.items = items;
                updateRestaurantMenu(menu._id, menu).then((m: any) => {
                  this.getMenus();
                });
              }
            });
          }
        });
      }
    });

    let menusToDelete: Array<Menu> = [];
    this.state.previousMenus.forEach((menu: Menu) => {
      let found: boolean = false;
      menus.forEach((m: Menu) => {
        if (menu._id === m._id) {
          found = true;
        }
      });
      if (!found) {
        menusToDelete.push(menu);
      }
    });
    menusToDelete.forEach((menu: any) => {
      menu.items.forEach((item: any) => {
        deleteRestaurantItem(item._id).then((it: any) => {
          deleteRestaurantMenu(menu._id).then((m: any) => {
            this.getMenus();
          });
        });
      });
    });

    if (!error) {
      this.setState({
        showToast: true,
        toastError: false,
      });
    }

    this.setState({ previousMenus: menus, menusToDelete: [] });
  };

  discardChanges = () => {
    this.setState({
      menus: this.state.previousMenus,
    });
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
  };

  addOption = (menuIndex: number, itemIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let option = {
      name: "",
      values: [],
    };
    menus[menuIndex].items[itemIndex].options.push(option);
    this.setState({ menus: menus });
  };

  deleteOption = (
    menuIndex: number,
    itemIndex: number,
    optionIndex: number
  ) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    menus[menuIndex].items[itemIndex].options.splice(optionIndex, 1);
    this.setState({ menus: menus });
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
    }
  };

  addValue = (menuIndex: number, itemIndex: number, optionIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
    let value = {
      value: "",
      priceOffset: 0,
    };
    menus[menuIndex].items[itemIndex].options[optionIndex].values.push(value);
    this.setState({ menus: menus });
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
    this.setState({ menus: menus });
  };

  deleteItem = (menuIndex: number, itemIndex: number) => {
    let menus = JSON.parse(JSON.stringify(this.state.menus));
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
            <IonRefresher slot="fixed" onIonRefresh={this.getMenus}>
              <IonRefresherContent className="refresh-content" />
            </IonRefresher>
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
                        }}
                      />
                      <IonTextarea
                        value={menu.description}
                        className="menu-name"
                        placeholder="Description"
                        rows={1}
                        onIonChange={(e: any) => {
                          let menus = JSON.parse(
                            JSON.stringify(this.state.menus)
                          );
                          menus[menuIndex].description = e.detail.value;
                          this.setState({ menus: menus });
                        }}
                      />
                      <IonInput
                        value={menu.price}
                        type="number"
                        min={0}
                        className="menu-price"
                        placeholder="Prix du menu"
                        onIonChange={(e: any) => {
                          if (e.detail.value >= 0) {
                            let menus = JSON.parse(
                              JSON.stringify(this.state.menus)
                            );
                            menus[menuIndex].price = e.detail.value;
                            this.setState({ menus: menus });
                          }
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
                          {item.options?.map(
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
                                      }}
                                    >
                                      X
                                    </IonButton>
                                  </h2>
                                </IonText>
                                <IonList lines="none" inset={false}>
                                  {option.values?.map(
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
                  ? "Erreur lors de la modification, vérifiez que vous avez bien rempli tous les champs !"
                  : "Les changements ont bien été enregistrés !"
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
              top: 110px;
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
            .refresh-content {
              background-color: #f5f5f5;
            }
          `}
        </style>
      </>
    );
  }
}

export default RestaurantMenu;
