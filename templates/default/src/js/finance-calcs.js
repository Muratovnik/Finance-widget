export class FinanceCalcs {
    constructor(block, options = { calcType }) {
        this.options = options;
        this.block = block;

        this.totalElem = block.querySelector(".js-finance-calcs__total");
        this.coinsContainer = block.querySelector(".js-finance-calcs__coins");
        this.coin = block.querySelector(".js-finance-calcs__coin");

        this.duration;
        this.totalAmount;
        this.maximumAmount = this.calulate(50000);
    }

    calulate(sum) {
        let result = 0;
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        function daysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }
        function daysInYear(i) {
            return (
                (new Date(
                    new Date(currentYear, currentMonth + i, 0).getFullYear(), 11, 31) -
                    new Date(new Date(currentYear, currentMonth + i, 0).getFullYear(), 0, 0)
                ) / 86400000
            );
        }
        function getCurrentPersent(i) {
            if (i <= 5 && i > 2) {
                return 1;
            } else if (i <= 11 && i > 5) {
                return 2;
            } else if (i < 35 && i > 11) {
                return 3;
            } else if (i == 35) {
                return 4;
            }
            return 0;
        }

        switch (this.options.calcType) {
            case "Mattress":
                return Math.round(sum * 36);
            case "Deposit":
                for (let i = 0; i < 36; i++) {
                    result =
                        (result + sum) *
                            (6.98 / 100 / daysInYear(i)) *
                            daysInMonth(currentMonth + i, currentYear) +
                        result +
                        sum;
                }
                return Math.round(result);
            case "Investments":
                let percents = [5.19, 11.34, 15.25, 23.97, 71.21];
                for (let i = 0; i < 36; i++) {
                    result =
                        (result + sum) *
                            (percents[getCurrentPersent(i)] / 100 / daysInYear(i)) *
                            daysInMonth(currentMonth + i, currentYear) +
                        result +
                        sum;
                }
                return Math.round(result);
        }
    }

    setMonets() {
        let step = this.maximumAmount / 10;
        let monets = this.totalAmount / step;
        let number = 0;

        let intervalValue = this.duration / monets;

        let interval = setInterval(() => {
            number += 1;

            if (number >= monets || number > 10) {
                clearInterval(interval);
                return false;
            }

            this.coinsContainer.append(this.coin.cloneNode());
        }, intervalValue);
    }

    setInitialSum(value) {
        this.initialSum = value;
        this.totalAmount = this.calulate(this.initialSum);
        this.animatedOutput();
        this.setMonets();
    }

    animatedOutput() {
        let number = 0;
        let step = Math.round(Number(this.totalAmount / 100));
        let intervalValue = 10;
        let duration = (this.totalAmount / step) * intervalValue;
        this.duration = duration;

        let interval = setInterval(() => {
            number += step;

            if (number >= this.totalAmount) {
                clearInterval(interval);
                this.totalElem.innerHTML = this.totalAmount.toLocaleString("ru");

                return false;
            }

            this.totalElem.innerHTML = number.toLocaleString("ru");
        }, intervalValue);
    }
}
