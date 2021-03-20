import { Route, Switch } from 'react-router-dom';
import './App.css';
import Container from './components/Container/Container';
import ToolBar from "./components/ToolBar/ToolBar";
import MainPage from "./containers/MainPage/MainPage";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import {Redirect} from "react-router";
import AddNewPlace from "./containers/AddNewPlace/AddNewPlace";
import {useSelector} from "react-redux";
import SinglePlacePage from "./containers/SinglePlacePage/SinglePlacePage";
import SinglePlaceGallery from "./containers/SinglePlacePage/SinglePlaceGallery/SinglePlaceGallery";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
};


function App() {
    const user = useSelector(state => state.user.user);
    return (
      <div className="App">
        <Switch>
          <ToolBar>
            <Container>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/places/:id' component={SinglePlacePage} />
                <Route exact path='/places/:id/gallery' component={SinglePlaceGallery} />
                <ProtectedRoute
                    exact
                    isAllowed={user && (user.role === "user" || user.role === "admin")}
                    path='/addNewPlace'
                    component={AddNewPlace} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
            </Container>
          </ToolBar>
        </Switch>
      </div>
  );
}

export default App;
