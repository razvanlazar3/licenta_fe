import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/newsService';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  newsItems: any[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((response: any) => {
      this.newsItems = response.results.map((news: any) => ({
        ...news,
        summary: this.computeSummary(news.description)
      }));
    });
  }

  computeSummary(description: string): string {
    return description.length > 150 ? description.substring(0, 150) + '...' : description;
  }
}
