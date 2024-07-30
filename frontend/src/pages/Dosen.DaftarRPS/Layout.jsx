import { useState } from "react";
import { MdSearch } from "react-icons/md";
import TableAction from "./TableAction";
import "./style.scss";

const TABLE_DATA = [
  {
    id: 1,
    no: "1",
    mataKuliah: "UI/UX",
    kodeMataKuliah: "K341",
    semester: "4",
    rps: "-",
    keterangan: "-",
  },

  {
    id: 2,
    no: "2",
    mataKuliah: "Matematika Teknik 1",
    kodeMataKuliah: "2J41",
    semester: "6",
    rps: "-",
    keterangan: "-",
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
      <div className="search-form-dosen-rps">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="input-search" />
        <MdSearch size={20} className="search-icon" />
      </div>

      <section className="content-area-table-dosen">
        <div className="data-table-diagram-dosen">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Mata Kuliah</th>
                <th>Kode Mata Kuliah</th>
                <th>Semester</th>
                <th>RPS</th>
                <th>Keterangan</th>
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
                    <td>{filteredItem.mataKuliah}</td>
                    <td>{filteredItem.kodeMataKuliah}</td>
                    <td>{filteredItem.semester}</td>
                    <td>{filteredItem.rps}</td>
                    <td>{filteredItem.keterangan}</td>
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
