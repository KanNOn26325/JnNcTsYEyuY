// 代码生成时间: 2025-09-19 10:33:15
 * interactive_chart_generator.svelte
\
 * This Svelte component generates an interactive chart based on user input.
\
 */
\
<script>
\
    // Import necessary Svelte and D3 libraries
\
    import Chart from 'chartjs';
\
    import { onMount, writable } from 'svelte';
\
    
\
    // Define writable stores for chart data and options
\
    const chartData = writable({
\
        labels: ['January', 'February', 'March'],
\
        datasets: [{
\
            label: 'Monthly Sales',
\
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
\
            borderColor: 'rgba(255, 99, 132, 1)',
\
            data: [12, 19, 3]
\
        }]
\
    });
\
    const chartOptions = writable({
\
        scales: {
\
            y: {
\
                beginAtZero: true
\
            }
\
        }
\
    });
\
    
\
    // Initialize the chart
\
    let chart;
\
    
\
    // Function to update the chart with new data
\
    function updateChart(newData, newOptions) {
\
        if (!chart) return;
\
        chart.data.labels = newData.labels;
\
        chart.data.datasets[0].data = newData.datasets[0].data;
\
        chart.options = newOptions;
\
        chart.update();
\
    }
\
    
\
    // Mount the chart
\
    onMount(() => {
\
        chart = new Chart(
\
            document.querySelector('#myChart'), {
\
                type: 'bar',
\
                data: chartData,
\
                options: chartOptions
\
            }
\
        );
\
    });
\
</script>
\

\
<!-- Chart container -->
\
<div id="myChart"></div>
\

\
<!-- Input form to update chart data -->
\
<form on:submit|preventDefault={(event) => {
\
    const newLabels = event.target.labels.value;
\
    const newData = event.target.data.value;
\
    try {
\
        const parsedLabels = JSON.parse(newLabels);
\
        const parsedData = JSON.parse(newData);
\
        updateChart({
\
            labels: parsedLabels,
\
            datasets: [{ data: parsedData }]
\
        }, chartOptions);
\
    } catch (error) {
\
        console.error('Invalid input format:', error);
\
    }
\
}}>
\
    <label for="labels">Labels: <input type="text" name="labels" placeholder='["Jan", "Feb", "Mar"]'/></label>
\
    <label for="data">Data: <input type="text" name="data" placeholder='[10, 20, 30]'/></label>
\
    <button type="submit">Update Chart</button>
\
</form>
\

\
<!-- Error handling for invalid JSON input -->
\
{#if $error}
\
    <p style="color: red;">Invalid JSON input. Please check your data format.</p>
\
{/if}
\
