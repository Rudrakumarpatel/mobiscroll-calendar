import dayjs from "dayjs";

export const resourcesData = [
  { id: 1, name: "Resource A" },
  { id: 2, name: "Resource B" },
];

export const eventsData = [
  {
    id: 1,
    resourceId: 1,
    startDate: dayjs("2025-02-10T17:00:00"),
    endDate: dayjs("2025-02-13T11:00:00"),
    color: "hsl(210, 80%, 60%)",
  },
];
