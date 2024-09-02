import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/Main/Home';
import FeesCollectionScreen from '../Screens/Main/FeesCollection';
import ReportCardsScreen from '../Screens/Main/ReportCards';
export const Menus = [
    {
        id:1,
        title:'Home',
        defaultIcon:<Ionicons name="home-outline" size={20}/>,
        activeIcon:<Ionicons name="home" size={20}/>,
        shownIn:'T',
        component: (props) => (<HomeScreen {...props}/>),
        path:'Home'
    },
    {
        id:2,
        title:'Fees',
        defaultIcon:<Ionicons name="home-outline" size={20}/>,
        activeIcon:<Ionicons name="home" size={20}/>,
        shownIn:'T',
        component: (props) => (<FeesCollectionScreen {...props}/>),
        path:'Fees'
    },
    {
        id:3,
        title:'Reports',
        defaultIcon:<Ionicons name="home-outline" size={20}/>,
        activeIcon:<Ionicons name="home" size={20}/>,
        shownIn:'T',
        component: (props) => (<ReportCardsScreen {...props}/>),
        path:'Reports'
    }
]