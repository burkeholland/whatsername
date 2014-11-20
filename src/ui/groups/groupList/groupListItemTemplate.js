<script id="groupListItemTemplate" type="text/x-kendo-template">
	<a href="\\#viewerView?id=#: id #">
		#: group #
	</a>
	<a data-role='detailbutton' data-style='rowdelete' data-bind="visible: isEditMode, click: removeGroup"></a>
</script>