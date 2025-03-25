export const getPermissions = async () =>
  await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    })
    .catch(() => {});
