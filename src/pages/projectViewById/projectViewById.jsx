import ProjectResume from "./ProjectResume";
import Timeline from "../../components/Timeline/Timeline"

const stepsData = [
  { date: "2023-05-25" },
  { date: "2023-05-27" },
  { date: "2023-05-19" },
  { date: "2023-07-26" },
  { date: "2023-07-28" },
  // { name: "1", date: "2023-05-25" },
  // { name: "2", date: "2023-05-27" },
  // { name: "3", date: "2023-05-19" },
  // { name: "4", date: "2023-07-26" },
  // { name: "5", date: "2023-07-28" },
];


export default function ProjectViewById() {
  return (
    // <section id="projectViewById">
    //   {/* <ProjectResume /> */}
    <div>
      <Timeline steps={stepsData} />
      </div>
    // </section>
  );
}
