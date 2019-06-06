import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ClientsComponent } from './clients/clients.component';
import { UpdateComponent } from './update/update.component';
import { ArtistComponent } from './artist/artist.component';
import { AuctionCalendarComponent } from './auction-calendar/auction-calendar.component';
import { AddArtistComponent } from './artist/add-artist/add-artist.component';
import { UpdateArtistComponent } from './artist/update-artist/update-artist.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

const routes: Routes = [

  {path: 'clients', component:ClientsComponent },
  {path: 'add', component:AddComponent },
  {path: 'update', component:UpdateComponent },
  {path: 'update/:id', component:UpdateComponent },
  {path: 'artist', component:ArtistComponent },
  {path: 'addArtist', component:AddArtistComponent },
  {path: 'updateArtist', component:UpdateArtistComponent },
  {path: 'auction-calendar', component:AuctionCalendarComponent },
  {path: 'login', component:LoginComponent},
  {path: 'users', component:UsersComponent},
  {path: 'addUser', component:AddUserComponent},
  {path: 'updateUser', component:UpdateUserComponent},
  {path: 'updateUser/:id', component:UpdateUserComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
