import { useState, useEffect } from "react";
import "./style.scss";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan interval setelah komponen di-unmount
    return () => clearInterval(intervalID);
  }, []);

  // Fungsi untuk menambah nol di depan angka kurang dari 10
  const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  // Mendapatkan waktu saat ini
  const hours = time.getHours();
  const minutes = addLeadingZero(time.getMinutes());
  const ampm = hours >= 12 ? "PM" : "AM";

  // Mengonversi jam 24 jam menjadi 12 jam
  let displayHours = hours % 12; // Mengambil modulus dengan 12 untuk mendapatkan jam 12 jam

  // Jika jam adalah 0, ubah menjadi 12 untuk mewakili tengah malam
  if (displayHours === 0) {
    displayHours = 0;
  }

  // Tambahkan nol di depan jika jam kurang dari 10
  const displayHoursFormatted = addLeadingZero(displayHours);

  return (
    <div className="digital-clock">
      <div className="clock-time">
        <span className="clock-hours">{displayHoursFormatted}</span>
        <span className="clock-titik-dua">:</span>
        <span className="clock-minutes">{minutes}</span>
      </div>
      <span>{ampm}</span>
    </div>
  );
};

export default DigitalClock;
