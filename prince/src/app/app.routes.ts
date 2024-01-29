import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MailinglistComponent } from './mailinglist/mailinglist.component';
import { SeriesComponent } from './series/series.component';
import { BuzzComponent } from './buzz/buzz.component';
import { NewsComponent } from './news/news.component';
import { MangaComponent } from './manga/manga.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';
import { LightNovelComponent } from './lightnovel/lightnovel.component';


import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'mailinglist',
        component: MailinglistComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard]
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'userprofile',
        component: UserprofileComponent
    },
    {
        path: ':id/details',
        component: DetailsComponent
    },
    {
        path: 'buzz',
        component: BuzzComponent,
        canActivate: [authGuard]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'all-series',
        component: SeriesComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'manga',
        component: MangaComponent
    },
    {
        path: 'light-novel',
        component: LightNovelComponent
    }
]
