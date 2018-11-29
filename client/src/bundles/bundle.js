import jQuery from 'jquery';
import MapboxField from 'components/MapboxField/MapboxField';

jQuery.entwine('ss', ($) => {
  $('.cms-edit-form .mapbox').entwine({
    MapboxField: null,

    onmatch() {
      if (!this.getMapboxField()) {
        this.setMapboxField(new MapboxField(this));
      }
    }
  });

  $('.cms-edit-form [aria-hidden="false"] .mapbox').entwine({
    onmatch() {
      this._super();

      this.getMapboxField().render();
    }
  });
});
