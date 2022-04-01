import React from 'react'
import { Switch } from 'react-router'
import DrawerAnt from './HOC/DrawerAnt'
import ModalAnt from './HOC/ModalAnt'
import CreateProject from './Pages/CreateProject'
import CyberBord from './Pages/CyberBord'
import Login from './Pages/Login/Login'
import Register from './Pages/Login/Register'
import ProjectManagement from './Pages/ProjectManagement'
import UserManagement from './Pages/UserManagement'
import LoginTemplate from './Templates/HomeTemplates/LoginTemplate'
import UserManagementTemplates from './Templates/HomeTemplates/UserManagementTemplates'

export default function App() {
  return (
    <div>
      <DrawerAnt />
      <ModalAnt />
      <Switch>
        <LoginTemplate exact path="/login" Component={Login} />
        <LoginTemplate exact path="/register" Component={Register} />
        <UserManagementTemplates exact path="/usermanagement" Component={UserManagement} />
        <UserManagementTemplates exact path="/cyberbord" Component={CyberBord} />
        <UserManagementTemplates exact path="/createproject" Component={CreateProject} />
        <UserManagementTemplates exact path="/projectmanagement" Component={ProjectManagement} />
        <UserManagementTemplates exact path="/" Component={CyberBord} />
        <UserManagementTemplates exact path="*" Component={CyberBord} />
      </Switch>
    </div>
  )
}
