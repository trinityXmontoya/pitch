Orders = new Mongo.Collection("Pitch.Orders0")

Template.Orders.helpers({
  Orders: function(){
    return Orders.find({})
  }
})

Template.Orders.events({
  "click button.accept-order" (evt,instance){
    id = evt.currentTarget.dataset.id
    Orders.update(id, {$set: {status: "accepted"}})
  },

  "click button.deliver-order" (evt,instance){
    id = evt.currentTarget.dataset.id
    Orders.update(id, {$set: {status: "delivered"}})
  }
})
