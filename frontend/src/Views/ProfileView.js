import React, { useContext, useEffect, useState } from "react";
import { UserLayout } from "../Layouts";
import authContext from "../Context/Auth/authContext";
import alertContext from "../Context/Alert/alertContext";
import Spinner from "../Components/Spinner";
const ProfileView = () => {
  const { user, getUserProfile, profile, addProfile, loading } =
    useContext(authContext);
  const { alert } = useContext(alertContext);
  const [formData, setFormData] = useState({
    location: "",
  });
  useEffect(() => {
    (async () => {
      await getUserProfile();
      if (profile) {
        setFormData({ location: profile.location });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile(formData);
  };
  return (
    <UserLayout>
      {loading ? (
        <Spinner />
      ) : (
        <form class="profile-form" onSubmit={handleSubmit}>
          <div className="profile-container">
            {alert && (
              <div
                className={`alert alert-${alert.type} profile-container`}
                role="alert"
              >
                {alert.message}
              </div>
            )}
          </div>
          <div class="profile-image-container">
            {profile && (
              <img
                src={profile.profilepic}
                alt="avatar"
                class="profile-avatar"
              />
            )}

            <p class="profile-title">
              <b>Available Credits: </b>{" "}
              {profile ? (
                <>
                  <span style={{ color: "#687980" }}>
                    {profile.credits.sms} SMS
                  </span>
                  <span style={{ color: "#687980" }}> and </span>
                  <span style={{ color: "#687980" }}>
                    {profile.credits.email} Email
                  </span>
                </>
              ) : (
                <span>
                  Please Create The Profile By Clicking the Save Details Button
                  To See Remaining Credits
                </span>
              )}
            </p>
          </div>

          <div class="profile-container">
            <button class="credits-btn" type="submit">
              Buy Credits
            </button>
          </div>

          <div class="profile-container">
            <label for="uname">
              <b>Username</b>
            </label>
            <input
              class="profile-input-username"
              type="text"
              value={user.username}
              name="uname"
              disabled
            />

            <label for="uemail">
              <b>Email</b>
            </label>
            <input
              class="profile-input-email"
              type="text"
              value={user.email}
              name="useremail"
              disabled
            />

            <label for="uphone">
              <b>Phone</b>
            </label>
            <input
              class="profile-input-phone"
              type="text"
              value={user.phone}
              name="uphone"
              disabled
            />

            <label for="uaddress">
              <b>Address</b>
            </label>
            <input
              class="profile-input-address"
              type="text"
              placeholder="123 Main Street, Washington DC, USA"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div class="profile-buttons-container">
            <button class="profile-save-btn" type="submit">
              Save Details
            </button>
          </div>
        </form>
      )}
    </UserLayout>
  );
};

export default ProfileView;
