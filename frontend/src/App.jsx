import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import TransactionPage from './pages/TransactionPage'
import NotFound from './pages/NotFound'
import { Route,Routes } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { GET_AUTH_USER } from './graphql/queries/user.query'
import {Toaster} from 'react-hot-toast'
import {Navigate} from 'react-router-dom'
function App() {
	// const authUser = true
	const { loading, error, data } = useQuery(GET_AUTH_USER);
	// console.log('data',data,loading,error);
	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data?.authUser?<HomePage />:<Navigate to="/login"/>} />
				<Route path='/login' element={!data?.authUser?<LoginPage />:<Navigate to="/"/>} />
				<Route path='/signup' element={!data?.authUser?<SignUpPage />:<Navigate to="/"/>} />
				<Route path='/transaction/:id' element={data?.authUser?<TransactionPage />:<Navigate to="/login"/>} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster/>
		</>
	);
}
export default App;