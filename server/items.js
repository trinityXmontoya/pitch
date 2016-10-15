import cheerio from 'cheerio'

StadiumItems = new Mongo.Collection("Pitch.Items");

Items = {
  seed: function(){
    var url = "http://www.mlbshop.com/New_York_Yankees_Women"
    var html = HTTP.get(url).content
    $ = cheerio.load(html, {normalizeWhitespace: true})
    var products = $(".dlpProductsContainer li.ItemContainer")
    var results = _.map(_.first(products), function(product){
      var p = $(product)
      id = p.find(".priceContainerPrices").attr("data-productid")
      name = p.find(".BottomLink a span").text()
      img = p.find("img").attr("src")
      price = p.find(".price").text().trim()
      link = p.find(".browseProductLink").attr("href")
      return {id: id, name: name, img: img, price: price, link: link}
    })
    _.each(results, function(result){
      StadiumItems.insert(result)
    })
  }
}
