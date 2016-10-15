StadiumItems = new Mongo.Collection("Pitch.Items");
Sections = new Mongo.Collection("Pitch.Sections0");

// Orders = new Mongo.Collection("Pitch.Orders1")

Template.Items.helpers({
  items: function(){
    return StadiumItems.find({})[0]
  }
})

var findSectionlatLng = function(name, rowId){
  section = Sections.findOne({name: name})
  var res = _.find(section.rows, function(row){
    return row.id == rowId
  })
  return res.latLng
}
// Section Main Level 232B row 9 seat 4

Template.Items.events({
  "click button.place-order" (evt,instance){
    latLng = findSectionlatLng("main-level-232-b", 2)
    Orders.insert({
      name: "Jim",
      section: {name: "main-level-232-b", row: 2, seat: 45, latLng: latLng},
      items: [{name: "Yankee Shirt", id: "45"}],
      status: "pending"})
  }
})
