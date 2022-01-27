import type { LegendType } from '../../../lib/data';

const GradientLegend: React.FC<LegendType> = ({ items }) => {
  return (
    <div className="flex flex-row relative">
      {items.map(({ color, name }, i) => {
        const nextColor = items[i + 1]?.color;

        if (!nextColor && name) {
          return (
            <div key={i} className="absolute right-0 top-2">
              {name}
            </div>
          );
        } else if (!nextColor) return null;

        return (
          <div
            className="relative h-2 w-full"
            key={i}
            style={{
              backgroundImage: `linear-gradient(to right, ${color}, ${nextColor})`,
            }}
          >
            {name && <div className="absolute top-2">{name}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default GradientLegend;
