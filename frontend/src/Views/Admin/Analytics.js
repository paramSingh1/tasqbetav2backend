import React, { useEffect, useContext } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import adminContext from "../../Context/Admin/adminContext";
import authContext from "../../Context/Auth/authContext";
import alertContext from "../../Context/Alert/alertContext";
import LineChart from "../../Components/Admin/LineChart";
import Spinner from "../../Components/Spinner";
const Analytics = () => {
  const { loading } = useContext(authContext);
  const { alert } = useContext(alertContext);
  const { twilioStats, getTwilioStats, getNotificationAnalytics, todoCount } =
    useContext(adminContext);
  useEffect(() => {
    (async () => {
      await getTwilioStats();
      await getNotificationAnalytics();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div class="firstRow">
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
            <div class="anayticsCard">
              <h4>Total Tasq :</h4>
              <p>{todoCount && todoCount.allTodos}</p>
            </div>
            <div class="anayticsCard">
              <h4>Tasq Notifications Being Sent As SMS</h4>
              <p>{todoCount && todoCount.notiSms}</p>
            </div>
            <div class="anayticsCard">
              <h4>Tasq Notifications Being Sent As EMAIL</h4>
              <p>{todoCount && todoCount.notiEmail}</p>
            </div>
          </div>

          <div>
            <h2>SMS Notifications Sent Last Week :</h2>
            {twilioStats && <LineChart twilioStats={twilioStats} />}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Analytics;
