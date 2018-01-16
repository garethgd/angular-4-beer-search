import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable()
export class SeoService {
  constructor(private meta: Meta) { }
  
  generateTags(config) {
    // default values
    config = { 
      title: 'Random Beer Finder', 
      description: 'Find a random beer from a brewery database.', 
      image: 'https://angularfirebase.com/images/logo.png',
      slug: '',
      ...config
    }
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: 'Random Beer Finder' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Random Beer Finder' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `http://randombeer.net/${config.slug}` });
  }
}