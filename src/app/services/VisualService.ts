import {Injectable} from "@angular/core";
import {BarChartOptions, DonutChartOptions} from "../components/banks-overview-page/banks-overview-page.component";
import {CryptoDisplayModel} from "../models/CryptoDisplayModel";
import {HeatMapChartOptions} from "../components/crypto-addition-page/crypto-addition-page.component";

@Injectable({
  providedIn: 'root'
})
export class VisualService {

  axisTitleStyle = {
    color: '#333',
    fontSize: '14px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontStyle: 'italic',
    offset: 10
  };

  adaptCharts(deposits: Record<string, number>, type?: string): Partial<DonutChartOptions> {
    let chartOptions!: Partial<DonutChartOptions>;

    chartOptions = {
      series: Object.values(deposits),
      chart: {
        width: 500,
        type: type !== undefined ? 'pie' : 'donut'
      },
      labels: Object.keys(deposits),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "left"
            }
          }
        }
      ]
    };
    chartOptions.series = Object.values(deposits);
    return chartOptions;
  }

  adaptBarCharts(discountedBankDeposits: Record<string, number>): Partial<BarChartOptions> {
    return {
      series: [
        {
          name: "Values",
          data: Object.values(discountedBankDeposits)
        }
      ],
      colors: ['#76B9C8'],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: Object.keys(discountedBankDeposits),
        title: {
          text: 'Bank',
          style: this.axisTitleStyle
        }
      },
      yaxis: {
        title: {
          text: 'Future sum',
          style: this.axisTitleStyle
        }
      },
      tooltip: {
        enabled: true
      },
      dataLabels: {
        enabled: false
      }
    };
  }

  computeHeatMap(items: CryptoDisplayModel[]): HeatMapChartOptions {
    return {
      series: [
        {
          name: 'Volume Change 24h',
          data: items.map(coin => ({x: coin.name, y: coin.volume_change_24h}))
        }
      ],
      chart: {
        type: "area",
        height: 350,
        width: 1000
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: -100,
                to: 0,
                color: '#ff0000',
                name: 'Negative'
              },
              {
                from: 0,
                to: 100,
                color: '#00ff00',
                name: 'Positive'
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'category'
      },
      title: {
        text: 'Cryptocurrency Volatility Heatmap'
      }
    };
  }
}
