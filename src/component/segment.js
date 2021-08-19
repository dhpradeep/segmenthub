import moment from "moment";
import { format } from "./constant";

const a = (data) => {
  return [
    moment(data[0], "YYYY-MM-DD").format(format),
    moment(data[7], "YYYY-MM-DD").format(format),
    moment(data[14], "YYYY-MM-DD").format(format),
    moment(data[21], "YYYY-MM-DD").format(format),
    moment(data[28], "YYYY-MM-DD").format(format),
    moment(data[35], "YYYY-MM-DD").format(format),
    moment(data[42], "YYYY-MM-DD").format(format),
  ];
};

const b = (data) => {
  return [
    moment(data[42], "YYYY-MM-DD").format(format),
    moment(data[43], "YYYY-MM-DD").format(format),
    moment(data[44], "YYYY-MM-DD").format(format),
  ];
};

const c = (data) => {
  return [
    moment(data[46], "YYYY-MM-DD").format(format),
    moment(data[47], "YYYY-MM-DD").format(format),
    moment(data[48], "YYYY-MM-DD").format(format),
  ];
};

const d = (data) => {
  return [
    moment(data[6], "YYYY-MM-DD").format(format),
    moment(data[13], "YYYY-MM-DD").format(format),
    moment(data[20], "YYYY-MM-DD").format(format),
    moment(data[27], "YYYY-MM-DD").format(format),
    moment(data[34], "YYYY-MM-DD").format(format),
    moment(data[41], "YYYY-MM-DD").format(format),
    moment(data[48], "YYYY-MM-DD").format(format),
  ];
};

const e = (data) => {
  return [
    moment(data[4], "YYYY-MM-DD").format(format),
    moment(data[5], "YYYY-MM-DD").format(format),
    moment(data[6], "YYYY-MM-DD").format(format),
  ];
};

const f = (data) => {
  return [
    moment(data[0], "YYYY-MM-DD").format(format),
    moment(data[1], "YYYY-MM-DD").format(format),
    moment(data[2], "YYYY-MM-DD").format(format),
  ];
};

const g = (data) => {
  return [
    moment(data[3], "YYYY-MM-DD").format(format),
    moment(data[10], "YYYY-MM-DD").format(format),
    moment(data[17], "YYYY-MM-DD").format(format),
    moment(data[24], "YYYY-MM-DD").format(format),
    moment(data[31], "YYYY-MM-DD").format(format),
    moment(data[38], "YYYY-MM-DD").format(format),
    moment(data[45], "YYYY-MM-DD").format(format),
  ];
};

const zero = (data) => [
  ...new Set([
    ...a(data),
    ...b(data),
    moment(data[45], "YYYY-MM-DD").format(format),
    ...c(data),
    ...d(data),
    ...e(data),
    moment(data[3], "YYYY-MM-DD").format(format),
    ...f(data),
  ]),
];

const one = (data) => [
  ...new Set([
    ...b(data),
    moment(data[45], "YYYY-MM-DD").format(format),
    ...c(data),
  ]),
];

const two = (data) => [
  ...new Set([...a(data), ...b(data), ...d(data), ...e(data), ...g(data)]),
];

const three = (data) => [
  ...new Set([...a(data), ...b(data), ...c(data), ...d(data), ...g(data)]),
];

const four = (data) => [
  ...new Set([...b(data), ...c(data), ...f(data), ...g(data)]),
];
const five = (data) => [
  ...new Set([...a(data), ...c(data), ...d(data), ...f(data), ...g(data)]),
];
const six = (data) => [
  ...new Set([
    ...a(data),
    ...c(data),
    ...d(data),
    ...e(data),
    ...f(data),
    ...g(data),
  ]),
];

const seven = (data) => [
  ...new Set([
    ...a(data),
    ...b(data),
    moment(data[45], "YYYY-MM-DD").format(format),
    ...c(data),
  ]),
];

const eight = (data) => [
  ...new Set([
    ...a(data),
    ...b(data),
    moment(data[45], "YYYY-MM-DD").format(format),
    ...c(data),
    ...d(data),
    ...e(data),
    ...f(data),
    ...g(data),
  ]),
];

const nine = (data) => [
  ...new Set([
    ...a(data),
    ...b(data),
    ...c(data),
    ...d(data),
    ...f(data),
    ...g(data),
  ]),
];

export { zero, one, two, three, four, five, six, seven, eight, nine };
