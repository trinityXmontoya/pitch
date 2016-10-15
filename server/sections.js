Sections = new Mongo.Collection("Pitch.Sections0");

Section = {
  seed: function(){
    var url = "https://seatgeek-tileserver.global.ssl.fastly.net/maps_json/normal_350/v8-15-40.json"
    var sections = HTTP.get(url).data["sections"]
    _.each(sections, function(val, key){
      var rows = _.map(val["rows"], function(rowInfo, rowId){
        return {id: rowId, latLng: rowInfo.center}
      })
      // shouldve structured this for rows to be own unit so latLngs were more easily queryable but w/e
      Sections.insert({
        name: key,
        rows: rows
      })
    })
  }
}
