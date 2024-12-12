const data = Array.from({ length: 10000 }, (_, i) => i + 1);

for (const [key, value] of Object.entries(process.memoryUsage())) {
  console.log(`Before Memory usage by ${key}, ${value / 1000000}MB`);
}

function calculate(val) {
  return val ** val * 10 * 5 * 20 * 30 * 15 * 112;
}

function processData(data) {
  const res = [];

  for (const item of data) {
    res.push(calculate(item));
  }

  return res;
}

function optimizedProcessData(data) {
  const cache = new WeakMap();
  if (!cache.has(data)) {
    cache.set(
      data,
      data.map((item) => calculate(item))
    );
  }
  return cache.get(data);
}

// processData(data);
optimizedProcessData(data);
// optimizedProcessData(data);

for (const [key, value] of Object.entries(process.memoryUsage())) {
  console.log(`Memory usage by ${key}, ${value / 1000000}MB`);
}
