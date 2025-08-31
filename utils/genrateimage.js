
import axios from "axios";
import "dotenv/config";

export const generateImage = async (prompt) => {
const payload={
    prompt
}
    try {
        const imageResponse = await axios.post(process.env.API_URL,payload , {
            headers: {
                "Api-Key": process.env.IMAGE_PIG_API_KEY,
                "Content-Type": "application/json"
            }
        });

        if (!imageResponse || imageResponse == null || imageResponse == "") {
            console.log("image not generated");
        }
        const validImageUrl = `data:image/png;base64,${imageResponse.data.image_data}`;
        console.log(validImageUrl);
        return validImageUrl
    } catch (error) {
        console.log(error);
        return null;
    }
}