import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonItemDivider,
  IonList,
  IonText,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import { Item } from "../../models/item";
import { Value } from "../../models/itemOptionValue";
import { Option } from "../../models/itemOption";

interface MenuProps {
  state: any;
  dispatch: any;
}

interface IState {
  previousMenu: Array<Item>;
  menu: Array<Item>;
}

class Menu extends React.Component<MenuProps, IState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      previousMenu: [],
      menu: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      previousMenu: require("../../restaurantMenus-0.json"),
      menu: require("../../restaurantMenus-0.json"),
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
                Menu du restaurant
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            {this.state.menu?.map((item: Item, itemIndex: number) => (
              <IonCard key={itemIndex}>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonTextarea
                      placeholder="Nom du produit"
                      rows={1}
                      value={item.name}
                      inputMode="text"
                      maxlength={18}
                      onIonChange={(e) => {
                        console.log(e.detail.value);
                      }}
                    />
                    {/* <IonTextarea
                      placeholder="Prix"
                      rows={1}
                      value={item.name}
                      inputMode="text"
                      maxlength={18}
                      onIonChange={(e) => {
                        console.log(e.detail.value);
                      }}
                    /> */}
                    <IonText className="item-price">{item.price}€</IonText>
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
                                  <IonText>+{value.priceOffset}€</IonText>
                                </IonText>
                              </IonItem>
                            )
                          )}
                        </IonList>
                        <br />
                      </div>
                    ))}
                  </IonText>
                </IonCardContent>
              </IonCard>
            ))}
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
              top: 10px;
            }
          `}
        </style>
      </>
    );
  }
}

export default Menu;
