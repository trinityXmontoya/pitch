StadiumItems = new Mongo.Collection("Pitch.Items");

Template.Items.helpers({
  items: function(){
    return StadiumItems.find({})
  }
})
