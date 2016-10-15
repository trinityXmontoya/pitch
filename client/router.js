Tracker.autorun(function() {
	FlowRouter.watchPathChange();
});

FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("Layout", {
			content: "Home"
		});
	}
});

FlowRouter.route('/items', {
	action: function() {
		BlazeLayout.render("Layout", {
			content: "Items"
		});
	}
});
