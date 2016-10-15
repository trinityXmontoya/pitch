Orders = new Mongo.Collection("Pitch.Orders2");

Meteor.publish("pending-orders", function () {
  return Orders.find({status: "pending"});
});
