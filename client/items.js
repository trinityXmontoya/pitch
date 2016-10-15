StadiumItems = new Mongo.Collection("Pitch.Items");

Template.Items.helpers({
  items: function(){
    console.log("findme", StadiumItems.find({}))
    return StadiumItems.find({})
  }
})
