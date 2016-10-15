Orders = new Mongo.Collection("Pitch.Orders1");

Meteor.publish("pending-orders", function () {
  return Orders.find({status: "pending"});
});
