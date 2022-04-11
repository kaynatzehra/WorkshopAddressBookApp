const strigifyDate = (date) => {
    const options = {day:'numeric', month:'short', year:'numeric'};
    const newDate = !date ? "undefined": new Date(date).toLocaleDateString('en-GB', options);
    return newDate;
}

const checkName=(name)=>{
     let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z_ ]{2,}$')
    if(!nameRegex.test(name))
        throw "Name Is Incorrect!"
}
const Phonevalidation=(name)=>{
    let nameRegex=RegExp('^[0-9]{10}$')
   if(!nameRegex.test(name))
       throw "Phonenumber Is Incorrect!"
}
const checkStartDate=(startDate)=>{
    let currentDate = new Date();
    if (startDate > currentDate)
        throw "Start Date is a future date";
    const diff = Math.abs(currentDate.getTime() - startDate.getTime());
    if(diff / (1000*60*60*24) > 30){
        throw "Start Date is a beyond 30 days";
    }
}