import React from "react";
import { IonCard, IonText, IonCardContent } from "@ionic/react";
import { Restaurant } from "../../../models/restaurant";

interface RestaurantListProps {
  state: any;
  dispatch: any;
}

class RestaurantList extends React.Component<RestaurantListProps> {
  render() {
    return (
      <>
        {this.props.state.restaurants.map((restaurant: Restaurant) => {
          return (
            <IonCard
              button={true}
              key={restaurant._id}
              routerLink={"/restaurant/menu/"}
              onClick={() => {
                this.props.dispatch({
                  type: "SET_SELECTED_RESTAURANT_ID",
                  payload: restaurant._id,
                });
              }}
            >
              <img
                src={"/images/restaurant.png"}
                className="card-image"
                alt={restaurant.name}
              />
              <IonCardContent>
                <IonText>
                  <h1>{restaurant.name}</h1>
                  <p>Livraison : 2€</p>
                  <p>Adresse : {restaurant.address}</p>
                  <p>Téléphone : {restaurant.phoneNumber}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          );
        })}
        <style>
          {`
            .card-image {
              object-fit: none;
              height: 120px;
              width: 100%;
            }
          `}
        </style>
      </>
    );
  }
}

export default RestaurantList;
