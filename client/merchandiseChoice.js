function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

Template.merchandiseChoice.render = function(){
  Session.set("cartItems", [])
var slideIndex = 1;
showDivs(slideIndex);
}

StadiumItems = new Mongo.Collection("Pitch.Items0");
Sections = new Mongo.Collection("Pitch.Sections0");

// Orders = new Mongo.Collection("Pitch.Orders1")

Template.merchandiseChoice.helpers({
  beerItems: function(){
    return StadiumItems.find({type: "beer"}, {limit: 10})
  },
  merchItems: function(){
    return StadiumItems.find({type: "merch"}, {limit: 10})
  }
})

var findSectionlatLng = function(name, rowId){
  section = Sections.findOne({name: name})
  var res = _.find(section.rows, function(row){
    return row.id == rowId
  })
  return res.latLng
}


Template.merchandiseChoice.events({
  "click button.place-order" (evt,instance){
    section = Session.get("currentSection")
    section.latLng = findSectionlatLng("field-level-110", 7)
    Orders.insert({
      name: "Jim",
      section: section,
      items: [{name: "Yankee Shirt", id: "45"}],
      status: "pending"})
    },
   "click .add-to-cart" (evt,instance){
     id = $(evt.target)[0].dataset.id
     console.log(id)
     currentCart = Session.get("currentCart")
     Session.set("currentCart", currentCart.push(id))
   },
   "click .done" (evt,instance){
     FlowRouter.go("/delivery");
   }
})
