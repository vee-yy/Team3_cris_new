        // Simple script to hide menu items not for this role
        document.addEventListener('DOMContentLoaded', function() {
                          const username = sessionStorage.getItem('adminUsername');
  const role = sessionStorage.getItem('adminRole');

  const nameDisplay = document.getElementById('adminUsername');
  if (username && nameDisplay) nameDisplay.textContent = username;

  const roleDisplay = document.getElementById('adminRole');
  if (role && roleDisplay) roleDisplay.textContent = role;
  
            const menuItems = document.querySelectorAll('.menu-item');
            const currentRole = 'Releasing Officer'; // This would come from your auth system
            
            menuItems.forEach(item => {
                const requiredRole = item.getAttribute('data-role');
                if (requiredRole && requiredRole !== currentRole) {
                    item.style.display = 'none';
                }
            });
            
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("adminUsername").textContent = "Juan Dela Cruz";
    document.getElementById("adminRole").textContent = "Releasing Officer";
  });
        });
