export const useAntiSpam = (timeOutMs: number, message: string) => {
    let ready = false;

    function isReady() {
        return ready
    }

    setTimeout(() => ready = true, timeOutMs)

    return {
        isReady,
        message
    }
}