import { useContext } from 'react';
import { SortableListenersContext } from '../sortable';
import dragDots from './icons/drag-dots.svg';

interface ToolbarTitleProps {
  title: string;
}

const ToolbarTitle: React.FC<ToolbarTitleProps> = ({ title }) => {
  const sortableContext = useContext(SortableListenersContext);

  return (
    <div className="flex flex-row gap-x-2 align-middle">
      <div
        className="w-3 cursor-grab translate-y-2 touch-manipulation"
        {...sortableContext?.listeners}
        {...sortableContext?.attributes}
      >
        <img src={dragDots} />
      </div>
      <div className="text-lg md:text-2xl">{title}</div>
    </div>
  );
};

export default ToolbarTitle;
