import { useState } from "react";
import { MdSearch } from "react-icons/md";
import TableAction from "./TableAction";
import "./style.scss";

const TABLE_DATA = [
  {
    id: 1,
    no: "1",
    noPresensi: "ABS-001",
    mataKuliah: "Matematika Teknik 1",
    tglAbsensi: "27-06-2024",
    lab: "LAB. Pemograma WEB",
    jamMulai: "09.30",
    jamSelesai: "11.30",
  },
];

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/*search filter*/}
      <div className="search-form">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        <MdSearch size={20} className="search-icon" />
      </div>

      <section className="content-area-table">
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>No Presensi</th>
                <th>Mata Kuliah</th>
                <th>Tanggal</th>
                <th>Ruangan</th>
                <th>Jam</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA?.filter((dataItem) => {
                const searchData = Object.values(dataItem).join("").toLowerCase();
                return searchData.includes(searchTerm.toLowerCase());
              }).map((filteredItem) => {
                return (
                  <tr key={filteredItem.id}>
                    <td>{filteredItem.no}</td>
                    <td>{filteredItem.noPresensi}</td>
                    <td>{filteredItem.mataKuliah}</td>
                    <td>{filteredItem.tglAbsensi}</td>
                    <td>{filteredItem.lab}</td>
                    <td>{filteredItem.jamMulai} - {filteredItem.jamSelesai}</td>
                    <td className="dt-cell-action">
                      <TableAction />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Layout;
