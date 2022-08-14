/**
 * Sleep using a timeout
 * @param {number} milliseconds number of milliseconds
 * @returns {Promise<void>} Promise
 */
export const sleep = async (milliseconds: number): Promise<void> => {
    try {
        console.log(`sleeping for ${milliseconds} milliseconds...`);
        return new Promise<void>((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Set Timeout Sleep Promise
 * @param {number} duration number of milliseconds
 * @returns Promise
 */
export function sleepPromise(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
};
