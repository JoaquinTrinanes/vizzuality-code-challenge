import Toolbar from './components/toolbar';

const App = () => {
  return (
    <div className="min-h-screen">
      <Toolbar
        onChangeCollapse={() => {}}
        onChangeInfo={() => {}}
        onChangeVisibility={() => {}}
      />
    </div>
  );
};

export default App;
