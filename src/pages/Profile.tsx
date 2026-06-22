import { useParams } from 'react-router-dom'

export function Profile() {
  const { id } = useParams()
  const isMine = id === 'me'

  return (
    <div className="page-container profile-page">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <div className="profile-avatar"></div>
          <h1 className="profile-name">User Name</h1>
          <p className="profile-bio">Bio goes here</p>
          <div className="profile-stats">
            <div className="stat">
              <strong>24</strong>
              <span>Events</span>
            </div>
            <div className="stat">
              <strong>128</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>45</strong>
              <span>Following</span>
            </div>
          </div>
          {isMine ? (
            <>
              <button className="btn-primary">Edit Profile</button>
              <button className="btn-secondary">Settings</button>
            </>
          ) : (
            <>
              <button className="btn-primary">Follow</button>
              <button className="btn-secondary">Message</button>
            </>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button className="tab-btn active">Events</button>
        <button className="tab-btn">Posts</button>
        <button className="tab-btn">Photos</button>
      </div>

      <div className="profile-content">
        <div className="content-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="content-item"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
