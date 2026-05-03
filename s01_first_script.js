/*
Command to run from CLI: by passing num of VUs and duration of test
k6 run .\first_script.js --vus 5 --duration 10s 
*/


import http from 'k6/http'
import {sleep} from 'k6'
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default function (){
    http.get('https://test.k6.io');
    sleep(1);


}

/*
export function handleSummary(data) {
    const pad = (n) => String(n).padStart(2, '0');
    const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const ts = `${ist.getFullYear()}-${pad(ist.getMonth() + 1)}-${pad(ist.getDate())}_${pad(ist.getHours())}-${pad(ist.getMinutes())}-${pad(ist.getSeconds())}`;
    
    return { [`report-${ts}.html`]: htmlReport(data) };
}
*/

export function handleSummary(data){
    return{
        "Report.html": htmlReport(data),
    }
}

