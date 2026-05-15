const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

dropZone.onclick = () => fileInput.click();
fileInput.onchange = (e) => handleFile(e.target.files[0]);

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => processCSV(e.target.result);
    reader.readAsText(file);
}

function processCSV(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    // Find column indices dynamically
    const rainIdx = headers.findIndex(h => h.includes('Precipitation') || h.includes('Rain'));
    const dateIdx = headers.findIndex(h => h.includes('Date'));

    const summary = document.getElementById('summary-panel');
    const list = document.getElementById('results-list');
    
    if (rainIdx === -1 || dateIdx === -1) {
        summary.innerHTML = `<p style="color:red">Error: Could not find required columns in CSV.</p>`;
        return;
    }

    let highRiskCount = 0;
    list.innerHTML = ''; // Clear old results

    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.replace(/"/g, '').trim());
        const rainValue = parseFloat(cols[rainIdx]);
        const dateValue = cols[dateIdx];

        // LOGIC: If rain is more than 0.1 inches, it's a risk
        if (rainValue > 0.1) {
            highRiskCount++;
            const card = document.createElement('div');
            card.className = 'risk-card';
            card.innerHTML = `
                <strong>⚠️ ${dateValue}</strong><br>
                <span>Rainfall: ${rainValue} in</span><br>
                <small>Impact: Delayed logistics & road risk alert sent.</small>
            `;
            list.appendChild(card);
        }
    }

    summary.innerHTML = `<h3>Analysis Complete: Found ${highRiskCount} High-Risk Events</h3>`;
}