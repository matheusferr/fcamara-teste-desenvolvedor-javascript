export default function race(fn: Promise<any>, time: number) {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      // Autoclear
      clearTimeout(id);
      reject(new Error(`Function timed out in ${time}ms`));
    }, time);
  });

  return Promise.race([fn, timeout]);
}
