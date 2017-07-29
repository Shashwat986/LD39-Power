Crafty.scene('main', function () {
  var small_sprite = Crafty.e("2D, Canvas, player_sprite")
    .attr({x: 10, y: 10, w: 32, h: 32});
});

Crafty.scene('start', function () {
  Crafty.e("2D, Canvas, player_sprite")
    .attr({x: 0, y: 0, w: 320, h: 320});

  Crafty.e("2D, Canvas, Text")
    .attr({x: 350, y: 0})
    .text("Battery Pack")
    .textFont('size', '36px');

  Crafty.e("2D, DOM, Text") // Using DOM because that has word-wrap
    .attr({x: 350, y: 50, w: 300})
    .text(
      "Leon is stranded on the planet Jupiter! " +
      "His battery has very limited power, and he can't travel without his jetpack." +
      "<p></p>" +
      "Help him get to each level's transporter without running out of battery. " +
      "There are lots of charging points that can be used to fill your battery, " +
      "but beware the evil Jovians who will try to eat Leon!"
    )
    .textFont('size', '18px');
});
