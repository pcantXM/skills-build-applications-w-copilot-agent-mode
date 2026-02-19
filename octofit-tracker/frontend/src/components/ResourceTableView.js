import { useEffect, useMemo, useState } from 'react';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function getPrimaryValue(item, fields) {
  for (const field of fields) {
    if (item?.[field]) {
      return String(item[field]);
    }
  }
  return 'N/A';
}

function ResourceTableView({ title, endpointPath, primaryFields }) {
  const endpoint = `${baseUrl}${endpointPath}`;
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${title.toLowerCase()}: ${response.status}`);
      }

      const data = await response.json();
      const parsedData = Array.isArray(data) ? data : data?.results || [];
      setItems(parsedData);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedQuery));
  }, [items, query]);

  return (
    <section className="mb-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex flex-wrap align-items-center justify-content-between gap-2">
          <h2 className="h4 mb-0 text-primary-emphasis">{title}</h2>
          <a className="link-primary fw-semibold" href={endpoint} target="_blank" rel="noreferrer">
            API endpoint
          </a>
        </div>

        <div className="card-body">
          <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-12 col-md">
              <label htmlFor={`${title.toLowerCase()}-search`} className="form-label mb-1">
                Search
              </label>
              <input
                id={`${title.toLowerCase()}-search`}
                type="text"
                className="form-control"
                placeholder={`Filter ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-auto d-flex gap-2 mt-4">
              <button type="button" className="btn btn-outline-primary" onClick={fetchItems}>
                Refresh
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger mb-3">{error}</div>}

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '72px' }}>
                    #
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Primary Details</th>
                  <th scope="col">Additional Details</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No {title.toLowerCase()} found.
                    </td>
                  </tr>
                )}

                {isLoading && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      Loading {title.toLowerCase()}...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredItems.map((item, index) => {
                    const name =
                      item?.name ||
                      item?.title ||
                      item?.username ||
                      item?.user ||
                      `Item ${index + 1}`;

                    const primaryValue = getPrimaryValue(item, primaryFields);
                    const additionalValue =
                      item?.description || item?.email || item?.score || item?.team || 'N/A';

                    return (
                      <tr key={item?.id || item?._id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>{name}</td>
                        <td>{primaryValue}</td>
                        <td>{String(additionalValue)}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelectedItem(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" role="dialog" aria-modal="true" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </section>
  );
}

export default ResourceTableView;