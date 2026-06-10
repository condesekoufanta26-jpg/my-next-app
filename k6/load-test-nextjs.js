import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// ─── Métriques personnalisées ───────────────────
const errorRate = new Rate('error_rate');
const loginDuration = new Trend('login_duration', true);
const productsDuration = new Trend('products_duration', true);
const orderDuration = new Trend('order_duration', true);
const correlationIdMissing = new Counter('correlation_id_missing');

// ─── Configuration de charge ────────────────────
export const options = {
  scenarios: {
    load_10: {
      executor: 'constant-vus',
      vus: 10,
      duration: '60s',
      startTime: '0s',
    },
    load_50: {
      executor: 'constant-vus',
      vus: 50,
      duration: '60s',
      startTime: '70s',
    },
    load_100: {
      executor: 'constant-vus',
      vus: 100,
      duration: '60s',
      startTime: '140s',
    },
    load_200: {
      executor: 'constant-vus',
      vus: 200,
      duration: '60s',
      startTime: '210s',
    },
    load_500: {
      executor: 'constant-vus',
      vus: 500,
      duration: '300s',
      startTime: '280s',
    },
  },
  thresholds: {
    'http_req_duration{endpoint:products}': ['p(95)<500'],
    'http_req_duration{endpoint:login}': ['p(95)<1000'],
    error_rate: ['rate<0.01'],
  },
};

const BASE_URL = 'http://localhost:3000';

const TEST_USERS = [
  { email: 'test1@bench.com', password: 'Bench1234!' },
  { email: 'test2@bench.com', password: 'Bench1234!' },
  { email: 'test3@bench.com', password: 'Bench1234!' },
  { email: 'test4@bench.com', password: 'Bench1234!' },
  { email: 'test5@bench.com', password: 'Bench1234!' },
];

export function setup() {
  for (const user of TEST_USERS) {
    http.post(
      `${BASE_URL}/api/auth/register`,
      JSON.stringify({
        email: user.email,
        password: user.password,
        name: `Bench User ${user.email}`,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  return { users: TEST_USERS };
}

export default function (data) {
  const user = data.users[__VU % data.users.length];

  // ── Étape 1 : Login ──────────────────────────
  const loginRes = http.post(
    `${BASE_URL}/api/auth/login`,
    JSON.stringify({ email: user.email, password: user.password }),
    {
      headers: { 'Content-Type': 'application/json' },
      tags: { endpoint: 'login' },
    }
  );

  loginDuration.add(loginRes.timings.duration);

  const loginOk = check(loginRes, {
    'login status 200/201': (r) => r.status === 200 || r.status === 201,
    'login has accessToken': (r) => {
      try {
        const body = JSON.parse(r.body);
        return !!body.data?.accessToken;
      } catch { return false; }
    },
    'login has correlationId': (r) => {
      const cid = r.headers['X-Correlation-Id'] || r.headers['x-correlation-id'];
      if (!cid) correlationIdMissing.add(1);
      return !!cid;
    },
  });

  errorRate.add(!loginOk);

  if (!loginOk) {
    sleep(1);
    return;
  }

  const token = JSON.parse(loginRes.body).data?.accessToken;
  const cookies = loginRes.cookies;

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  sleep(0.5);

  // ── Étape 2 : GET /products ──────────────────
  const productsRes = http.get(
    `${BASE_URL}/api/products?page=1&limit=20`,
    {
      headers: { 'Content-Type': 'application/json' },
      tags: { endpoint: 'products' },
    }
  );

  productsDuration.add(productsRes.timings.duration);

  const productsOk = check(productsRes, {
    'products status 200': (r) => r.status === 200,
    'products has data': (r) => {
      try {
        const body = JSON.parse(r.body);
        return !!body.data;
      } catch { return false; }
    },
    'products has correlationId': (r) => {
      const cid = r.headers['X-Correlation-Id'] || r.headers['x-correlation-id'];
      return !!cid;
    },
  });

  errorRate.add(!productsOk);

  sleep(0.5);

  // ── Étape 3 : GET /api/auth/me ───────────────
  const meRes = http.get(`${BASE_URL}/api/auth/me`, {
    headers: authHeaders,
    tags: { endpoint: 'me' },
  });

  check(meRes, {
    'me status 200': (r) => r.status === 200,
    'me has data': (r) => {
      try {
        return !!JSON.parse(r.body).data?.id;
      } catch { return false; }
    },
  });

  sleep(0.3);

  // ── Étape 4 : POST /api/cart ─────────────────
  const cartRes = http.post(
    `${BASE_URL}/api/cart`,
    JSON.stringify({ productId: 1, quantity: 1 }),
    {
      headers: authHeaders,
      tags: { endpoint: 'cart' },
    }
  );

  check(cartRes, {
    'cart status 200/201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(0.3);

  // ── Étape 5 : POST /api/orders ───────────────
  const orderRes = http.post(
    `${BASE_URL}/api/orders`,
    JSON.stringify({
      shippingAddress: '123 Rue Test, Paris',
      paymentMethod: 'card',
    }),
    {
      headers: authHeaders,
      tags: { endpoint: 'orders' },
    }
  );

  orderDuration.add(orderRes.timings.duration);

  check(orderRes, {
    'order status 200/201': (r) => r.status === 200 || r.status === 201,
  });

  errorRate.add(orderRes.status >= 500);

  sleep(1);
}

export function teardown() {
  console.log('Load test completed.');
}