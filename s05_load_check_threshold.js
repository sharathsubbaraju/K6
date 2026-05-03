import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const BASE_URL = __ENV.BASE_URL || 'http://test.k6.io';

export const options = {
    vus: 10,
    duration: '15s',
    threshold: {
        http_req_duration: ['p(95)< 200'],
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.95']
    }
}

export default function () {
    const response = http.get(BASE_URL);
    check(response, {
        'Verify status code is 200': (r) => r.status === 200
    })
    sleep(1);
}

export function handleSummary(data) {
    const pad = (n) => String(n).padStart(2, '0');
    const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const ts = `${ist.getFullYear()}-${pad(ist.getMonth() + 1)}-${pad(ist.getDate())}_${pad(ist.getHours())}-${pad(ist.getMinutes())}-${pad(ist.getSeconds())}`;

    return { [`report-${ts}.html`]: htmlReport(data) };
}