import { z } from "zod";

const zTime =(m)=> z.string({required_error:m}).refine((t)=>{
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
        const [year, month,day] = dateParts.map(Number);
        
        const validDay = day >= 1 && day <= 31;
        const validMonth = month >= 1 && month <= 12;
        const validYear = year >= 0 && year <= 9999;
        return validDay && validMonth && validYear;
    }, {message:"Date has to be in the format yyyy-mm-dd"}),

    time:zTime("Event time is required"),
    duration:zTime("Event duration is required"),
}).refine((schema)=>new Date(`${schema.date} ${schema.time}`).getTime() > new Date().getTime()
    ,{message:"Date and time should be greater than todays'"})

    const updateEventValidationSchema = z.object({
        title: z.string({required_error:"Event title is required"}).min(3,{message:"Event title should be at least 3 characters long"}).max(128, {message:"Event title should not be more than 128 characters long"}).optional(),
        description:z.string({required_error:"Event description is required"}).min(3,{message:"Event description should be at least 3 characters long"}).max(2056, {message:"Event description should not be more than 2056 characters long"}).optional(),
        date:z.string({required_error:"Date is required"}).refine((s)=>{
            const dateParts = s.split("-");
            if (dateParts.length !== 3) return false; 
            const [year, month,day] = dateParts.map(Number);
            
            const validDay = day >= 1 && day <= 31;
            const validMonth = month >= 1 && month <= 12;
            const validYear = year >= 0 && year <= 9999;
            return validDay && validMonth && validYear;
        }, {message:"Date has to be in the format yyyy-mm-dd"}).optional(),
    
        time:zTime("Event time is required").optional(),
        duration:zTime("Event duration is required").optional(),
    })
    
    

export {createEventValidationSchema, updateEventValidationSchema} 