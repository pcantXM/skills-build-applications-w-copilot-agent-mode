import ResourceTableView from './ResourceTableView';

function Activities() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpointPath = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  return <ResourceTableView title="Activities" endpointPath={endpointPath} primaryFields={['name', 'title']} />;
}

export default Activities;