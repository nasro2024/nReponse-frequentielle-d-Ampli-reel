// Fonction pour calculer le module en dB de H(p)
function calculateModuleInDB(av, fh, frequencies) {
    var moduleDataDB = [];
    var p;
    for (var i = 0; i < frequencies.length; i++) {
        p = 2 * Math.PI * frequencies[i];
        moduleDataDB.push(20 * Math.log10(Math.abs((2 * Math.PI * av * fh) / (p + 2 * Math.PI * fh))));
    }
    return moduleDataDB;
}

// Fonction pour tracer le graphique avec Chart.js
function plot() {
    var av = parseFloat(document.getElementById('av').value);
    var fh = parseFloat(document.getElementById('fh').value) * 1e3; // Convertir KHz en Hz
    var fmin = parseFloat(document.getElementById('fmin').value);
    var fmax = parseFloat(document.getElementById('fmax').value) * 1e6; // Convertir MHz en Hz

    var frequencies = [];
    var moduleDataDB = [];

    for (var f = fmin; f <= fmax; f *= 2) {
        frequencies.push(f);
        var p = 2 * Math.PI * f;
        moduleDataDB.push(20 * Math.log10(Math.abs((2 * Math.PI * av * fh) / (p + 2 * Math.PI * fh))));
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: frequencies,
            datasets: [{
                label: '|H(p)| (dB)',
                data: moduleDataDB,
                borderColor: 'blue',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Frequency (Hz)'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Magnitude (dB)'
                    }
                }]
            }
        }
    });
}

// Fonction pour réinitialiser le canvas
function reset() {
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
