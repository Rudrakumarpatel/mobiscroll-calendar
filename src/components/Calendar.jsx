import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Resource from "./Resource";

const Calendar = () => {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedResources) setResources(storedResources);
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("events", JSON.stringify(events));
  }, [resources, events]);

  const addResource = () => {
    const newResource = {
      id: resources.length + 1,
      name: `Resource ${resources.length + 1}`,
    };
    setResources([...resources, newResource]);
  };

  const deleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
    setEvents(events.filter((event) => event.resourceId !== id));
  };

  const addEvent = (resourceId, date) => {
    const newEvent = {
      id: Date.now(),
      resourceId,
      startDate: dayjs(date).set("hour", 10).set("minute", 0), // Set default start time to 10 AM
      endDate: dayjs(date).set("hour", 16).set("minute", 0),  // Set default end time to 4 PM
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    };
    setEvents([...events, newEvent]);
  };

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={prevMonth}>
          ← Prev
        </button>
        <h2 className="text-xl font-semibold">{currentMonth.format("MMMM YYYY")}</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={nextMonth}>
          Next →
        </button>
      </header>

      <button className="px-4 py-2 bg-green-500 text-white rounded mb-4" onClick={addResource}>
        Add Resource
      </button>

      <div className="space-y-4">
        {resources.map((resource) => (
          <Resource
            key={resource.id}
            resource={resource}
            events={events}
            setEvents={setEvents}
            deleteResource={deleteResource}
            addEvent={addEvent}
            currentMonth={currentMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
