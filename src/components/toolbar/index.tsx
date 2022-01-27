import type { ToolbarButtonsProps } from './buttons';
import ToolbarButons from './buttons';
import ToolbarTitle from './title';

interface ToolbarProps {
  actions: ToolbarButtonsProps;
  title: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ actions, title }) => {
  return (
    <div className="flex flex-row justify-between mt-2">
      <ToolbarTitle title={title} />
      <ToolbarButons {...actions} />
    </div>
  );
};

export default Toolbar;
