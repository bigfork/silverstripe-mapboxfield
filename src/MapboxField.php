<?php

namespace Bigfork\SilverStripeMapboxField;

use http\Exception\InvalidArgumentException;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\HiddenField;

class MapboxField extends CompositeField
{
    private static $access_token = null;
    private static $map_style = 'mapbox://styles/mapbox/basic-v9';
    private static $api_css_url = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css';
    private static $api_javascript_url = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js';
    private static $geocoder_css_url = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.css';
    private static $geocoder_javascript_url = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.min.js';
    private $curr_style;
    
    /**
     * @param string $name
     * @param string $title
     * @param string $latitudeField
     * @param string $longitudeField
     */
    public function __construct($name, $title, $latitudeField, $longitudeField)
    {
        $cfg = self::config();
        
        $this->curr_style = $cfg->get('map_style');
        
        parent::__construct([
            HiddenField::create($latitudeField)
                ->setAttribute('data-mapbox-field', 'Latitude'),
            HiddenField::create($longitudeField)
                ->setAttribute('data-mapbox-field', 'Longitude')
        ]);
        
        $this->setName($name);
        $this->setTitle($title);
    }
    
    public function getAttributes()
    {
        $attrs = parent::getAttributes();
        return array_merge($attrs, [
            'class' => $attrs['class'].' stacked',
            'data-style' => $this->getStyle(),
        ]);
    }
    
    public function getStyle()
    {
        return $this->curr_style;
    }
    
    public function setStyle($style)
    {
        $this->curr_style = $style;
        return $this;
    }
}
