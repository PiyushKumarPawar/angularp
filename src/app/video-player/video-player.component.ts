import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {

  ngOnInit(): void {
      this.getData();
  }

  constructor(private serv : SharedService){

  }

  public link = '';

  getData(){
    debugger;
    this.link = this.serv.getLink();
  }
  @ViewChild('videoPlayer') videoPlayer: any;  // Reference to the video player
  currentIndex: number = 0;
  videoList: { src: string, text: string, description: string }[] = [
    { src: 'trailer1.mp4', text: 'Karaven', description: 'A thrilling adventure awaits!' },
    { src: 'trailer2.mp4', text: 'Bhool Bhuliyaa 2', description: 'A horror-comedy full of twists.' },
    { src: 'trailer3.mp4', text: 'Cocomelon', description: 'A fun-filled journey for kids!' }
  ];

  ngAfterViewInit() {
    if (this.videoPlayer) {
      // Play the first video once the component is initialized
      this.videoPlayer.nativeElement.play();
      // Initially show the caption
      this.toggleCaptionVisibility(true);

      // Add event listener to hide the caption when the video starts playing
      this.videoPlayer.nativeElement.addEventListener('play', () => {
        this.toggleCaptionVisibility(false);  // Hide the caption when video starts
      });

      // Add event listener to show the caption when the video is paused or reloaded
      this.videoPlayer.nativeElement.addEventListener('pause', () => {
        this.toggleCaptionVisibility(true);  // Show the caption when video pauses
      });
    }
  }

  // Toggle the visibility of the caption
  toggleCaptionVisibility(isVisible: boolean) {
    const caption = document.querySelector('.carousel-caption');
    if (caption) {
      const captionElement = caption as HTMLElement;  // Cast to HTMLElement
      captionElement.style.opacity = isVisible ? '1' : '0';
      captionElement.style.transition = 'opacity 0.5s ease';  // Smooth transition
    }
  }

  // Function to go to the next video
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videoList.length;
    this.reloadVideo();
  }

  // Function to go to the previous video
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.videoList.length) % this.videoList.length;
    this.reloadVideo();
  }

  // Reload the video to reset it to the start
  reloadVideo() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();  // Reload the video
      this.videoPlayer.nativeElement.play();  // Play the video after reload
      this.toggleCaptionVisibility(false);  // Hide caption when video starts playing
    }
  }

}
