<script id="groupListItemTemplate" type="text/x-kendo-template">
	<li class="list-group-item" data-id="#= id#">
		<div data-role="touch" data-tap="wrn.groupList.viewModel.viewGroup" data-id="#= id#">
		<span class="glyphicon glyphicon-chevron-right groupListArrow" data-bind="invisible: isEditMode"></span>
	    <span data-bind="invisible: isEditMode"> #= group# </span>
	    </div>
		<table style="width:100%; border-spacing: 5px;">
			<tr>
				<td style="padding-right:10px;">
					<input type="text" data-id="#= id#" value="#= group#" class="form-control editGroupNameInput" data-bind="invisible: notEditMode">
				</td>
				<td style="width:45px">
					<a class="deleteGroupBtn deleteBtn" data-role="button" data-bind="invisible: notEditMode,click:removeGroup"><span class="glyphicon glyphicon-trash"></span></a>
				</td>
			</tr>
		</table>
    </li>
</script>