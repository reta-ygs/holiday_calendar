const HOLIDAY_CALENDAR = 'HOLIDAY_CALENDAR';

function doGet(e) {
  const parameter = e.parameter;
  const year = Number(parameter.year);
  const month = Number(parameter.month);

  const from = new Date(year, month - 1);
  const to = new Date(year, month, 0);

  const calendar = getHolidayCalendar();
  const events = calendar.getEvents(from, to)
    .map(e => ({
      title: e.getTitle(),
      month: e.getStartTime().getMonth() + 1,
      date: e.getStartTime().getDate(),
    }));

  return response(events);
}

function response(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getHolidayCalendar() {
  const properties = PropertiesService.getScriptProperties();
  const calendarId = properties.getProperty(HOLIDAY_CALENDAR);
  return CalendarApp.getCalendarById(calendarId);
}
