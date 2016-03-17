// Boot Component
// Author : Alicia Parisse
// Description : 
//  	This component is the the boot component.
//		Its only job is to bootstrap the main component (personnal dashboard)
// Last-comment date : 02/03/16

import {bootstrap}    from 'angular2/platform/browser';
import {PersonalDashboard} from './global/personal-dashboard';

bootstrap(PersonalDashboard);