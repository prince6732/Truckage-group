import { Component, OnInit, signal } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar-component";
import { HeaderComponent } from "../../components/header/header-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard-component.html',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  sidebarOpen = signal(true);

  ngOnInit() {
    if (window.innerWidth < 1024) {
      this.sidebarOpen.set(false);
    }
  }

  isSidebarOpen() {
    return this.sidebarOpen();
  }

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }
}
