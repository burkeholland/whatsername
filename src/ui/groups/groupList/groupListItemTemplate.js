<script id="groupListItemTemplate" type="text/x-kendo-template">
	<li class="list-group-item" data-bind="click:viewGroup" data-id="#= id#">
	    <a data-bind="invisible: isEditMode"> #= group# </a>
	    <span class="glyphicon glyphicon-chevron-right" data-bind="invisible: isEditMode"></span>
	    <input type="text" data-id="#= id#" value="#= group#" class="form-control" data-bind="invisible: notEditMode">
	    <a data-align="right" class="btn btn-danger" data-bind="invisible: notEditMode,click:removeGroup"><span class="glyphicon glyphicon-trash"></span></a>
    </li>
</script>