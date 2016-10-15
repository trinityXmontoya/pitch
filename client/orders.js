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
    var markerA = _.find(Window.markers, function(a){
      return a.id == id
    })
    var z = markerA.marker
    var coords = [z.point.x, z.point.y]
    // console.log(markerA)
    map.removeLayer(markerA.marker)

    var circle = L.circle(coords, {
      color: "blue",
      radius: 5
    }).addTo(Window.map)


    Orders.update(id, {$set: {status: "delivered"}})
  }
})

var Window = {
  markers: []
}

var loadMap = function(){
  L.CRS.SeatGeek = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(0.36, 0, 0.36, 0)
  });

  var map = L.map("map", {
    crs: L.CRS.SeatGeek,
    center: [500,500],
    zoom: 2
  })
  Window.map = map

  L.tileLayer("https://seatgeek-tileserver.global.ssl.fastly.net/normal_350/214/{z}/{x}/{y}.png").addTo(map);
}

var addOrderMarkers = function(){
  orders = Orders.find({status: "pending"})
  orders.map(function(order){
    var section = order.section
    var coords = Window.map.project(section.latLng)
    var color = "orange"
    if (order.status == "accepted") {
      color = "#419C05"
    }
    var circle = L.circle([coords.x, coords.y], {
      color: color,
      radius: 5
    }).addTo(Window.map)
    popup = "<div>" +
            "Name: " + order.name + "<br>" +
            "Section: " + order.section.name + "<br>" +
            "Row: " + order.section.row + "<br>" +
            "Seat: " + order.section.seat +
            "</div>"
    circle.bindPopup(popup)
    console.log(order)
    Window.markers.push({id: order._id, marker: circle})
  })
}

Template.Orders.onRendered(function(){
  loadMap()
  addOrderMarkers()
})

// Template.Orders.onCreated(function () {
//   const orders = Meteor.subscribe("pending-orders")
//   if (orders.isReady()){
//     console.log("imreading")
//   }

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
