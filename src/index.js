import './style.css';
import { getRealtimeFromLocationString, getForecastFromLocationString } from './weatherAPI';

getRealtimeFromLocationString('london');
getForecastFromLocationString('New York City', 5);
