// pages/calendar.tsx
import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import Layout from "../components/Common/Layout";

const CalendarPage: React.FC = () => {
    const [value, setValue] = useState(new Date())

    return (
        <>
            {/* インラインCSSで react-calendar を上書き */}
            <style>{`
        .react-calendar {
          background-color: #212529;
          color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 8px;
          padding: 1rem;
          font-family: sans-serif;
        }

        .react-calendar__navigation button {
          color: #ffffff;
          background: none;
        }

        .react-calendar__tile {
          background-color: transparent;
          color: #ffffff;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #495057;
        }

        .react-calendar__tile--active {
          background-color: #0dcaf0 !important;
          color: #000000 !important;
          border-radius: 4px;
        }

        .react-calendar__month-view__days__day--weekend {
          color: #adb5bd;
        }
      `}</style>
<Layout>
            <div className="container py-4 text-white">
                <div className="d-flex justify-content-center">
                    <Calendar
                        onChange={setValue}
                        value={value}
                        calendarType="gregory"
                    />
                </div>
            </div>
</Layout>
        </>
    )
}

export default CalendarPage
