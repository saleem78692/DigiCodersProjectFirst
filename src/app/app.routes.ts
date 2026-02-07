import { Routes } from '@angular/router';
import { AdminLogin } from './admin-login/admin-login';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AllUsers } from './all-users/all-users';
import { Branchlogin } from './branchlogin/branchlogin';
import { Branchdashboard } from './branchdashboard/branchdashboard';
import { Brancwisedata } from './brancwisedata/brancwisedata';
import { CircleAMLogin } from './circle-amlogin/circle-amlogin';
import { CircleAMDashboard } from './circle-amdashboard/circle-amdashboard';
import { CircleAMALLData } from './circle-amalldata/circle-amalldata';


export const routes: Routes = [
    {path:"",component:AdminLogin},
    {path:"admin-dashboard",component:AdminDashboard},
    {path:"AllUsers",component:AllUsers},
    {path:"branchlogin",component:Branchlogin},
    {path:"branchdashboard",component:Branchdashboard},
    {path:"branchwisedata",component:Brancwisedata},
    {path:"CircleAMlogin",component:CircleAMLogin},
    {path:"CircleAMDashboard",component:CircleAMDashboard},
    {path:"CircleAMAllData",component:CircleAMALLData}
];