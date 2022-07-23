/**
 * Sleep using a timeout
 * @param milliseconds number of milliseconds
 * @returns Resolved Promise
 */
export const sleep = async (milliseconds: number): Promise<any> => {
    try {
        console.log(`sleeping for ${milliseconds} milliseconds...`);
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    } catch (error) {
        console.log(error);
    }
};
