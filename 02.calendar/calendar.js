import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { program } from "commander";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

program
  .option("-y, --year <type>", "specify the year")
  .option("-m, --month <type>", "specify the month");
program.parse(process.argv);
const options = program.opts();

let calendarInfo = {
  year: dayjs().tz().year(),
  month: dayjs().tz().month(),
};

if (options.year) {
  calendarInfo.year = parseInt(options.year);
}
if (options.month) {
  calendarInfo.month = parseInt(options.month - 1);
}

console.log(`      ${calendarInfo.month + 1}月 ${calendarInfo.year}`);
const wdays = ["日", "月", "火", "水", "木", "金", "土"].join(" ");
console.log(wdays);

const firstDate = dayjs(new Date(calendarInfo.year, calendarInfo.month)).set(
  "date",
  1
);
const endDate = dayjs(new Date(calendarInfo.year, calendarInfo.month)).endOf(
  "month"
);

function getDates(firstDate, endDate) {
  const dates = [];
  let currentDate = dayjs(firstDate);

  while (currentDate <= dayjs(endDate)) {
    dates.push(dayjs(currentDate));
    currentDate = currentDate.set("date", currentDate.date() + 1);
  }
  return dates;
}
const dates = getDates(firstDate, endDate);

function addLeadingSpacesToFirstDay(dayOfWeek) {
  const spaces = "   ".repeat(dayOfWeek);
  return spaces;
}

function padStartWithSpace(date) {
  return date.$D.toString().padStart(2, " ");
}

function formatCalendar() {
  dates.forEach(function (date, index) {
    if (index === 0) {
      const spaces = addLeadingSpacesToFirstDay(dates[0].$W);
      process.stdout.write(`${spaces}`);
    }
    if (date.$W === 6) {
      process.stdout.write(`${padStartWithSpace(date)} \n`);
    } else {
      process.stdout.write(`${padStartWithSpace(date)} `);
    }
  });
}
formatCalendar();
