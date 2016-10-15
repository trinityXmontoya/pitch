StadiumItems = new Mongo.Collection("Pitch.Items");
// Orders = new Mongo.Collection("Pitch.Orders0")

Template.Items.helpers({
  items: function(){
    return StadiumItems.find({})[0]
  }
})

Template.Items.events({
  "click button.place-order" (evt,instance){
    var order = {
      name: "Jim",
      section: 23,
      items: [{name: "Yankee Shirt", id: "45"}],
      status: "pending"
    }
    Orders.insert(order)
  }
})
