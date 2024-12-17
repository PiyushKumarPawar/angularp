import { Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

export const routes: Routes = [
    {
        path:'',
        component:CarouselComponent
    },
    {
        path:'video-player',
        component:VideoPlayerComponent
    }
];
