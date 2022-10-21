import Footer from './components/Footer';
import Header from './components/Header';
import Shop from './components/Shop';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import ShoppingCart from './components/ShoppingCart';
import CheckOut from './components/CheckOut';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";


function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout/>}>
//         <Route index path="/" element={<Shop/>}/>
//         <Route index path="/shop" element={<Shop/>}/>
//         <Route index path="/shopping-cart" element={<ShoppingCart/>}/>
//         <Route index path="/checkout" element={<CheckOut/>}/>
//       </Route>
//     </Routes>
//   );
// }

// export default App;
