import { useState } from 'react';
import './style.scss'; 

const Calendar = () => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const renderCalendar = () => {
    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();

    let datesHtml = "";

    for (let i = start; i > 0; i--) {
      datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for (let i = 1; i <= endDate; i++) {
      let className = (i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? ' class="today"' : "";
      datesHtml += `<li${className}>${i}</li>`;
    }

    for (let i = end; i < 6; i++) {
      datesHtml += `<li class="inactive">${i - end + 1}</li>`;
    }

    return datesHtml;
  };

  const handleNavClick = (btnId) => {
    let newYear = year;
    let newMonth = month;

    if (btnId === "prev" && month === 0) {
      newYear--;
      newMonth = 11;
    } else if (btnId === "next" && month === 11) {
      newYear++;
      newMonth = 0;
    } else {
      newMonth = btnId === "next" ? month + 1 : month - 1;
    }

    const newDate = new Date(newYear, newMonth, new Date().getDate());

    setDate(newDate);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth());
  };

  return (
    <div className="calendar">
      <header className='header-calender'>
        <p className='month-title-calender'>{`${months[month]} ${year}`}</p>
        <nav className="nav-calender">
          <button id="prev" onClick={() => handleNavClick("prev")}></button>
          <button id="next" onClick={() => handleNavClick("next")}></button>
        </nav>
      </header>
      <section className='calender-days'>
        <ul className="days">
          <li className="days-title">Su</li>
          <li className="days-title">Mo</li>
          <li className="days-title">Tu</li>
          <li className="days-title">We</li>
          <li className="days-title">Th</li>
          <li className="days-title">Fr</li>
          <li className="days-title">Sa</li>
        </ul>
        <ul className="dates" dangerouslySetInnerHTML={{ __html: renderCalendar() }}></ul>
      </section>
    </div>
  );
};

export default Calendar;
