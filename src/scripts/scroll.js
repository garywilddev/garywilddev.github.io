$(() => {
  style = ": ";
  $(document).ready(function () {
    const player = $("#hero-player");
    const controls = $("#hero-player .controls");
    const container = $("#hero-container");

    $(window).on("scroll", (e) => {
      const value = window.scrollY;
      const scaleFactor = value * 0.05;
      const tx = ((1 * scaleFactor) / 100) * player.width();
      const ty = ((-1 * scaleFactor) / 100) * player.height();

      controls.css("transform", `matrix(1, 0, 0, 1, ${tx}, ${ty})`);

      if (value > 0) {
        player.css("clip-path", `inset(${scaleFactor}% round 8.62200px`);
      } else {
        player.css("clip-path", "");
      }
    });
  });
});
