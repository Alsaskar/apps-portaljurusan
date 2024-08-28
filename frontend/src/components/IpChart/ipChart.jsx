import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { urlApi } from "../../config";
import { GoDotFill } from "react-icons/go";
import { TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import "./style.scss";

const IpChart = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [noData, setNoData] = useState(false); // Status untuk menandakan tidak ada data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlApi}/auth/get-attempt-count`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          params: {
            year: currentYear, // Kirim tahun sebagai parameter query
          },
        });
        
        // Periksa jika data kosong dan set status noData
        if (response.data.length === 0) {
          setNoData(true);
          setData([]);
        } else {
          setNoData(false);
          const filteredData = response.data
            .filter(item => item.month.startsWith(currentYear.toString()));


          const processedData = filteredData.map(item => ({
            ...item,
            totalAttempts: Number(item.totalAttempts),
          }));


          setData(processedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentYear]);

  const formatTooltipValue = (value) => `${value}`;

  const formatYAxisLabel = (value) => `${value}`;

  // Function to handle year change
  const handleYearChange = (newYear) => {
    setCurrentYear(newYear);
  };

  return (
    <div className="ip-bar-chart">
      <div className="ip-bar-chart-info">
        <h5 className="ip-bar-chart-title">Statistik Blokir IP</h5>
       
        <div className="year-selector">
          <button onClick={() => handleYearChange(currentYear - 1)} className="btn-year"><TbSquareRoundedArrowLeftFilled size={20} /></button>
          <p className="year">{currentYear}</p>
          <button onClick={() => handleYearChange(currentYear + 1)} className="btn-year"><TbSquareRoundedArrowRightFilled size={20} /></button>
        </div>
      </div>
      <p className="ip-bar-chart-subtitle">
          <GoDotFill size={14} /> Jumlah Percobaan
        </p>
      <div className="ip-bar-chart-wrapper">
        {noData ? (
          <div className="no-data">No Data Available</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="month"
                tickSize={0}
                tickMargin={5}
                axisLine={false}
                tick={{
                  fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                  fontSize: 14,
                }}
              />
              <YAxis
                tickFormatter={formatYAxisLabel}
                tickCount={6}
                axisLine={false}
                tickSize={0}
                tick={{
                  fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                }}
              />
              <Tooltip formatter={formatTooltipValue} cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="totalAttempts"
                fill="#5f47e8"
                barSize={24}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default IpChart;