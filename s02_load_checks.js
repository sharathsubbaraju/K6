import http from 'k6/http'
import { sleep, check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//Add load configurations (VUs and duration)
export const options = {
    vus: 5,
    duration: '10s'
};


// Store response
export default function () {
    const response = http.get('https://test.k6.io');
    sleep(1);
}






export function handleSummary(data) {
    return {
        "Report.html": htmlReport(data),

    }
}