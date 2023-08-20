import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],

})
export class SearchComponent {
  searchString!: string;
  showSearch!: boolean;
  @HostListener('document:click', ['$event']) onClick(e: Event){
    const eventTarget = e.target as HTMLInputElement
    const classNames = ['search-input', 'search-button', 'pi-search']
    if (eventTarget.classList.contains('search-input')) {
      this.showSearch = true;
    }
    if (!classNames.some(className => eventTarget.classList.contains(className))) {
      this.showSearch = false;
    }
  }
  toggleShowDiv() {
    console.log('cliocku')
    this.showSearch = !this.showSearch;
  }
}
