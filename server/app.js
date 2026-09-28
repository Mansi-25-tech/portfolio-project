const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/connectDB");
const web = require("./routes/web");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// CORS
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://cheery-sorbet-0eb6c3.netlify.app"
        ],
        credentials: true
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true
    })
);

// Routes
app.use("/api", web);

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });