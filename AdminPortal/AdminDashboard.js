  let sampleData = [];  
  let currentState = {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    sortColumn: 'id',
    sortDirection: 'asc',
    searchQuery: '',
    dateRange: { start: null, end: null },
    dataType: 'all',
    statusFilter: 'all'
  };

  document.addEventListener('DOMContentLoaded', function() {
    fetch('getCertificates.php')
      .then(res => res.json())
      .then(data => {
        sampleData = data;
        currentState.totalItems = sampleData.length;
        renderTable();
        setupEventListeners();
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  });

function renderTable() {
    let filteredData = filterData(sampleData);
    filteredData = sortData(filteredData);
    currentState.totalItems = filteredData.length;
    const paginatedData = paginateData(filteredData);
    const tbody = document.getElementById('dataBody');
    tbody.innerHTML = '';
    paginatedData.forEach(item => {
      const row = document.createElement('tr');

      const statusClass = `badge-${item.status}`;
      const typeDisplay = {
        'birth': 'Birth Certificate',
        'marriage': 'Marriage Certificate',
        'death': 'Death Certificate',
        'cenomar': 'Cenomar Certificate',
        'cenodeath': 'Cenodeath Certificate'
      }[item.type] || item.type;

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${typeDisplay}</td>
        <td>${formatDate(item.date)}</td>
        <td><span class="badge ${statusClass}">${capitalizeFirstLetter(item.status)}</span></td>
        <td>
          <button class="action-btn action-btn-view" data-id="${item.id}" data-action="view">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="action-btn action-btn-approve" data-id="${item.id}" data-action="approve">
            <i class="fas fa-check"></i> Approve
          </button>
          <button class="action-btn action-btn-reject" data-id="${item.id}" data-action="reject">
            <i class="fas fa-times"></i> Reject
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });
    updatePaginationInfo(currentState.totalItems);
}
function filterData(data) {
    return data.filter(item => {
      const matchesSearch = currentState.searchQuery === '' ||
        item.name.toLowerCase().includes(currentState.searchQuery.toLowerCase()) ||
        item.id.toString().includes(currentState.searchQuery) ||
        item.type.toLowerCase().includes(currentState.searchQuery.toLowerCase());

      const itemDate = new Date(item.date);
      const matchesDate = !currentState.dateRange.start ||
        (itemDate >= new Date(currentState.dateRange.start) &&
          itemDate <= new Date(currentState.dateRange.end));

      const matchesType = currentState.dataType === 'all' ||
        item.type === currentState.dataType;

      const matchesStatus = currentState.statusFilter === 'all' ||
        item.status === currentState.statusFilter;

      return matchesSearch && matchesDate && matchesType && matchesStatus;
  });
}
function logout() {
    sessionStorage.removeItem("isAdmin");
    window.location.href = 'AdminLogin.html';
}