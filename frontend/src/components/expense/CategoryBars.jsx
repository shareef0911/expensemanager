import { formatMoney } from '../../utils/format';

export default function CategoryBars({ items, total }) {
  return (
    <ul className="bars">
      {items.map(({ category, total: value }) => (
        <li key={category}>
          <div><span>{category}</span><span className="num">{formatMoney(value)}</span></div>
          <progress max={total} value={value} aria-label={category} />
        </li>
      ))}
    </ul>
  );
}
