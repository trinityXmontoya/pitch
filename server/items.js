import cheerio from 'cheerio'

StadiumItems = new Mongo.Collection("Pitch.Items");

Items = {
  seed: function(){
    var url = "http://www.mlbshop.com/New_York_Yankees_Women"
    var html = HTTP.get(url).content
    $ = cheerio.load(html, {normalizeWhitespace: true})
    var products = $(".dlpProductsContainer li.ItemContainer")
    var results = _.map(products, function(product){
      var p = $(product)
      id = p.find(".priceContainerPrices").attr("data-productid")
      name = p.find(".BottomLink a span").text()
      img = p.find("img").attr("src")
      price = p.find(".price").text().trim()
      link = p.find(".browseProductLink").attr("href")
      return {pid: id, name: name, img: img, price: price, link: link}
    })
    _.each(results, function(result){
      StadiumItems.insert(result)
    })
  },
  locations: function(){
    var url = "http://newyork.yankees.mlb.com/gdcross/components/game/mlb/mobile/ballpark/iphone/config/nyy_map.json"
    var levels = HTTP.get(url).data["Yankee Stadium"]["Levels"]
    var results =
    _.flatten(
      _.map(levels, function(level){
        return _.map(level["Places"], function(place){
          return {id: place.ID,
                  location: place.Location,
                   name: place.Name,
                   section: place.Section,
                   subType: place.SubType,
                   type: place.Type,
                   keywords: place.keywords}
        })
      })
    )
  }
}
