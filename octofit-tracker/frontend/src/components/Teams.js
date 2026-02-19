import ResourceTableView from './ResourceTableView';

function Teams() {
  return <ResourceTableView title="Teams" endpointPath="/api/teams/" primaryFields={['name', 'title', 'members']} />;
}

export default Teams;