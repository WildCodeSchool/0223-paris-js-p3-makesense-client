import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import { sendRoleData } from "../../../store/roles";
import { getAllRoles } from "../../../services/roles";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import JobsRolesCard from "../../../components/JobsRolesCard/JobsRolesCard";

function RoleManager() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.roles);
  const [currentPageRoles, setCurrentPageRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);

  const searchData = async () => {
    try {
      const rolesData = await getAllRoles();
      dispatch(sendRoleData(rolesData.data));
      setVisible(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const { name } = role;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const nameMatch =
        (name && name.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (name &&
          name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const isMatch = nameMatch;

      if (nameMatch) {
        return isMatch;
      } else {
        return isMatch;
      }
    });
  }, [roles, searchTerm]);

  useEffect(() => {
    setCurrentPageRoles(filteredRoles);
  }, [filteredRoles]);

  return visible ? (
    <div>
      <div className="container_admin_role">
        <SearchBarAdmin
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activedButton
          redirection="/admin/roles/register"
          textButton="Ajouter un role"
        />
        <div className="card_container_admin_role">
          {currentPageRoles.map((role) => {
            return <JobsRolesCard key={role.id} JobRole={role} edit role />;
          })}
        </div>
        {roles && (
          <div className="pagination_admin_username">
            <Pagination
              data={filteredRoles}
              setCurrentItems={setCurrentPageRoles}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default RoleManager;
