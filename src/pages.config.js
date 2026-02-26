import About from './pages/About';
import Courses from './pages/Courses';
import Home from './pages/Home';
import PublicationDetails from './pages/PublicationDetails';
import Publications from './pages/Publications';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Courses": Courses,
    "Home": Home,
    "PublicationDetails": PublicationDetails,
    "Publications": Publications,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};