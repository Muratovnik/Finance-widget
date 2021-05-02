class Chart {
    constructor(elem) {
        this.elem = elem;
        this.grapghPercents = elem.querySelector('.js-chart__graphic-percents');
        this.percentsElem = elem.querySelector('.js-chart__percents');
        this.setGrahphic();
    }

    getPercents() {
        return this.percentsElem.innerHTML.replace(/\D/g, "");
    }

    setGrahphic() {
        this.grapghPercents.setAttribute('stroke-dasharray', `${this.getPercents()} ${100 - this.getPercents()}`);
    }
}

{
    let charts = document.querySelectorAll('.js-chart');
    if(charts && charts.length > 0) {
        for(let chart of charts) {
            chart = new Chart(chart);
        }
    }
}