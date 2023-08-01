import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import { sendJobData } from "../../../store/jobs";
import { getAllJobs } from "../../../services/jobs";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import JobsRolesCard from "../../../components/JobsRolesCard/JobsRolesCard";
import CustomToast from "../../../components/CustomToast/CustomToast";

function JobManager() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAlert } = CustomToast();
  const location = useLocation();

  const jobs = useSelector((state) => state.jobs);
  const [currentPageJobs, setCurrentPageJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.state && location.state.jobModified) {
      showAlert("success", "Le poste a été modifié avec succès !");
      navigate("/admin/jobs", { replace: true, state: undefined });
    }
  }, [location.state, showAlert]);

  const showSuccessAlertDelete = () => {
    showAlert("success", "Le poste a été supprimé avec succès !");
  };

  const searchData = async () => {
    try {
      const jobsData = await getAllJobs();
      dispatch(sendJobData(jobsData.data));
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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const { name } = job;
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

      return isMatch;
    });
  }, [jobs, searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setCurrentPageJobs(filteredJobs.slice(currentPageJobs, 9));
    } else {
      setCurrentPageJobs(filteredJobs);
    }
  }, [filteredJobs]);

  return visible ? (
    <div>
      <div className="container_admin_job">
        <SearchBarAdmin
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activedButton
          redirection="/admin/jobs/register"
          textButton="Ajouter un poste"
        />
        <div className="card_container_admin_job">
          {currentPageJobs.map((job) => {
            return (
              <JobsRolesCard
                key={job.id}
                JobRole={job}
                edit
                onSuccessDeleteJob={showSuccessAlertDelete}
              />
            );
          })}
        </div>
        {jobs && (
          <div className="pagination_admin_username">
            <Pagination
              data={filteredJobs}
              setCurrentItems={setCurrentPageJobs}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default JobManager;
