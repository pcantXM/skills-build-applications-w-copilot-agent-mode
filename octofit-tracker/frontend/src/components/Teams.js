import ResourceTableView from './ResourceTableView';

function Teams() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpointPath = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  return <ResourceTableView title="Teams" endpointPath={endpointPath} primaryFields={['name', 'title', 'members']} />;
}

export default Teams;