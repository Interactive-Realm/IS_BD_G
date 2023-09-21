// orientationLock.js
const lockScreenOrientation = () => {
  if (window.screen && window.screen.orientation) {
    const screenOrientation = window.screen.orientation as any; // Use type assertion as 'any'
    if (screenOrientation.lock) {
      screenOrientation.lock("portrait"); // Lock the orientation to portrait mode
    }
  }
};

export default lockScreenOrientation;

  