import {bootstrap}    from 'angular2/platform/browser'
import {PersonalDashboard} from './personal-dashboard'
import {CourseService} from './course-service';

bootstrap(PersonalDashboard, [CourseService]);