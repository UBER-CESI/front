import React from "react";
import {
  IonButton,
  IonChip,
  IonContent,
  IonItem,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PlacesAutocomplete from "react-places-autocomplete";

interface AddressModalProps {
  state: any;
  dispatch: any;
}

class AddressModal extends React.Component<AddressModalProps> {
  handleChange = (address: string) => {
    this.props.dispatch({ type: "SET_ADDRESS", payload: address });
  };

  render() {
    return (
      <>
        <IonModal
          className="address-modal"
          isOpen={this.props.state.addressModal}
        >
          <IonToolbar>
            <IonTitle className="page-header">
              <IonButton
                onClick={() => {
                  this.props.dispatch({ type: "CHANGE_ADDRESS_MODAL" });
                }}
                size="small"
                className="page-header-close"
              >
                X
              </IonButton>
              Adresse de livraison
            </IonTitle>
          </IonToolbar>
          <IonContent fullscreen className="ion-text-center">
            <PlacesAutocomplete
              value={this.props.state.address}
              onChange={this.handleChange}
              onSelect={this.handleChange}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input address-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <IonList
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <IonItem>{suggestion.description}</IonItem>
                        </IonList>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <IonChip
              color="primary"
              className="order-chip"
              outline
              onClick={() =>
                this.props.dispatch({ type: "CHANGE_ADDRESS_MODAL" })
              }
            >
              <IonText>Sélectionner cette adresse</IonText>
            </IonChip>
          </IonContent>
        </IonModal>
        <style>
          {`
            .location-search-input,
            .location-search-input:focus,
            .location-search-input:active {
              box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
              border: honeydew;
              display: block;
              width: 100%;
              padding: 16px;
              font-size: 16px;
              border-radius: 2px;
              outline: none;
            }
            .autocomplete-dropdown-container {
              border-bottom: honeydew;
              border-left: honeydew;
              border-right: honeydew;
              border-top: 1px solid #e6e6e6;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              position: absolute;
              z-index: 1000;
              border-radius: 0 0 2px 2px;
            }
            .address-search-input {
              background-color: white;
              border: 1px solid black;
              border-radius: 10px;
              margin-top: 20px;
            }
            .order-chip {
              margin-top: 50px;
            }
          `}
        </style>
      </>
    );
  }
}

export default AddressModal;
