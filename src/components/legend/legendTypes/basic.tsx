import type { LegendType } from '../../../lib/data';

const BasicLegend: React.FC<LegendType> = ({ items }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {items.map(({ color, name }, i) => (
        <div key={i} className="flex flex-row gap-x-2">
          <div
            className="w-4 h-4 rounded-full my-auto flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
};

export default BasicLegend;
