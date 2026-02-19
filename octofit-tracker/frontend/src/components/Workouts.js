import ResourceTableView from './ResourceTableView';

function Workouts() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpointPath = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  return <ResourceTableView title="Workouts" endpointPath={endpointPath} primaryFields={['name', 'title', 'duration']} />;
}

export default Workouts;