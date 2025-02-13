const mongoose = require("mongoose");

const conn = async () => {
    try {
        const response = await mongoose.connect
          ("mongodb+srv://rishiv1000:1221@taskmanager.xclgv.mongodb.net/?retryWrites=true&w=majority&appName=taskmanager");
        if (response) {
            console.log("Connected to DB");
        }
    } catch (error) {
        console.log(error);
    }
};
conn();
