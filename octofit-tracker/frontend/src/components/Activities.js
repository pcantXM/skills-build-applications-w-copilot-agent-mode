import ResourceTableView from './ResourceTableView';

function Activities() {
  return <ResourceTableView title="Activities" endpointPath="/api/activities/" primaryFields={['name', 'title']} />;
}

export default Activities;