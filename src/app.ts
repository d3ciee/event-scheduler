import express from "express"
import userRoutes from "./domains/user";
import logger from "./utils/logger";
import isAuthenticated from "./middleware/is-authenticated";
import path from "path"

const app = express()

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('pages/index');
});
const router = express.Router();

router.use("/api/user", userRoutes)
//router.use("/api/events", )

app.use(express.json())
app.use(isAuthenticated)
app.use(router)

app.use((err, req, res, next) => {
    res.status(500).send({status:"error", errors:['Something went wrong.  Please try again']});
    logger("internal_error", err)
  });


  
export default app;

declare global{
    namespace Express{
        interface Request {
            session?:Pick<import("./domains/user/models/user-session").TUserSession, "id">
            user?:Pick<import("./domains/user/models/user").TUser, "id">
        }
        interface Response{}
    }
}