import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../../../components/UserCard/UserCard";
import Pagination from "../../../components/Pagination/Pagination";
import { sendUserData } from "../../../store/users";
import { getAllUsers } from "../../../services/users";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import CustomToast from "../../../components/CustomToast/CustomToast";

function UserManage() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAlert } = CustomToast();

  const location = useLocation();

  const users = useSelector((state) => state.users);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminFilter, setAdminFilter] = useState(false);
  const [nonAdminFilter, setNonAdminFilter] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.state && location.state.userModified) {
      showAlert("success", "L'utilisateur a été modifié avec succès !");
      navigate("/admin/users", { replace: true, state: undefined });
    }
  }, [location.state, showAlert]);

  const showSuccessAlertDelete = () => {
    showAlert("success", "L'utilisateur a été supprimé avec succès !");
  };

  const searchData = async () => {
    try {
      const usersData = await getAllUsers();
      dispatch(sendUserData(usersData.data));
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

  const handleAdminFilter = (e) => {
    setAdminFilter(e.target.checked);
  };

  const handleNonAdminFilter = (e) => {
    setNonAdminFilter(e.target.checked);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const {
        email,
        role,
        job,
        tel,
        firstname,
        lastname,
        admin,
        affiliated_site,
      } = user;

      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

      const emailMatch =
        email && email.toLowerCase().includes(lowerCaseSearchTerm);

      const roleMatch =
        (role && role.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (role &&
          role
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const jobMatch =
        (job && job.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (job &&
          job
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const telMatch = tel && tel.toLowerCase().includes(lowerCaseSearchTerm);

      const affiliated_siteMatch =
        (affiliated_site &&
          affiliated_site.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (affiliated_site &&
          affiliated_site
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const firstnameLastnameMatch =
        (`${firstname} ${lastname}` &&
          `${firstname} ${lastname}`
            .toLowerCase()
            .includes(lowerCaseSearchTerm)) ||
        (`${lastname} ${firstname}` &&
          `${lastname} ${firstname}`
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(lowerCaseSearchTerm));

      const isMatch =
        emailMatch ||
        roleMatch ||
        jobMatch ||
        telMatch ||
        affiliated_siteMatch ||
        firstnameLastnameMatch;

      if (adminFilter && nonAdminFilter) {
        return isMatch;
      } else if (adminFilter) {
        return isMatch && admin;
      } else if (nonAdminFilter) {
        return isMatch && !admin;
      } else {
        return isMatch;
      }
    });
  }, [users, searchTerm, adminFilter, nonAdminFilter]);

  useEffect(() => {
    if (searchTerm === "") {
      setCurrentPageUsers(filteredUsers.slice(currentPageUsers, 9));
    } else {
      setCurrentPageUsers(filteredUsers);
    }
  }, [filteredUsers]);

  const setItems = (users) => {
    const filteredUsers = adminFilter
      ? users.filter((user) => user.admin)
      : nonAdminFilter
      ? users.filter((user) => !user.admin)
      : users;

    if (
      (filteredUsers.length === 0 && adminFilter) ||
      (filteredUsers.length === 0 && nonAdminFilter)
    ) {
      navigate("/admin/users", { replace: true });
    } else {
      setCurrentPageUsers(filteredUsers);
    }
  };

  return visible ? (
    <div>
      <div className="container_admin_usermanage">
        <SearchBarAdmin
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activedButton
          redirection="/admin/users/register"
          textButton="Ajouter un utilisateur"
        />
        <div className="checkbox_login">
          <input
            type="checkbox"
            id="listAdmin"
            checked={adminFilter}
            onChange={handleAdminFilter}
          />
          <label for="listAdmin" class="check-box" />
          <p className="c-blue">Afficher les administrateurs</p>

          <input
            type="checkbox"
            id="listUsers"
            checked={nonAdminFilter}
            onChange={handleNonAdminFilter}
          />
          <label for="listUsers" class="check-box" />
          <p className="c-blue">Afficher les utilisateurs</p>
        </div>
        <div className="card_container_admin_user">
          {currentPageUsers.map((user) => (
            <UserCard
              user={user}
              key={user.id}
              edit
              onSuccessDelete={showSuccessAlertDelete}
            />
          ))}
        </div>
        {users && (
          <div className="pagination_admin_username">
            <Pagination data={filteredUsers} setCurrentItems={setItems} />
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default UserManage;
