import fileModel from "../models/fileModel.js";

export const getfiles = async(req, res)=>{
    const {email} = req.body;
    if(!email){
        return res.json({success: false})
    }
    try{
        const file = await fileModel.find({email});
        console.log(email)
        return res.json({success: true, structure: file})
    }catch(error){
        return res.json({success: false, message: error.message})
    }
}
export const writefile = async (req, res) => {
    try {
        const { item } = req.body;
        
        if (!item || !item._id) {
            return res.status(400).json({ success: false, message: "Invalid item data" });
        }

        const file = await fileModel.findOne({ _id: item._id });

        if (!file) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        file.content = item.content;
        await file.save();

        console.log("File updated successfully");
        return res.json({ success: true, message: "File updated successfully" });

    } catch (error) {
        console.error("Error updating file:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const readfile = async(req, res)=>{
    try {
        const { _id } = req.body;
        
        if (!item._id) {
            return res.status(400).json({ success: false, message: "Invalid item data" });
        }
    
        const file = await fileModel.findOne({ _id });
    
        if (!file) {
            return res.status(404).json({ success: false, message: "File not found" });
        }
    
        return res.json({ success: true, filee: file });
 
    } catch (error) {
        console.error("Error updating file:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
    
}
