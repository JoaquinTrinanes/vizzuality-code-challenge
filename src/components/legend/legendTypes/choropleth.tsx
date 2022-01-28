import type { LegendType } from '../../../lib/data';

const ChoroplethLegend: React.FC<LegendType> = ({ items }) => {
  return (
    <div className="flex flex-row">
      {items.map(({ color, name }, i) => (
        <div key={i} className="w-full">
          <div className="h-2" style={{ backgroundColor: color }} />
          <div className="text-center text-sm md:text-2xl">{name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChoroplethLegend;
