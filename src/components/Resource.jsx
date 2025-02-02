import React from "react";
import Event from "./Event";
import dayjs from "dayjs";

const Resource = ({ resource, events, setEvents, deleteResource, addEvent, currentMonth }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{resource.name}</h3>
        <button className="text-red-500" onClick={() => deleteResource(resource.id)}>
          🗑 Delete
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 border p-2">
        {Array.from({ length: currentMonth.daysInMonth() }).map((_, index) => {
          const day = currentMonth.date(index + 1);
          return (
            <div
              key={index}
              className="p-4 border text-center cursor-pointer bg-gray-200 hover:bg-gray-300"
            >
              <div>{day.format("D")}</div>
              <button
                className="w-full mt-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => addEvent(resource.id, day)}
              >
                Add Event
              </button>
              {events
                .filter((event) => day.isSame(event.startDate, "day"))
                .map((event) => (
                  <Event key={event.id} event={event} setEvents={setEvents} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resource;
