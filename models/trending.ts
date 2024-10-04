import mongoose from "mongoose";

const trendingSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
        required: true,
    }

});


export const Trending = mongoose.models.Trending || mongoose.model("Trending", trendingSchema);