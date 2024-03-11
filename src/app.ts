import express from "express"
import userRoutes from "./domains/user";
import logger from "./utils/logger";
const app = express()

const router = express.Router();

router.use("/api/user", userRoutes)

app.use(express.json())
app.use(router)

app.use((err, req, res, next) => {
    res.status(500).send({status:"error", errors:['Something went wrong.  Please try again']});
    logger("internal_error", err)
  });
  
export default app;