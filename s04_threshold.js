import http from 'k6/http';
import { sleep, check } from 'k6';

// Thresholds help automatically validate performance and correctness in CI/CD pipelines.
export const options = {
    vus: 10,
    duration: '15s',
    //To set pass/fail criteria (SLAs) for the test performance
    thresholds: {
        http_req_duration: ['p(95)<200'], //95% of requests must finish in less than 200 milliseconds
        http_req_failed: ['rate<0.01'],
        checks: ['rate > 0.95']
    }
}

export default function () {

    const response = http.get('http://test.k6.io');
    check(response, {
        'Verify status code is 200': (r) => r.status === 200,
    })
    sleep(1);
}