import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralPageOptionsEnum} from "../../models/enums/GeneralPageOptionEnum";
import {CryptoResponseModel} from "../../models/CryptoResponseModel";
import {CryptoService} from "../../services/CryptoService";
import {CryptoDisplayModel} from "../../models/CryptoDisplayModel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";
import {Page} from "../../useful/AppConstants";
import {VisualService} from "../../services/VisualService";

export type HeatMapChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-crypto-addition',
  templateUrl: './crypto-addition-page.component.html',
  styleUrls: ['./crypto-addition-page.component.scss']
})
export class CryptoAdditionPageComponent implements OnInit {

  readonly generalPageOptionEnum = GeneralPageOptionsEnum;
  readonly ADD_ICON = 'assets/general/always-there-icons/add-icon.png';
  readonly SEARCH_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly SEARCH_LABEL = "Search";
  readonly SEARCH = "search";

  crypto: CryptoDisplayModel[] = [];
  filteredCrypto: CryptoDisplayModel[] = [];
  searchForm!: FormGroup;
  public chartOptions!: Partial<HeatMapChartOptions>;
  @ViewChild("chart") chart!: ChartComponent;
  lastPage = 0;
  currentPage = 1;


  constructor(private cryptoService: CryptoService,
              private visualService: VisualService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.searchByText();
    this.getCryptos();
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  showCertainPage(page: number) {
    this.currentPage = page;
    this.getCryptos();
  }

  private getCryptos(): void {
    this.cryptoService.getAllCrypto(this.currentPage).subscribe((cryptos: Page<CryptoResponseModel>) => {
      let content = cryptos.content;
      this.lastPage = cryptos?.page?.totalPages - 1;

      this.crypto = content.map(cryptoCoin => ({
        id: cryptoCoin.id,
        name: cryptoCoin.name,
        symbol: cryptoCoin.symbol,
        lastUpdated: cryptoCoin.lastUpdated,
        price: cryptoCoin.price,
        volume_24h: cryptoCoin.volume_24h,
        volume_change_24h: cryptoCoin.volume_change_24h,
        percent_change_24h: cryptoCoin.percent_change_24h,
      } as CryptoDisplayModel));
      this.filteredCrypto = this.crypto;
      this.chartOptions = this.visualService.computeHeatMap(this.filteredCrypto);
    })
  }

  private searchByText() {
    this.searchForm.valueChanges.subscribe(
      () => {
        let searchText = this.searchForm.value.search;
        this.filteredCrypto = searchText !== ''
          ? this.crypto.filter(crypto => crypto.name.includes(searchText))
          : this.crypto;

        if (searchText !== '') {
          this.currentPage = 1;
          this.lastPage = 1;
        } else this.getCryptos();

        this.chartOptions = this.visualService.computeHeatMap(this.filteredCrypto);
      });
  }
}
