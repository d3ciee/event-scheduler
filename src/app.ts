import express from "express"
import userRoutes from "./domains/user";
import logger from "./utils/logger";
import isAuthenticated from "./middleware/is-authenticated";
import path from "path"
import eventRoutes from "./domains/event";
import cookieParser from "cookie-parser"
import db from "./config/db";

const app = express()

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");


const router = express.Router();

router.use("/api/user", userRoutes)
router.use("/api/events", eventRoutes)

app.use(cookieParser())
app.use(express.json())
app.use(isAuthenticated)
app.use(router)

function getEvents(year: number, month: number): Array<Array<{ date: number; dayOfWeek: number | null }>> {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysArray: Array<Array<{ date: number; dayOfWeek: number | null }>> = [[]];
    let currentWeek = 0;

    // Initialize days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        daysArray[currentWeek].push({ date: null, dayOfWeek: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

        daysArray[currentWeek].push({ date:date.getDate(), dayOfWeek:date.getDay() });

        if (dayOfWeek === 'Saturday') {
            // Start a new week
            currentWeek++;
            daysArray.push([]);
        }
    }

    // Fill remaining days in the last week
    while (daysArray[currentWeek].length < 7) {
        daysArray[currentWeek].push({ date: null, dayOfWeek: null });
    }

    return daysArray;
}

function getNextMonth(year: number, month: number): string {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    return `?month=${nextYear}-${nextMonth}`;
}

function getPreviousMonth(year: number, month: number):  string {
    const previousMonth = month === 1 ? 12 : month - 1;
    const previousYear = month === 1 ? year-1 : year;

    return `?month=${previousYear}-${previousMonth}`;
}

app.get('/', (req, res) => {

    const today = new Date()
    let [year, month] = req.query.month?.toString().split("-").map(Number) ?? [today.getFullYear(),today.getMonth()]
    
    if(month > 12 || month < 0) month = today.getMonth()
    if(year < 1000 || year >9999) year = today.getFullYear()


    const events = getEvents(year,month);
    res.render('pages/index',{
        events,
        year, 
        month:(new Date(2000, month,1).toLocaleString('en-US',{month:"long"}) ),
        nextMonthLink:getNextMonth(year, month),
        previousMonthLink:getPreviousMonth(year,month) 
    }
  
        )

})
app.get('/user/:auth', (req, res) => {
    if(req.user) return res.redirect("/")
    if(!["register", "login"].includes(req.params.auth)) return res.status(404).render("pages/error/4xx")
    res.render('pages/user/auth',{auth:req.params.auth.toLocaleUpperCase()[0] + req.params.auth.slice(1) });
});




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