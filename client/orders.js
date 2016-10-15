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


var loadMap = function(){
  L.CRS.SeatGeek = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(0.36, 0, 0.36, 0)
  });

  var map = L.map("map", {
    crs: L.CRS.SeatGeek,
    center: [500,500],
    zoom: 1
  })

  var c = map.project([670.357, 601.736])
  var b = map.project([254.437, 655.463])

  L.circle([c.x, c.y], {
    color: "red",
    radius: 5,
    // fillColor: "",
    // fillOpacity: ""
  }).addTo(map)

  L.circle([b.x, b.y], {
    color: "red",
    radius: 5
  }).addTo(map)

  L.tileLayer("https://seatgeek-tileserver.global.ssl.fastly.net/normal_350/214/{z}/{x}/{y}.png").addTo(map);
}

Template.Orders.onRendered(function(){
  loadMap()
})
