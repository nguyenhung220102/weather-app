import axios from "axios";

async function fetcher({
    method = "GET",
    url,
    body = "",
    data_return = false,
}) {
    try {
        const response = await axios(
            process.env.NEXT_PUBLIC_BACKEND_URL + url,
            {
                method: method,
                data: body || undefined,
            }
        );
        if (data_return) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch data", { cause: error });
    }
}

export default fetcher;
