import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashMessageComponent } from "./shared/components/flash-message/flash-message-component";
import { LoaderComponent } from "./shared/components/loader/loader-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FlashMessageComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Transport Admin';
}
