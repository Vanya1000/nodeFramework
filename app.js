import {} from "dotenv/config";
import Application from "./framework/Application.js";
import usersRouter from "./src/users-router.js";
import middlewareJsonParser from "./framework/middlewares/parseJson.js";
import middlewareBodyParser from "./framework/middlewares/bodyParser.js";
import middlwareParseUrl from "./framework/middlewares/parseUrl.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(middlewareBodyParser);
app.use(middlewareJsonParser);
app.use(middlwareParseUrl(process.env.BASE_URL));

app.addRouter(usersRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
