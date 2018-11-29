<?php

namespace Bigfork\SilverStripeMapboxField;

use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class LeftAndMainExtension extends Extension
{
    public function onAfterInit()
    {
        $config = MapboxField::config();
        Requirements::css($config->api_css_url);
        Requirements::javascript($config->api_javascript_url);
        Requirements::css($config->geocoder_css_url);
        Requirements::javascript($config->geocoder_javascript_url);
        Requirements::customScript(<<<JS
window.mapboxAccessToken = '{$config->access_token}';
JS
        );
    }
}