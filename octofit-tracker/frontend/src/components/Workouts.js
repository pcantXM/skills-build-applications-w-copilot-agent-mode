import ResourceTableView from './ResourceTableView';

function Workouts() {
  return <ResourceTableView title="Workouts" endpointPath="/api/workouts/" primaryFields={['name', 'title', 'duration']} />;
}

export default Workouts;