// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, enum: ["file"], required: true },
//   content: { type: String, default: "" }, 
// });

// const folderSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, enum: ["folder"], required: true },
//   children: { type: [mongoose.Schema.Types.Mixed], default: [] }, // Mixed allows both files and folders
// });

// const filesSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   structure: { type: [folderSchema], default: [] }, // Root-level folders
// });

// // Use `files` for the collection name and export the model
// const fileModel = mongoose.models.files || mongoose.model("files", filesSchema);

// export default fileModel;


// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, enum: ["file"], required: true },
//   content: { type: String, default: "" }, 
//   id: { type: String, default: uuidv4, unique: true }, // Unique ID for each file
// });

// const folderSchema = new mongoose.Schema({
//   id: { type: String, default: uuidv4, unique: true }, // Unique ID for each folder
//   name: { type: String, required: true },
//   type: { type: String, enum: ["folder"], required: true },
//   children: { type: [mongoose.Schema.Types.Mixed], default: [] }, // Mixed allows both files and folders
// });

// const filesSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   structure: { type: [folderSchema], default: [] }, // Root-level folders
// });

// // Use `files` for the collection name and export the model
// const fileModel = mongoose.models.files || mongoose.model("files", filesSchema);

// export default fileModel;

import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const fileSchema = new mongoose.Schema({
  email: { type: String, required: true}, // User association
  path: { type: String, required: true }, // Full path of the file (folder1/folder2/file.py)
  type: { type: String, required: true }, // File type
  content: { type: String, default: "" }, // File content
});

fileSchema.index({ email: 1 }, { unique: false });
fileSchema.index({ structure: 1 }, { unique: false });
// Use `files` as the collection name
const fileModel = mongoose.models.files || mongoose.model("files", fileSchema);

export default fileModel;

