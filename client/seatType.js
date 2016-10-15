var formatName = function(name){
    _.lowerCase(_.replace(name, " ", "-"))
}

Template.seatType.events({
  "submit form#seat-info-form" (evt,instance){
    evt.preventDefault()
    form = evt.target
    section = {
      name: formatName(form.name.value),
      row: form.row.value,
      seat: form.seat.value,
    }
    Session.set("currentSection", section)
    FlowRouter.go("/choices");
  }
})
