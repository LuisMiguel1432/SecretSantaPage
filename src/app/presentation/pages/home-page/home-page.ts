import { Component } from '@angular/core';
import { GroupList } from '../../components/group-list/group-list';

@Component({
  selector: 'app-home-page',
  imports: [GroupList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
