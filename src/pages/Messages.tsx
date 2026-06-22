export function Messages() {
  return (
    <div className="page-container messages-page">
      <div className="messages-container">
        <div className="messages-list">
          <div className="page-header">
            <h1>Messages</h1>
            <button className="btn-primary">+ New Chat</button>
          </div>

          <div className="chat-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="chat-item">
                <div className="chat-avatar"></div>
                <div className="chat-preview">
                  <h4>User {i}</h4>
                  <p>Last message preview...</p>
                </div>
                <span className="chat-time">10:30 AM</span>
              </div>
            ))}
          </div>
        </div>

        <div className="messages-content">
          <div className="empty-state">
            <p>Select a conversation to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  )
}
