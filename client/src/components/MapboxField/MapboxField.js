class MapboxField {
    /**
     * @param {HTMLElement} $container
     */
    constructor($container) {
        this.$container = $container;
        this.rendered = false;
    }

    /**
     * @returns {string}
     * @private
     */
    static _getAccessToken() {
        return window.mapboxAccessToken;
    }

    /**
     * @returns {string[]}
     * @private
     */
    _getLngLatValue() {
        return [this._getLngField().val(), this._getLatField().val()];
    }

    /**
     * @param {[]} coords
     * @private
     */
    _setLngLatValue(coords) {
        this._getLngField().val(coords[0]).change();
        this._getLatField().val(coords[1]).change();
    }

    /**
     * @returns {HTMLElement}
     * @private
     */
    _getLngField() {
        return this.$container.find('input[data-mapbox-field="Longitude"]');
    }

    /**
     * @returns {HTMLElement}
     * @private
     */
    _getLatField() {
        return this.$container.find('input[data-mapbox-field="Latitude"]');
    }

    /**
     * Render the map
     */
    render() {
        if (this.rendered) {
            return;
        }

        // Set up map
        mapboxgl.accessToken = MapboxField._getAccessToken();

        const container = this.$container.find(".mapbox__map").get(0);
        const style = container.dataset.mapboxStyle;

        const map = new mapboxgl.Map({
            container: container,
            style: style,
            center: this._getLngLatValue(),
            zoom: 15,
        });

        // Add marker
        const marker = new mapboxgl.Marker({
            draggable: true,
        })
            .setLngLat(this._getLngLatValue())
            .addTo(map);

        // Udpdate the coordinates after dragging marker
        marker.on("dragend", () => {
            this._onMarkerUpdate(marker);
        });

        // Add geocoder to map
        const geocoder = new MapboxGeocoder({
            accessToken: MapboxField._getAccessToken(),
            mapboxgl: mapboxgl,
        });
        map.addControl(geocoder);

        // Update the marker after geocoding
        geocoder.on("result", (event) => {
            marker.setLngLat(event.result.geometry.coordinates);
            this._onMarkerUpdate(marker);
        });

        map.addControl(new mapboxgl.NavigationControl());

        this.rendered = true;
    }

    /**
     * @param {Object} marker
     * @private
     */
    _onMarkerUpdate(marker) {
        const lngLat = marker.getLngLat();
        this._setLngLatValue([lngLat.lng, lngLat.lat]);
    }
}

export default MapboxField;
