import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  linking = '';

  setLink(link: string) {
    this.linking = link;
  }

  getLink(): string {
    return this.linking;
  }
}
