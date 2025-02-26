import "../styles/bundle.scss";
import jQuery from "jquery";
import MapboxField from "../components/MapboxField/MapboxField";

jQuery.entwine("ss", ($) => {
    $(".cms-edit-form .mapbox").entwine({
        MapboxField: null,

        onmatch() {
            if (!this.getMapboxField()) {
                this.setMapboxField(new MapboxField(this));
            }
        },
    });

    // Render when tab containing field is selected
    $('.cms-edit-form [aria-hidden="false"] .mapbox').entwine({
        onmatch() {
            this._super();
            this.getMapboxField().render();
        },
    });

    // Assume field not contained in a tabset is already visible
    $(".cms-edit-form .mapbox:not(.tabset .mapbox)").entwine({
        onmatch() {
            this._super();
            this.getMapboxField().render();
        },
    });
});
