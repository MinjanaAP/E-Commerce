const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

// image upload 
const uploadImage = require("./src/utils/uploadImage")

// all routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');
const orderRoutes = require('./src/orders/order.route');
const statsRouts = require('./src/stats/stats.route');
const contactRoutes = require('./src/Contact/contact.router');
const category = require('./src/categories/category.route'); 

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRouts);
app.use('/api/contact', contactRoutes);
app.use('/api/category', category);


main()
  .then(() => console.log("mongo db successfully conected."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Backend Server running on prot : ${port}`);
});
