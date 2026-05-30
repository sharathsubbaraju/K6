import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


const BASE_URL = __ENV.BASE_URL || 'http://test.k6.io';


const TRAFFIC_SPLIT = {
    home: 0.6,
    news: 0.2,
    blog: 0.2,
};

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '15s', target: 20 },
        { duration: '10s', target: 20 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<250'],
        http_req_failed: ['rate<0.02'],
        checks: ['rate>0.95'],
    }
};


export default function () {
    const random = Math.random();
    if (random < TRAFFIC_SPLIT.home) {
        group('Open Home page', () => {
            const response = http.get(BASE_URL);
            check(response, {
                'Verify status code is 200': (r) => r.status === 200,
            });
        });

        sleep(1);
    } else if (random < TRAFFIC_SPLIT.home + TRAFFIC_SPLIT.news) {
        group('Open News page', () => {
            const response = http.get(`${BASE_URL}/news.php`);
            check(response, {
                'News Loaded': (r) => r.status === 200,
            });
        });

        sleep(1);
    } else {

        group('Open Blog page', () => {
            const response = http.get(`${BASE_URL}/blog.php`);
            check(response, {
                'Blog Loaded': (r) => r.ststus === 200,
            });
        });
        sleep(1)
    }
}


export function handleSummary(data) {
    const pad = (n) => String(n).padStart(2, '0');
    const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const ts = `${ist.getFullYear()}-${pad(ist.getMonth() + 1)}-${pad(ist.getDate())}_${pad(ist.getHours())}-${pad(ist.getMinutes())}-${pad(ist.getSeconds())}`;

    return { [`report-${ts}.html`]: htmlReport(data) };
}