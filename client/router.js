Tracker.autorun(function() {
	FlowRouter.watchPathChange();
});

FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("Layout", {
			content: "LandingPage"
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

FlowRouter.route('/orders', {
	action: function() {
		BlazeLayout.render("Layout", {
			content: "Orders"
		});
	}
});

FlowRouter.route('/seatType', {
	action: function() {
		BlazeLayout.render("Layout", {
			content: "seatType"
		});
	}
});

FlowRouter.route('/choices', {
	action: function() {
		BlazeLayout.render("Layout", {
			content: "merchandiseChoice"
		});
	}
});



BlazeLayout.setRoot('body');
