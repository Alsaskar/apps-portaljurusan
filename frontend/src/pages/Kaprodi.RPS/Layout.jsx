import { useState } from "react";
import { MdSearch } from "react-icons/md";
import TableAction from "./TableAction";
import "./style.scss";
import ButtonKeputusan from "./ButtonKeputusan";

const TABLE_DATA = [
  {
    id: 1,
    no: "1",
    Dosen: "Bayu Satu",
    nip: "23452473576",
    mataKuliah: "UI/UX",
  },

  {
    id: 2,
    no: "2",
    Dosen: "Norman",
    nip: "36778674634",
    mataKuliah: "Matematika Teknik 1",
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
                <th>No</th>
                <th>Dosen</th>
                <th>NIP</th>
                <th>Mata Kuliah</th>
                <th>Keputusan</th>
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
                    <td>{filteredItem.Dosen}</td>
                    <td>{filteredItem.nip}</td>
                    <td>{filteredItem.mataKuliah}</td>
                    <td>
                      <ButtonKeputusan />
                    </td>
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
