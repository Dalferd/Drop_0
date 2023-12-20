// Fetch data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Sort the data based on income in increasing order
        data.sort((a, b) => a.income - b.income);

        // Extract districts and dropout rate values
        const districts = data.map(entry => entry.district);
        const primaryRates = data.map(entry => entry.primary);
        const secondaryRates = data.map(entry => entry.secondary);
        const higherSecondaryRates = data.map(entry => entry.higher_secondary);

        // Create scatter plot
        const ctx = document.getElementById('scatterChart').getContext('2d');
        new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: districts,
                datasets: [
                    {
                        label: 'Primary Dropout Rate',
                        data: data.map(entry => ({ x: entry.district, y: entry.primary })),
                        backgroundColor: 'rgba(255, 99, 132, 0.7)', // Red
                        pointRadius: 10,
                    },
                    {
                        label: 'Secondary Dropout Rate',
                        data: data.map(entry => ({ x: entry.district, y: entry.secondary })),
                        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Blue
                        pointRadius: 10,
                    },
                    {
                        label: 'Higher Secondary Dropout Rate',
                        data: data.map(entry => ({ x: entry.district, y: entry.higher_secondary })),
                        backgroundColor: 'rgba(255, 206, 86, 0.7)', // Yellow
                        pointRadius: 10,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'District (Sorted by Income)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Dropout Rate'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
