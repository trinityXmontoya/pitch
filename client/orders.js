Orders = new Mongo.Collection("Pitch.Orders1")

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

var Window = {}

var loadMap = function(){
  L.CRS.SeatGeek = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(0.36, 0, 0.36, 0)
  });

  var map = L.map("map", {
    crs: L.CRS.SeatGeek,
    center: [500,500],
    zoom: 1
  })
  Window.map = map

  L.tileLayer("https://seatgeek-tileserver.global.ssl.fastly.net/normal_350/214/{z}/{x}/{y}.png").addTo(map);
}

var addOrderMarkers = function(){
  orders = Orders.find({status: "pending"})
  orders.map(function(order){
    var section = order.section
    var coords = Window.map.project(section.latLng)
    var circle = L.circle([coords.x, coords.y], {
      color: "red",
      radius: 5
    }).addTo(Window.map)
    popup = "<div>" +
            "Name: " + order.name + "<br>" +
            "Section: " + order.section.name + "<br>" +
            "Row: " + order.section.row + "<br>" +
            "Seat: " + order.section.seat +
            "</div>"
    circle.bindPopup(popup)
  })
}

Template.Orders.onRendered(function(){
  loadMap()
  addOrderMarkers()

})

// Template.Orders.onCreated(function () {
//   // var self = this;
//   //
//   // self.autorun(function () {
//   //   const orders = self.subscribe('pending-orders');
//   //
//   //   if (orders.isReady()) {
//   //       const orderValues = Orders.find().fetch()
//   //       addOrderMarkers()
//   //       // if (!!orderValues.length) {
//   //       //     orderValues.map(item => {
//   //       //       //
//   //       //     });
//   //       // }
//   //   }
//   // });
//   addOrderMarkers()
// });
