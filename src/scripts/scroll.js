$(() => {
  $(document).ready(function () {
    const DELTA = 0;
    const MOVING_FACTOR = 0.5;
    const SCALE_FACTOR = 0.1;

    const player = $("#hero-player");
    const controls = $("#hero-player .controls");
    const container = $("#hero-container");

    const startEffectYPosition = 0; // start effect at the top of the page
    const endEffectYPosition = 14 / SCALE_FACTOR; // end effect when inset scale reaches 14%

    function movePlayer(value) {
      const tx = 0;
      const ty = MOVING_FACTOR * value;
      player.css("transform", `matrix(1, 0, 0, 1, ${tx}, ${ty})`);
    }

    function cropPlayer(value) {
      const scale = value * SCALE_FACTOR;
      const tx = ((1 * scale) / 100) * player.width();
      const ty = ((-1 * scale) / 100) * player.height();

      controls.css("transform", `matrix(1, 0, 0, 1, ${tx}, ${ty})`);

      if (value > startEffectYPosition) {
        player.css("clip-path", `inset(${scale}% round ${value * 0.09}px`);
      } else {
        player.css("clip-path", "");
      }
    }

    let lastScrollTop = 0;
    $(window).on("scroll", (e) => {
      //translate controls as the window is scrolled
      const value = window.scrollY;

      var nowScrollTop = $(this).scrollTop();

      if (Math.abs(lastScrollTop - nowScrollTop) >= DELTA) {
        if (nowScrollTop > lastScrollTop) {
          // ACTION ON
          // SCROLLING DOWN
          if (value >= startEffectYPosition && value <= endEffectYPosition) {
            movePlayer(value);
            cropPlayer(value);
          }
        } else {
          // ACTION ON
          // SCROLLING UP
          if (value >= startEffectYPosition && value <= endEffectYPosition) {
            movePlayer(value);
            cropPlayer(value);
          }
        }
        lastScrollTop = nowScrollTop;
      }
    });
  });
});
