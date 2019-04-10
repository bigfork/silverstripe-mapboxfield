<div id="{$HolderID}" class="fieldholder-small form-group field<% if $extraClass %> {$extraClass}<% end_if %>">
    <% if $Title %>
        <label for="{$ID}" id="title-{$ID}" class="form__field-label fieldholder-small-label ">{$Title}</label>
    <% end_if %>
    <div class="form__field-holder<% if not $Title %> form__field-holder--no-label<% end_if %>">
        <%-- TODO: change $MessageType to match Bootstraps alert types, e.g. alert-info, alert-danger etc --%>
        <% if $Message %><p class="alert {$MessageType}" role="alert" id="message-{$ID}">{$Message}</p><% end_if %>
        {$Field}
        <% if $Description %><p class="form__field-description form-text" id="describes-{$ID}">{$Description}</p><% end_if %>
    </div>
</div>
