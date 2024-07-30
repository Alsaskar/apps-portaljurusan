import { useState } from "react";
import { MdSearch } from "react-icons/md";
import "./ViewRPS.scss";

const TABLE_DATA = [
  {
    id: 1,
    no: "1",
    mataKuliah: "UI/UX",
    KodeMataKuliah: "K3Z1",
    semester: "6",
  },

  {
    id: 2,
    no: "2",
    mataKuliah: "Matemetika Teknik 1",
    KodeMataKuliah: "K3Z1",
    semester: "8",
  },
];

const ViewRPS = () => {
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

      <section className="content-area-table-kaprodi">
        <div className="data-table-diagram-kaprodi">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Mata Kuliah</th>
                <th>Kode Mata Kuliah</th>
                <th>Semester</th>
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
                    <td>{filteredItem.KodeMataKuliah}</td>
                    <td>{filteredItem.semester}</td>
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

export default ViewRPS;
