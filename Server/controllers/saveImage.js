const Students = require('../models/Students');
const path = require("path");
const fs = require("fs");

const saveImage = async (req, res) => {
    const imageFolderPath = path.join(__dirname, '..', 'images'); // Adjust the path here

    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        // Check if the image folder exists
        if (!fs.existsSync(imageFolderPath)) {
            return res.status(500).json({ error: "Image folder does not exist." });
        }

        await Students.findById(req.user.id)
            .then(async ({ image }) => {
                if (image) {
                    const imagePath = path.join(imageFolderPath, image);
                    // Check if the image file exists before removing it
                    if (fs.existsSync(imagePath)) {
                        fs.rmSync(imagePath);
                    }
                }

                // Rename the file
                const userId = req.user.id;
                const newFileName = `${userId}.${req.file.originalname.split('.').pop()}`;
                const newPath = path.join(imageFolderPath, newFileName);

                fs.renameSync(req.file.path, newPath);

                await Students.updateOne({ _id: req.user.id }, { image: newFileName })
                    .then(({ modifiedCount }) => {
                        if (modifiedCount === 1) {
                            return res.status(200).json({ message: "Image uploaded successfully." });
                        } else {
                            return res.status(500).json({ message: "Error uploading image" });
                        }
                    });
            });

    } catch (error) {
        console.log(error);
        return res.status(400).send("Error uploading image.");
    }
}

module.exports = saveImage;
