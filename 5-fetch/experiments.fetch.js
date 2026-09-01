export async function loadExperiments() {
    const response = await fetch('http://127.0.0.1:3000/experiments/experiments');
    const experiments = await response.json();


    return experiments;
}
