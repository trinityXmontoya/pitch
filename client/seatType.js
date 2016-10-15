var formatName = function(name){
    return _.replace(_.lowerCase(name), "", "-")
}

Template.seatType.events({
  "submit form#seat-info-form" (evt,instance){
    evt.preventDefault()
    form = evt.target
    console.log(formatName(form.name.value))
    section = {
      name: "field-level-112",
      row: form.row.value,
      seat: form.seat.value,
    }
    Session.set("currentSection", section)
    FlowRouter.go("/choices");
  }
})
