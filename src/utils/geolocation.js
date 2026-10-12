/**
 * Geolocation Utility for Sadat Chicken Wholesale
 * Handles HTML5 Geolocation API requests to capture current customer coordinates
 * and formats Google Maps links for delivery logistics and WhatsApp ordering.
 */

/**
 * Accurately fetch user's current GPS coordinates with a configurable timeout.
 * @param {Object} options
 * @param {number} [options.timeout=5000] - Timeout in milliseconds
 * @param {boolean} [options.enableHighAccuracy=true] - Request high accuracy GPS
 * @param {number} [options.maximumAge=60000] - Cache age in milliseconds
 * @returns {Promise<{success: boolean, latitude?: number, longitude?: number, accuracy?: number, mapsUrl?: string, error?: string}>}
 */
export function getCurrentCoordinates(options = {}) {
  const timeout = options.timeout ?? 5000;
  const enableHighAccuracy = options.enableHighAccuracy ?? true;
  const maximumAge = options.maximumAge ?? 60000;

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      resolve({
        success: false,
        error: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    let isSettled = false;

    // Safety timeout in case browser hangs on prompt
    const timer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        resolve({
          success: false,
          error: 'Location request timed out.'
        });
      }
    }, timeout + 500);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isSettled) return;
        isSettled = true;
        clearTimeout(timer);

        const { latitude, longitude, accuracy } = position.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

        resolve({
          success: true,
          latitude,
          longitude,
          accuracy,
          mapsUrl
        });
      },
      (error) => {
        if (isSettled) return;
        isSettled = true;
        clearTimeout(timer);

        let errorMessage = 'Unable to fetch your current location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location access permission was denied.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location is currently unavailable on your device.';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location request timed out.';
        }

        resolve({
          success: false,
          error: errorMessage,
          code: error.code
        });
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge
      }
    );
  });
}
