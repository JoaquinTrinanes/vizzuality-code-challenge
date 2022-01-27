import dragDots from './icons/drag-dots.svg';

interface ToolbarTitleProps {
  title: string;
}

const ToolbarTitle: React.FC<ToolbarTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-row gap-x-2 align-middle">
      <div className="w-2 cursor-grab translate-y-[5px]">
        <img src={dragDots} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default ToolbarTitle;
