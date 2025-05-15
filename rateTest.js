const fetch = require('node-fetch');

const variables = {
  email: "shubhamkale008@gmail.com",
  password: "root"
};

(async () => {
  for (let i = 1; i <= 10; i++) {
    const res = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables)
    });

    const data = await res.json();
    console.log(`Request ${i}:`, res.status, data);
  }
})();
