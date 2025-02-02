import React, { useState } from "react";
import dayjs from "dayjs";

const Event = ({ event, setEvents }) => {
  const [draggingStart, setDraggingStart] = useState(false);
  const [draggingEnd, setDraggingEnd] = useState(false);
  const [startX, setStartX] = useState(null);

  // Start resizing the event (either left or right edge)
  const handleResizeStart = (e, type) => {
    e.preventDefault();
    setStartX(e.clientX);
    if (type === "start") {
      setDraggingStart(true);
    } else if (type === "end") {
      setDraggingEnd(true);
    }
  };

  // Track the mouse movement to update event start and end times
  const handleMouseMove = (e) => {
    if (draggingStart || draggingEnd) {
      const diff = (e.clientX - startX) * 0.2; // Increased sensitivity for smoother resizing
      
      if (draggingStart) {
        // Shrink event (move start time left)
        const newStartDate = event.startDate.add(diff, "minute");
        if (newStartDate.isBefore(event.endDate)) {
          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e.id === event.id ? { ...e, startDate: newStartDate } : e
            )
          );
        }
      } else if (draggingEnd) {
        // Grow event (move end time right)
        const newEndDate = event.endDate.add(diff, "minute");

        // Ensure that the new end date is always after the start date
        if (newEndDate.isAfter(event.startDate)) {
          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e.id === event.id ? { ...e, endDate: newEndDate } : e
            )
          );
        }
      }
    }
  };

  const handleResizeEnd = () => {
    setDraggingStart(false);
    setDraggingEnd(false);
    setStartX(null);
  };

  const deleteEvent = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    }
  };

  // Handle double-click for growing/shrinking
  const handleDoubleClick = (e) => {
    e.preventDefault();
    const eventRect = e.target.getBoundingClientRect();
    const mouseX = e.clientX;

    // Determine if double-click is on the left or right side of the event
    if (mouseX < eventRect.left + eventRect.width / 2) {
      // Left side double-click (shrink by 15 minutes)
      const newStartDate = event.startDate.subtract(15, "minute");
      if (newStartDate.isBefore(event.endDate)) {
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.id === event.id ? { ...e, startDate: newStartDate } : e
          )
        );
      }
    } else {
      // Right side double-click (grow by 15 minutes)
      const newEndDate = event.endDate.add(15, "minute");
      if (newEndDate.isAfter(event.startDate)) {
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.id === event.id ? { ...e, endDate: newEndDate } : e
          )
        );
      }
    }
  };

  // Calculate event width based on duration (in minutes) and handle multi-day events
  const eventDurationInMinutes = event.endDate.diff(event.startDate, "minute");
  const totalDayMinutes = 1440; // Minutes in a day

  // Calculate event width as a percentage of the total available calendar width
  const eventStartOffset = (event.startDate.hour() * 60 + event.startDate.minute()) / totalDayMinutes * 100; // Position based on start time in the day
  const eventEndOffset = (event.endDate.hour() * 60 + event.endDate.minute()) / totalDayMinutes * 100; // End position in the calendar

  const eventWidth = eventEndOffset - eventStartOffset; // The width depends on the duration (start and end time)

  return (
    <div
      className="event relative p-2 mb-2 rounded border border-gray-500 flex items-center justify-between"
      style={{
        backgroundColor: event.color,
        width: `${eventWidth}%`, // Width is calculated based on the event duration
        left: `${eventStartOffset}%`, // Position the event based on start time
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleResizeEnd}
      onMouseLeave={handleResizeEnd}
      onDoubleClick={handleDoubleClick} // Handle double-click to resize
    >
      <span>
        {event.startDate.format("MMM DD, hh:mm A")} → {event.endDate.format("MMM DD, hh:mm A")}
      </span>
      <button onClick={deleteEvent} className="text-red-500">🗑</button>

      {/* Resizing by dragging the left edge (shrink event) */}
      <div
        className="w-3 h-3 bg-gray-800 cursor-w-resize absolute top-0 left-0"
        onMouseDown={(e) => handleResizeStart(e, "start")}
      />

      {/* Resizing by dragging the right edge (grow event) */}
      <div
        className="w-3 h-3 bg-gray-800 cursor-e-resize absolute top-0 right-0"
        onMouseDown={(e) => handleResizeStart(e, "end")}
      />
    </div>
  );
};

export default Event;
