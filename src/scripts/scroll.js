$(() => {
  style = ": ";
  $(document).ready(function () {
    const player = $("#hero-player");
    const controls = $("#hero-player .controls");
    const container = $("#hero-container");

    $(window).on("scroll", (e) => {
      const value = window.scrollY;
      controls.css(
        "transform",
        `matrix(1, 0, 0, 1, ${1 * value * 0.7}, ${-1 * value * 0.4})`
      );

      if (value > 0) {
        player.css("clip-path", `inset(${value * 0.05}% round 8.62200px`);
      } else {
        player.css("clip-path", "");
      }
    });
  });
});
