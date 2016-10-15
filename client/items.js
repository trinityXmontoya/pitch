StadiumItems = new Mongo.Collection("Pitch.Items0");
Sections = new Mongo.Collection("Pitch.Sections0");

// Orders = new Mongo.Collection("Pitch.Orders1")

Template.Items.helpers({
  items: function(){
    return StadiumItems.find({})
  }
})

var findSectionlatLng = function(name, rowId){
  section = Sections.findOne({name: name})
  var res = _.find(section.rows, function(row){
    return row.id == rowId
  })
  return res.latLng
}


Template.Items.events({
  "click button.place-order" (evt,instance){
    section = Session.get("currentSection")
    section.latLng = findSectionlatLng("field-level-110", 7)
    Orders.insert({
      name: "Jim",
      section: section,
      items: [{name: "Yankee Shirt", id: "45"}],
      status: "pending"})
    }
})
