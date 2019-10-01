// Use RegExp
const defang = (ip) => ip.replace(/\./g, '[.]');

// Use for loop
// const defang = (ip) => {
//   let result = '';
//   for (let i = 0;i < ip.length;i++) {
//     if (ip[i] === '.') {
//       result += '[.]';
//     } else {
//       result += ip[i];
//     }
//   }
// }

// Use split
// const defang = (ip) => {
//   return ip.split('.').join('[.]');
// }

test('defang', () => {
  expect(defang('1.1.1.1')).toBe('1[.]1[.]1[.]1');
  expect(defang('255.100.50.0')).toBe('255[.]100[.]50[.]0');
});