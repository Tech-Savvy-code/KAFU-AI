import { FaRobot } from "react-icons/fa";

export default function AITyping() {
  return (
    <div className="message ai typing-message">
      <div className="message-avatar">
        <FaRobot />
      </div>
      <div className="typingBox">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
