// backend/models/Session.js
export const Session = {
  id: Number,
  admin_id: Number,
  session_code: String,
  title: String,
  status: String, // 'active' | 'ended'
  created_at: Date,
};
