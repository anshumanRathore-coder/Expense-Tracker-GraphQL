import { useEffect } from "react";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "./Card";
import {useQuery} from '@apollo/client'
const Cards = () => {
	const {loading,error,data}=useQuery(GET_ALL_TRANSACTIONS);
	console.log('error',error,data);
	return (
		data?.transactions && <div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{data?.transactions.map((item,index)=>(

						<Card key={index} {...item}/>
				))}
			</div>
		</div>
	);
};
export default Cards;