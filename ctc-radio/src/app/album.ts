import { Image } from './image';
import { Artist } from './Artist';

export interface Album{
    //album_group:string;
    //album_type: string; 
    //artists:Artist[];
    //available_markets: string[];
    //external_urls: ExternalURL;
    //href: string; 
    //id:string; 
    name: string; 
    images: Image[];
    //release_date: string;
    //release_date_precision: string;
    //restrictions: string; 
    //type:string; 
    //uri:string
}
