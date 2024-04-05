$(() => {
  const videoURL = "./assets/videos/swell_frag.mp4";
  const mediaType = 'video/mp4; codecs="avc1.64001f"';
  const video = document.querySelector("#hero-video");

  /** Fetch a video or an audio segment, and returns it as an ArrayBuffer, in a
   * Promise.
   * @param {string} url
   * @returns {Promise.<ArrayBuffer>}
   */
  async function fetchSegment(url) {
    const response = await fetch(url);
    return response.arrayBuffer();
  }

  if (!MediaSource.isTypeSupported(mediaType)) {
    return console.log("Media type is not supported.");
  }
  /*creating the MediaSource, just with the "new" keyword, and the URL for it*/
  const mediaSource = new MediaSource();

  const source = document.createElement("source");
  /*Create URL from MediaSource*/
  source.src = URL.createObjectURL(mediaSource);
  source.type = "video/mp4";

  video.appendChild(source);

  async function sourceOpen() {
    /*1. add source buffers*/
    const videoSourceBuffer = mediaSource.addSourceBuffer(mediaType);

    /*2. download and add our video to the SourceBuffers */
    const videoSegment = await fetchSegment(videoURL);
    videoSourceBuffer.addEventListener("updateend", () => {
      mediaSource.endOfStream();
      video.play();
    });
    videoSourceBuffer.appendBuffer(videoSegment);
  }

  mediaSource.addEventListener("sourceopen", sourceOpen);

  /*attaching the MediaSource to the video tag*/
  video.src = URL.createObjectURL(mediaSource);
});
