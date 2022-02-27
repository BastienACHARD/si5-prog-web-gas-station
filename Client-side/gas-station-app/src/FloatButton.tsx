import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
class FloatButton extends React.Component<any, any> {
  helpDiv: HTMLButtonElement;

  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map:any) => {
        const helpDiv = L.DomUtil.create("button", "");
        this.helpDiv = helpDiv;
        helpDiv.innerHTML = this.props.title;

        helpDiv.addEventListener("click", () => {
          console.log(map.getCenter());
          const marker = L.marker(this.props.markerPosition,this.props.description)
            .addTo(map);

          marker.openPopup();
        });

        //a bit clueless how to add a click event listener to this button and then
        // open a popup div on the map
        return helpDiv;
      }
    });
    return new MapHelp({ position: "bottomright" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.helpDiv.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component:any) {
  return function WrappedComponent(props:any) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(FloatButton);
