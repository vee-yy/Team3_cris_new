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
    const adminUser = sessionStorage.getItem('adminUsername');
    const adminRole = sessionStorage.getItem('adminRole') || 'Guest';

      if (adminUser && adminRole) {
        const infoBox = document.getElementById('adminInfo');
      infoBox.textContent = `${adminUser} (${adminRole})`;
      }
    // Sidebar role visibility

  document.querySelectorAll('.menu-item').forEach(item => {
    const role = item.dataset.role;
    const visibleTo = item.dataset.visibleTo;

    if (adminRole === 'Super Admin') {
      item.style.display = 'block';
    }
    else if (visibleTo === 'all') {
      item.style.display = 'block';
    }
    else if (role === adminRole) {
      item.style.display = 'block';
    }
    else {
      item.style.display = 'none';
    }
  });
    

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

const canApprove = ['Super Admin', 'Verifying Officer'].includes(adminRole);
const canReject = ['Super Admin', 'Verifying Officer'].includes(adminRole);
const canView = true;

row.innerHTML = `
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td>${typeDisplay}</td>
  <td>${formatDate(item.date)}</td>
  <td><span class="badge ${statusClass}">${capitalizeFirstLetter(item.status)}</span></td>
  <td>
    ${canView ? `<button class="action-btn action-btn-view" data-id="${item.id}" data-action="view"><i class="fas fa-eye"></i> View</button>` : ''}
    ${canApprove ? `<button class="action-btn action-btn-approve" data-id="${item.id}" data-action="approve"><i class="fas fa-check"></i> Approve</button>` : ''}
    ${canReject ? `<button class="action-btn action-btn-reject" data-id="${item.id}" data-action="reject"><i class="fas fa-times"></i> Reject</button>` : ''}
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

  document.getElementById("exportBtn").addEventListener("click", function () {
    const content = document.getElementById("printArea").innerHTML;
    const printWindow = window.open("", "", "height=800,width=1000");

    printWindow.document.write('<html><head><title>Print Table</title>');
    printWindow.document.write('<style>table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:8px;text-align:left}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  });