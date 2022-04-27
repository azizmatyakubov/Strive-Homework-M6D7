import mongoose from "mongoose";

const {Schema, model} = mongoose

const blogSchema = new Schema(
    {
        category: {type: String, required: true},
	    title: {type: String, required: true},
	    cover: {type: String, required: true},
	    readTime: {
	      value: {type: Number, required: true},
	      unit: {type: String, required: true}
	    },
	    author: {
	      name: {type: String},
	      avatar:{type: String}
	    },
	    content: {type: String},
        comments: [{content: String, rating: Number, date: Date}]
	          
    },
    {
        timestamps: true
    }
)



export default model("Blog", blogSchema) 