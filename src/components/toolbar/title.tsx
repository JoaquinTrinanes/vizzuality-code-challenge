import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import dragDots from './icons/drag-dots.svg';

interface ToolbarTitleProps {
  title: string;
  dragListeners?: SyntheticListenerMap;
}

const ToolbarTitle: React.FC<ToolbarTitleProps> = ({
  title,
  dragListeners,
}) => {
  return (
    <div className="flex flex-row gap-x-2 align-middle">
      <div className="w-2 cursor-grab translate-y-[5px]" {...dragListeners}>
        <img src={dragDots} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default ToolbarTitle;
