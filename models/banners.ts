import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});


export const banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);