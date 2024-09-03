import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralPageOptionsEnum} from "../../models/enums/GeneralPageOptionEnum";
import {UserService} from "../../services/UserService";
import {BankDepositResponseModel} from "../../models/BankDepositResponseModel";
import {ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexYAxis, ChartComponent} from "ng-apexcharts";
import {VisualService} from "../../services/VisualService";
import {Duration, parse} from 'iso8601-duration';
import 'moment-duration-format';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DropdownItem} from "../../models/DropdownItem";
import {computeMonthsFromDuration, createTextDocument, formatDuration} from "../../services/UtilsService";
import {PeriodEnum} from "../../models/enums/PeriodEnum";
import {switchMap} from "rxjs";
import {BankService} from "../../services/BankService";

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  selector: 'app-banks-overview',
  templateUrl: './banks-overview-page.component.html',
  styleUrls: ['./banks-overview-page.component.scss']
})
export class BanksOverviewPageComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;

  readonly generalPageOptionEnum = GeneralPageOptionsEnum;
  readonly BANKS_PIE_CHART_TITLE = "Current deposits";
  readonly BANKS_BAR_CHART_TITLE = "Future deposits";
  readonly DOWNLOAD_REPORT = "Download report";
  readonly PERIOD = "period";
  readonly PERIOD_ICON = "assets/general/modals/bank-addition-modal/offer-icon.png";

  bankDeposits: BankDepositResponseModel[] = [];
  donutChartOptions!: Partial<DonutChartOptions>;
  barChartOptions!: Partial<BarChartOptions>;
  periodForm!: FormGroup;
  dropdownOptions: DropdownItem[] = [];

  constructor(private userService: UserService,
              private bankService: BankService,
              private fb: FormBuilder,
              private visualService: VisualService) {
    this.calculateDropdownOptions();
  }

  ngOnInit(): void {
    this.initForm();
    this.userService.getDeposits().subscribe((deposits: BankDepositResponseModel[]) => {
      this.bankDeposits = deposits;
      this.renderDonutCharts();
      this.renderBarCharts();
    });
  }

  initForm(): void {
    this.periodForm = this.fb.group({
      period: [0]
    });
    this.periodForm.valueChanges.subscribe(
      () => {
        this.renderBarCharts();
      });
  }

  calculateDropdownOptions(): void {
    this.dropdownOptions = Object.keys(PeriodEnum).map((period: any) => {
      return new DropdownItem("Period " + formatDuration(period), computeMonthsFromDuration(period));
    });
  }

  private renderDonutCharts(): void {
    let currentDepositsByBank = this.computeCurrentDeposits();
    this.donutChartOptions = this.visualService.adaptCharts(currentDepositsByBank);
  }

  private renderBarCharts(): void {
    let period = this.periodForm.value.period;
    const discountedBankDeposits = this.computeDepositsPrognostic(period);
    this.barChartOptions = this.visualService.adaptBarCharts(discountedBankDeposits);
  }

  private computeCurrentDeposits(): Record<string, number> {
    return this.bankDeposits.reduce((acc: Record<string, number>, item: BankDepositResponseModel) => {
      const existingItem = acc[item.bankName];
      acc[item.bankName] = (existingItem ?? 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);
  }

  private computeDepositsPrognostic(monthsFromNow: number): Record<string, number> {
    return this.bankDeposits.reduce((acc: Record<string, number>, item: BankDepositResponseModel) => {
      const parsedDate = new Date(item.createdDate);
      const duration = parse(String(item.period)) as Duration;
      let days = duration!.years! * 365 + duration!.months! * 30 + duration!.days!;
      const msPerDay = 1000 * 60 * 60 * 24;
      const futureNeededDate = parsedDate.getMilliseconds() + days * msPerDay;
      let currentDate = new Date().getMilliseconds();
      if (monthsFromNow !== 0) {
        currentDate += monthsFromNow * 31 * msPerDay;
      }

      let amount = item.amount;
      if (currentDate >= futureNeededDate) {
        amount = ((item.amount * (100 + item.discount)) / 100);
      }
      const existingAmount = acc[item.bankName] || 0;
      acc[item.bankName] = existingAmount + amount;
      return acc;
    }, {} as Record<string, number>);
  }

  updateDeposits(removedDepositId: any) {
    this.userService.deleteDeposit(removedDepositId).pipe(
      switchMap(() => this.userService.getDeposits())
    ).subscribe((deposits: BankDepositResponseModel[]) => {
      this.bankDeposits = deposits;
    });
  }

  downloadReport(): void {
    this.bankService.getReport().subscribe((response: ArrayBuffer) => {
      createTextDocument(response);
    })
  }
}
