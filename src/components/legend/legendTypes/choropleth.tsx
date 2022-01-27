import type { LegendType } from '../../../lib/data';

const ChoroplethLegend: React.FC<Pick<LegendType, 'items'>> = ({ items }) => {
  return (
    <div className="flex flex-row">
      {items.map(({ color, name }, i) => (
        <div key={i} className="w-full">
          <div className="h-2" style={{ backgroundColor: color }} />
          <div className="text-center">{name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChoroplethLegend;
