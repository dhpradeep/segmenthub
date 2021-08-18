import moment from "moment";
import { format } from "./constant";
import { generateFile } from "./generate";
import { makeCommit } from "./github";

import {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
} from "./segment";

const segmentAndWeekMap = {
  1: 3,
  2: 12,
  3: 21,
  4: 30,
};

const yearMethodMap = {
  0: zero,
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
  7: seven,
  8: eight,
  9: nine,
};

const getByAllYears = (fromDateString, toDateString) => {
  const dates = [];
  let fromDate = moment(fromDateString, "YYYY");
  let toDate = moment(toDateString, "YYYY");

  while (fromDate.format("YYYY") !== toDate.format("YYYY")) {
    dates.push(fromDate.format("YYYY"));
    fromDate = fromDate.add(1, "year");
  }
  dates.push(toDate.format("YYYY"));

  return dates
    .map((date) => {
      return getSegmentByDate(date);
    })
    .flat();
};

const getSegmentByDate = (dateString) => {
  const getDateForSegment = allSegmentAvailableDates(dateString);
  const year = moment(dateString, format).format("YYYY");
  const yearDigit = year.split("");
  const allYears = getDateForSegment.map((numberArray, index) => {
    return yearMethodMap[yearDigit[index]](numberArray);
  });
  return allYears.flat();
};

const allSegmentAvailableDates = (dateString) => {
  const result = Array(4)
    .fill()
    .map((_, index) => {
      return getSegmentStartWeek(dateString, index + 1);
    });
  return result;
};

const getSegmentStartWeek = (dateString, segmentIndex) => {
  const formattedDate = moment(dateString, format);
  const thirdWeekFirstDay = moment(formattedDate)
    .clone()
    .weeks(segmentAndWeekMap[segmentIndex])
    .startOf("week");
  const startDate = thirdWeekFirstDay.clone().startOf("week");
  const endDate = thirdWeekFirstDay.clone().add(49, "days");
  const dates = [];
  while (startDate.isBefore(endDate)) {
    dates.push(startDate.format(format));
    startDate.add(1, "days");
  }
  return dates;
};

export const callMethod = (user, repo, fromYear, toYear, commits) => {
  const commit = makeCommit(getByAllYears(fromYear, toYear), commits);
  generateFile(user, repo, [...new Set(commit)]);
};
