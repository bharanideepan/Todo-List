import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CenterComponent } from './center/center.component';
import { RightComponent } from './right/right.component';
import { BodyComponent } from './body/body.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { MenuBtnDirective } from './menu-btn.directive';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    CenterComponent,
    RightComponent,
    BodyComponent,
    TopBarComponent,
    ContextMenuComponent,
    MenuBtnDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
