import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input() title!: string;
  @Input() summary!: string;
  @Input() articleUrl!: string;
  @Input() imageUrl!: string;

  buttonText: string = 'Read more';

  openExternalNewsPage() {
    window.open(this.articleUrl, '_blank');
  }
}
