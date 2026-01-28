import { Navbar } from "../components/Navbar";
import "../styles/dashboard.css";

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>

        <section className="dashboard-cards">
          <div className="dashboard-card">Users</div>
          <div className="dashboard-card">Reports</div>
          <div className="dashboard-card">Settings</div>
        </section>
      </main>
    </>
  );
};
