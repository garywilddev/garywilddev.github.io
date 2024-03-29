$(() => {
  $(document).ready(function () {
    const media = $("#hero-video");
    const controls = $("#hero-player .controls");

    const play = $("#play");
    media.removeAttr("controls");
    controls.css("visibility", "visible");

    play.bind("click", playPauseMedia);

    function playPauseMedia() {
      $("#play").each((_, button) => {
        $(button).toggleClass("fa-circle-play");
        $(button).toggleClass("fa-circle-pause");
      });
      if (media[0].paused) {
        media[0].play();
      } else {
        media[0].pause();
      }
    }
  });
});
