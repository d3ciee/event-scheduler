import { z } from "zod";

const zTime = z.string().refine((t)=>{
    const timeParts = t.split(":")
    if (timeParts.length !==2) return false
    const [hours, minutes] = timeParts.map(Number)

    const validHours =  hours >=0 && hours <=23
    const validMinutes = minutes >=0 && minutes <= 59

    return validHours && validMinutes
},{
message:"Time has to be in the format hh:mm"
})

const createEventValidationSchema = z.object({
    title: z.string({required_error:"Event title is required"}).min(3,{message:"Event title should be at least 3 characters long"}).max(128, {message:"Event title should not be more than 128 characters long"}),
    description:z.string({required_error:"Event description is required"}).min(3,{message:"Event description should be at least 3 characters long"}).max(2056, {message:"Event description should not be more than 2056 characters long"}),
    date:z.string({required_error:"Date is required"}).refine((s)=>{
        const dateParts = s.split("-");
        if (dateParts.length !== 3) return false; 
        const [day, month, year] = dateParts.map(Number);
        
        const validDay = day >= 1 && day <= 31;
        const validMonth = month >= 1 && month <= 12;
        const validYear = year >= 0 && year <= 9999;
        return validDay && validMonth && validYear;
    }, {message:"Date has to be in the format dd-mm-yyyy"}).refine((s)=>
        new Date(s) > new Date(),{message:"Date has to greater than today's date"}
    ),

    time:zTime,
    duration:zTime,
}).refine((schema)=>{

    if (new Date(schema.date).getDate() === new Date().getDate() 
    && new Date(schema.date).getMonth() === new Date().getMonth()
    &&new Date(schema.date).getFullYear() === new Date().getFullYear()
    && new Date(`${schema.date} ${schema.time}`).getTime() < new Date().getTime()
    )
    return false
},{message:"Date and time should be greater than todays'"})

export {createEventValidationSchema} 