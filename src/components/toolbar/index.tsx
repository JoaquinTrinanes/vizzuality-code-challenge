import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { ToolbarButtonsProps } from './buttons';
import ToolbarButons from './buttons';
import ToolbarTitle from './title';

interface ToolbarProps {
  actions: ToolbarButtonsProps;
  title: string;
  dragListeners?: SyntheticListenerMap;
}

const Toolbar: React.FC<ToolbarProps> = ({ actions, title, dragListeners }) => {
  return (
    <div className="flex flex-row justify-between mt-2">
      <ToolbarTitle title={title} dragListeners={dragListeners} />
      <ToolbarButons {...actions} />
    </div>
  );
};

export default Toolbar;
