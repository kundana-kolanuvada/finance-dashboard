import { useApp } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className="role-switcher">
      <span>Role:</span>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}