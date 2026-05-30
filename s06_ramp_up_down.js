import http from 'k6/http';
import { sleep, check } from 'k6';


const BASE_URL = __ENV.BASE_URL || 'http://test.k6.io';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '10s', target: 20 },
        { duration: '5s', target: 20 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(95)<200'],
        http_req_failed: ['rate<=0.01'],
        checks: ['rate>=0.95']
    }
}

export default function () {
    const response = http.get(BASE_URL);
    check(response, {
        'Verify status code is 200': (r) => r.status === 200,
    });
    sleep(1);
}