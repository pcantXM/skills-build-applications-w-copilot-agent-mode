import ResourceTableView from './ResourceTableView';

function Leaderboard() {
  return (
    <ResourceTableView
      title="Leaderboard"
      endpointPath="/api/leaderboard/"
      primaryFields={['score', 'points', 'rank', 'name', 'username']}
    />
  );
}

export default Leaderboard;