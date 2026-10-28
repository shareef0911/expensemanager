export default function Stat({ label, value }) {
  return (
    <div className="card stat">
      <span className="muted">{label}</span>
      <strong className="num">{value}</strong>
    </div>
  );
}
