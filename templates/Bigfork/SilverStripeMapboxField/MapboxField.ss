<div class="mapbox__map-outer">
    <div class="mapbox__map-inner">
        <div class="mapbox__map" data-mapbox-style="{$MapboxStyle}"></div>
    </div>
</div>

<% loop $Children %>
    {$Field}
<% end_loop %>
