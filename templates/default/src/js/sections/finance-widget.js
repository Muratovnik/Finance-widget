import noUiSlider from "../plugins/nouislider";
import { FinanceCalcs } from "../finance-calcs";

{
    let howMuchSaveContainer = document.querySelector(".js-finance-widget");

    if (howMuchSaveContainer) {
        // Инициируем рассчитваемые финансовые блоки
        let calcBlocks = [];
        createCalculations();

        // Создаем ползунок
        let rangeWrap = document.querySelector(".js-finance-widget__range-wrap");
        let rangeContainer = document.querySelector(".js-finance-widget__custom-range");
        let rangeSlider = rangeContainer.querySelector(".js-custom-range__slider");
        let rangeMin = rangeContainer.querySelector(".js-custom-range__min");
        let rangeMax = rangeContainer.querySelector(".js-custom-range__max");

        noUiSlider.create(rangeSlider, {
            start: 0,
            connect: [true, false],
            range: {
                min: getElemValue(rangeMin),
                max: getElemValue(rangeMax),
            },
            step: 1,
            tooltips: true,
            format: {
                // 'to' the formatted value. Receives a number.
                to: function (value) {
                    return Math.round(Number(value)) + " ₽";
                },
                // 'from' the formatted value.
                // Receives a string, should return a number.
                from: function (value) {
                    return value.replace(" ₽", "");
                },
            },
        });

        // Взаимодествие с ползунком
        rangeSlider.noUiSlider.on("start", function () {
            let tooltip = rangeSlider.querySelector(".noUi-tooltip");

            if (!tooltip.classList.contains("acitve")) {
                tooltip.classList.add("active");
            }
        });

        rangeSlider.noUiSlider.on("end", function () {
            changeTitle();
            rangeWrap.style.display = "none";
            showHiddens();
        });

        // Статистика
        let statsToggler = howMuchSaveContainer.querySelector('.js-finance-widget__open-stat');
        let statsBlock = howMuchSaveContainer.querySelector('.js-finance-widget__average');
        let initialButonText = statsToggler.innerHTML;

        let statsImage = statsBlock.querySelector('.js-finance-widget__average-pic img');
        let statsSum = statsBlock.querySelector('.js-finance-widget__average-sum');
        changeStatsMoneyPic();

        function changeStatsMoneyPic() {
            let statsSumNumber = Number(statsSum.innerHTML.replace(/\D+/g,""));
            let iconNumber = 1;

            if (statsSumNumber >= 11000 && statsSumNumber <= 20999) {
                iconNumber = 2;
            } else if (statsSumNumber >= 21000 && statsSumNumber <= 30999) {
                iconNumber = 3;
            } else if (statsSumNumber >= 31000 && statsSumNumber <= 40999) {
                iconNumber = 4;
            } else if (statsSumNumber >= 41000 && statsSumNumber <= 50000) {
                iconNumber = 5;
            }

            statsImage.setAttribute('src', `images/finance-widget/money${iconNumber}.svg`);
        }
        

        statsToggler.addEventListener('click', (e) => {
            statsBlock.classList.toggle('active');
            statsToggler.classList.toggle('active');
            toggleElemText(statsToggler, "Свернуть", initialButonText);
        })

        function toggleElemText(elem, toggledText, initialText) {
            if(elem.innerHTML === initialText) {
                elem.innerHTML = `<span>${toggledText}</span>`;
            } else {
                elem.innerHTML = initialText;
            }
        }

        function createCalculations() {
            let calculationsBlocks = document.querySelectorAll(".js-finance-calcs");
            let calcTypes = ["Mattress", "Deposit", "Investments"];

            for (let i = 0; i < calculationsBlocks.length; i++) {
                let calcBlock = new FinanceCalcs(calculationsBlocks[i], {
                    calcType: calcTypes[i],
                });
                calcBlocks.push(calcBlock);
            }
        }

        function showHiddens() {
            let calculations = howMuchSaveContainer.querySelector(".js-finance-widget__calculations");
            let hiddenBlock = howMuchSaveContainer.querySelector('.js-finance-widget__hidden')
            calculations.classList.add("active");
            hiddenBlock.classList.add('active');
            setCalculationsValues(Number(rangeSlider.noUiSlider.get().replace(" ₽", "")));
        }

        function setCalculationsValues(value) {
            for (let block of calcBlocks) {
                block.setInitialSum(value);
            }
        }

        function changeTitle() {
            let widgetTitle = howMuchSaveContainer.querySelector(".js-finance-widget__title");
            widgetTitle.innerHTML = `Вы откладываете ${rangeSlider.noUiSlider.get()} в месяц. <br> За три года вы бы заработали:`;
        }
    }

    function getElemValue(elem) {
        return Number(elem.innerHTML.replace(/\D/g, ""));
    }
}
