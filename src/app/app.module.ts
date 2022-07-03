import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";

import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule } from "@ngrx/data";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthGuard } from "./auth/auth.guard";
import { metaReducers, reducers } from "./reducers";

const routes: Routes = [
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule), // loadChildren means it's lazy loaded; só quanto bater num path /courses vai efetivamente carregá-los
    canActivate: [AuthGuard], // means that any path starting with the path /courses will be protected by this guard
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(), // means it's eagerly loaded
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true, // so the state of the app is never mutated by our code accidentally
        strictActionImmutability: true, // so the action objects of the app is never mutated by our code accidentally (e nao partir o time travel debugger)
        strictActionSerializability: true, // if our action had a date this would break because dates are not serializable; this ensures that the actions can be saved by the devtools so that they can be replayed later one
        strictStateSerializability: true, // ensures that the state inside the store is always serializable (for exame if we want to save it in the local storage)
      },
    }), // add GlobalAppState interface here?
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
