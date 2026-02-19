import ResourceTableView from './ResourceTableView';

function Users() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpointPath = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : '/api/users/';

  return <ResourceTableView title="Users" endpointPath={endpointPath} primaryFields={['username', 'name', 'email']} />;
}

export default Users;