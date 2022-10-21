const ApiHandler = async (url, header, resMsg = null) => {
    try {
        const response = await fetch(url, header);
        if (!response.ok) throw Error("Failed to communicate with API")
    } catch (err) {
        resMsg = err.message;
    } finally {
        return resMsg;
    }
}

export default ApiHandler