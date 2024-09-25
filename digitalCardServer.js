const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routerAuth = require("./routers/auth");
const routerCustomers = require("./routers/customers");
const routerSocialMedias = require("./routers/socialMedias");
const path = require("path");

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static("uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    const indexPath = path.join(__dirname, "./dist/index.html");
    res.sendFile(indexPath);
  } else {
    next();
  }
});

app.use('/hello', (req, res) => res.send('world'))

app.use("/api/auth", routerAuth);
app.use("/api/customers", routerCustomers);
app.use("/api/medias", routerSocialMedias);

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
