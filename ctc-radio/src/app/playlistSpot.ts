import { Track } from './track';

export interface PlaylistSpot{
    name: string; 
    id: string; 
    uri: string; 
    tracks: Track[]; 
    snapshot_id: string; 
}