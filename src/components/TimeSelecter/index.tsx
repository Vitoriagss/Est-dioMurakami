"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import * as React from "react";

interface TimePickerProps {
  selectedDate: Date | undefined;
  onReserveSuccess?: (range: string[]) => void;
}

export function DynamicTimePicker({
  selectedDate,
  onReserveSuccess,
}: TimePickerProps) {
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [endTime, setEndTime] = React.useState<number | null>(null);

  React.useEffect(() => {
    setStartTime(null);
    setEndTime(null);
  }, [selectedDate]);

  const Hours = Array.from({ length: 29 }, (_, i) => (i + 16) / 2);

  const isTimeDisabled = (hour: number) => {
    if (!selectedDate) return true;

    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    const minutes = now.getMinutes();

    if (isToday) {
      return hour <= now.getHours() + now.getMinutes() * (1 / 60);
    } else if (selectedDate.getTime() < now.getTime()) {
      return true;
    }

    return hour < 8 || hour > 22;
  };

  const calculatedTimeRange = (start: number, end: number) => {
    const [minHour, maxHour] = [start, end].sort((a, b) => a - b);

    const setMinHour = Hours.findIndex((hour) => hour === minHour);
    const setMaxHour = Hours.findIndex((hour) => hour === maxHour);

    const range: string[] = [];
    for (let h = setMinHour; h <= setMaxHour; h++) {
      Number.isInteger(Hours[h])
        ? range.push(`${Hours[h].toString().padStart(2, "0")}:00`)
        : range.push(`${Math.trunc(Hours[h]).toString().padStart(2, "0")}:30`);
    }
    return range;
  };

  const handleSelectedTime = (time: number) => {
    if (!startTime || (startTime && endTime)) {
      setStartTime(time);
      setEndTime(null);
      return;
    }

    setEndTime(time);
    const reservedRange = calculatedTimeRange(startTime, time);

    if (onReserveSuccess) {
      onReserveSuccess(reservedRange);
    }
  };

  const isInRange = (hour: number) => {
    if (!startTime) return false;
    if (!endTime) return hour === startTime;

    const [min, max] = [startTime, endTime].sort((a, b) => a - b);
    return hour >= min && hour <= max;
  };

  return (
    <ScrollArea className="h-fit rounded-md border p-4">
      <div className="grid grid-cols-4 gap-2 text-md md:text-sm w-75">
        {Hours.map((hour) => {
          const disabled = isTimeDisabled(hour);
          const selected = isInRange(hour);
          const timeString = Number.isInteger(hour)
            ? `${Math.trunc(hour).toString().padStart(2, "0")}:00`
            : `${Math.trunc(hour).toString().padStart(2, "0")}:30`;

          return (
            <button
              key={hour}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectedTime(hour)}
              className={`p-2 rounded border text-sm transition-colors ${
                disabled
                  ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400"
                  : selected
                    ? "bg-primaria text-branco border-primaria cursor-pointer"
                    : "bg-gray-100 text-black hover:bg-primaria hover:text-branco cursor-pointer"
              }`}
            >
              {timeString}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
