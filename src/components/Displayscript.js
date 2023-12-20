document.addEventListener('DOMContentLoaded', function () {
  fetch('schools.json')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#schoolTable tbody');

      data.schools.forEach(school => {
        school.data.forEach(entry => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${school.location}</td>
            <td>${entry.social_category}</td>
            <td>${entry.overall_primary}</td>
            <td>${entry.overall_upper_primary}</td>
            <td>${entry.overall_secondary}</td>
          `;
          tableBody.appendChild(row);
        });
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
