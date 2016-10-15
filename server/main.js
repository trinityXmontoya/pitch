import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (StadiumItems.find().count() == 0){
    console.log("seeding items")
      Items.seedMerch()
      Items.seedBeer()
  }
  if (Sections.find().count() == 0){
    console.log("seeding sections")
    Section.seed()
  }
});
