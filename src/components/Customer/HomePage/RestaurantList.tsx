import React from "react";
import { IonCard, IonText, IonCardContent } from "@ionic/react";

interface RestaurantListProps {
  state: any;
  dispatch: any;
}

class RestaurantList extends React.Component<RestaurantListProps> {
  render() {
    return (
      <>
        {this.props.state.restaurants.map((restaurant: any) => {
          return (
            <IonCard
              button={true}
              key={restaurant.id}
              routerLink={"/restaurant/menu/"}
              onClick={() => {
                this.props.dispatch({
                  type: "SET_SELECTED_RESTAURANT_ID",
                  payload: restaurant.id,
                });
              }}
            >
              <img
                src={restaurant.image}
                className="card-image"
                alt={restaurant.name}
              />
              <IonCardContent>
                <IonText>
                  <h1>{restaurant.name}</h1>
                  <p>
                    Fourchette de prix : {restaurant.price}, Livraison :{" "}
                    {restaurant.delivery}€
                  </p>
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
