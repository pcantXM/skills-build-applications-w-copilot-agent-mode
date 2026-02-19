import ResourceTableView from './ResourceTableView';

function Users() {
  return <ResourceTableView title="Users" endpointPath="/api/users/" primaryFields={['username', 'name', 'email']} />;
}

export default Users;