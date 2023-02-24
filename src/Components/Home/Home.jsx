import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useContext } from "react";
import { DataContext } from "../../Context/DataStore";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { token, logout } = useContext(DataContext);
  const [userList, setUserList] = useState([]);

  const getData = useCallback(async () => {
    if (token) {
      try {
        const { data } = await axios.post(
          "http://frontendapi00test.v6pohbale0-pxr4kozpq3gn.p.temp-site.link/api/users",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <>
        <div className="bg-danger h-100 p-5">
          <div className="row">
            <h1 className="text-center font-bold p-3">ALL Users</h1>
            <h3 className=" position-absolute top-0 pt-3  mt-5">
              <Link onClick={logout} className="text-white">
                Logout
              </Link>
            </h3>
          </div>
          <div className="table-responsive">
            <table className="m-auto w-100 row">
              <DataTable value={userList}>
                <Column field="id" header="ID" sortable />
                <Column field="first_name" header="first_name" sortable />
                <Column field="last_name" header="last_name" sortable />
                <Column field="email" header="email" sortable />
                <Column field="created_at" header="created_at" sortable />
              </DataTable>
            </table>
          </div>
        </div>
      </>
    </>
  );
}
