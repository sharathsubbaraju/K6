import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


const BASE_URL = __ENV.BASE_URL || 'http://test.k6.io.';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '10s', target: 15 },
        { duration: '5s', target: 15 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95) < 200'],
        http_req_failed: ['rate<=0.01'],
        checks: ['rate>=0.95']
    }

}

export default function () {

    group('Open home page', () => {
        const response = http.get(BASE_URL);
        check(response, {
            'Verify status code of home page 200': (r) => r.status === 200,
        });
    });

    sleep(1);

    group('Open News page', () => {
        const response = http.get(`${BASE_URL}/news.php`);
        check(response, {
            'News page loaded': (r) => r.status === 200,
        });
    });

    sleep(1);

    group('Open Blog page', () => {
        const response = http.get(`${BASE_URL}/blog`);
        check(response, {
            'Blog page loaded': (r) => r.status === 200,
        });
    })


}

export function handleSummary(data) {
    return {
        'Report.html': htmlReport(data),
    }
} 