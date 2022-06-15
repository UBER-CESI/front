import React from "react";
import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { mapOutline } from "ionicons/icons";

interface AddressDisplayProps {
  state: any;
  dispatch: any;
}

class AddressDisplay extends React.Component<AddressDisplayProps> {
  render() {
    return (
      <>
        <IonChip
          className="address-chip"
          outline
          color={"primary"}
          onClick={() => {
            this.props.dispatch({ type: "CHANGE_ADDRESS_MODAL" });
          }}
        >
          <IonLabel>
            <IonIcon icon={mapOutline} className="map-icon" />
            <b>
              Adresse de livraison : {this.props.state.address.split(",")[0]}
            </b>
          </IonLabel>
        </IonChip>
        <style>
          {`
            .map-icon {
              margin-right: 0.5rem;
            }
            .address-chip {
              width: 98%;
            }
          `}
        </style>
      </>
    );
  }
}

export default AddressDisplay;
