import {Component, ViewChild} from '@angular/core';
import {GeneralPageOptionsEnum} from "../../models/enums/GeneralPageOptionEnum";
import {CryptoService} from "../../services/CryptoService";
import {PersonalCryptoResponseModel} from "../../models/PersonalCryptoResponseModel";
import {ChartComponent} from "ng-apexcharts";
import {VisualService} from "../../services/VisualService";
import {DonutChartOptions} from "../banks-overview-page/banks-overview-page.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-crypto-overview-page',
  templateUrl: './crypto-overview-page.component.html',
  styleUrls: ['./crypto-overview-page.component.scss']
})
export class CryptoOverviewPageComponent {

  readonly generalPageOptionEnum = GeneralPageOptionsEnum;
  readonly TOTAL_SUMS_PIE_CHART_TITLE = "Total crypto sums";
  readonly NET_WORTH = "Net worth";
  readonly PROFITS_PIE_CHART_TITLE = "Profits in crypto coins";
  readonly SEARCH_ICON = "assets/general/modals/bank-addition-modal/sum-icon.png";
  readonly SEARCH_LABEL = "Search";
  readonly SEARCH = "search";

  searchForm!: FormGroup;
  personalCrypto: PersonalCryptoResponseModel[] = [];
  filteredPersonalCrypto: PersonalCryptoResponseModel[] = [];
  netWorth = "";
  balance = 0;
  percentage: number = 0;
  @ViewChild("chart") chart!: ChartComponent;
  totalSumsChartOptions!: Partial<DonutChartOptions>;
  profitsChartOptions!: Partial<DonutChartOptions>;

  constructor(private cryptoService: CryptoService,
              private fb: FormBuilder,
              private visualService: VisualService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.updatePersonalCrypto();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.searchForm.valueChanges.subscribe(
      () => {
        let searchText = this.searchForm.value.search;
        this.filteredPersonalCrypto = searchText !== ''
          ? this.personalCrypto.filter(crypto => crypto.name.includes(searchText))
          : this.personalCrypto;
      });
  }

  updatePersonalCrypto(): void {
    this.cryptoService.getPersonalCrypto().subscribe((crypto: PersonalCryptoResponseModel []) => {
      this.personalCrypto = crypto;
      this.filteredPersonalCrypto = this.personalCrypto;
      this.renderDonutCharts();
      this.computeGenericInfo();
    })
  }

  private renderDonutCharts(): void {
    this.totalSumsChartOptions = this.visualService.adaptCharts(this.computeTotalSumsForCryptos());
    this.profitsChartOptions = this.visualService.adaptCharts(this.computeProfitsForCryptos(), 'pie');
  }

  private computeTotalSumsForCryptos(): Record<string, number> {
    return this.personalCrypto.reduce((acc: Record<string, number>, item: PersonalCryptoResponseModel) => {
      const existingItem = acc[item.slug];
      acc[item.slug] = (existingItem ?? 0) + item.currentSum;
      return acc;
    }, {} as Record<string, number>);
  }

  private computeProfitsForCryptos(): Record<string, number> {
    const totalInitialSum = this.personalCrypto.reduce((total: number, item: PersonalCryptoResponseModel) => {
      return total + item.initialSum;
    }, 0);

    return this.personalCrypto.reduce((acc: Record<string, number>, item: PersonalCryptoResponseModel) => {
      const profit = item.currentSum - item.initialSum;
      if (profit > 0) {
        var profitPercentage = (profit / totalInitialSum) * 100;
        acc[item.slug] = parseFloat(profitPercentage.toFixed(2));
      } else {
        acc[item.slug] = 0;
      }

      return acc;
    }, {} as Record<string, number>);
  }


  private computeGenericInfo(): void {
    let totalSum = this.personalCrypto.reduce((total: number, item: PersonalCryptoResponseModel) => {
      return total + item.currentSum;
    }, 0);
    this.netWorth = this.NET_WORTH + " " + parseInt(totalSum.toString()) + "$";
    let totalInitialSum = this.personalCrypto.reduce((total: number, item: PersonalCryptoResponseModel) => {
      return total + item.initialSum;
    }, 0);
    this.percentage = parseFloat(((totalSum - totalInitialSum) / totalInitialSum * 100).toFixed(2));
    this.netWorth = this.NET_WORTH + " " + parseInt(totalSum.toString()) + "$";
    this.balance = parseInt((totalSum - totalInitialSum).toString());
  }
}
