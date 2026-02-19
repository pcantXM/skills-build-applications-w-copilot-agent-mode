import ResourceTableView from './ResourceTableView';

function Leaderboard() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpointPath = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  return (
    <ResourceTableView
      title="Leaderboard"
      endpointPath={endpointPath}
      primaryFields={['score', 'points', 'rank', 'name', 'username']}
    />
  );
}

export default Leaderboard;