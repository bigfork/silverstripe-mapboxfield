# SilverStripe Mapbox Field

Adds a Mapbox map to the CMS with a draggable marker to allow content authors to add a location to a DataObject or Page.

<img src="docs/img/cms.png" alt="" />

## Installation

`composer require bigfork/silverstripe-mapboxfield:*`

## Configuration

```yml
---
Name: 'app-mapbox'
After: 'silverstripe-mapboxfield'
---
Bigfork\SilverStripeMapboxField\MapboxField:
  access_token: '<your mapbox key>'
  style: 'mapbox://styles/mapbox/standard'
```

The style is optional, and defaults to `mapbox://styles/mapbox/standard` but allows you to specify a different style if you need more control.

## Usage

```php
class MyDataObject extends DataObject
{
    private static $db = [
        'Latitude' => 'Decimal(10, 8)',
        'Longitude' => 'Decimal(11, 8)'
    ];

    public function getCMSFields()
    {
        // ...

        $fields->addFieldToTab(
            'Root.Map',
            MapboxField::create('LocationMap', 'Choose a location', 'Latitude', 'Longitude')
        );

        // ...
    }
}
```
