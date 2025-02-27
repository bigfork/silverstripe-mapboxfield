<?php

namespace Bigfork\SilverStripeMapboxField;

use http\Exception\InvalidArgumentException;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\HiddenField;

class MapboxField extends CompositeField
{
    /**
     * @param string $name
     * @param string $title
     * @param string $latitudeField
     * @param string $longitudeField
     */
    public function __construct($name, $title, $latitudeField, $longitudeField)
    {
        $children = [
            HiddenField::create($latitudeField)
                ->setAttribute('data-mapbox-field', 'Latitude'),
            HiddenField::create($longitudeField)
                ->setAttribute('data-mapbox-field', 'Longitude')
        ];

        parent::__construct($children);

        $this->setName($name);
        $this->setTitle($title);
        $this->addExtraClass('stacked');
    }

    public function getMapboxStyle()
    {
        $config = MapboxField::config();
        return $config->style;
    }
}
