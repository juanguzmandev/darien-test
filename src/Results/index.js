import React, {Fragment} from 'react';

const Results = ({age, gender, nations}) => {
	return (
		<Fragment>
			<div className="flex flex-col items-center justify-center mx-2 my-8 p-4 rounded-lg shadow w-96 ">
				<h1 className="font-bold text-blue-500">Nationalities</h1>
				<ul className="m-4">
					{nations.country.map(nation => <li key={nation.country_id} className="text-blue-400 font-bold">{nation.country_id} - {nation.probability}</li>)}
				</ul>
			</div>
			<div className="flex flex-col items-center justify-center mx-2 my-8 p-4 rounded-lg shadow w-96">
				<h1 className="font-bold text-blue-500">Age</h1>
				<br/>
				<h1 className="font-bold mx-4 mb-4 text-blue-400">{age.age}</h1>
			</div>
			<div className="w-96 flex flex-col items-center justify-center mx-2 my-8 p-4 rounded-lg shadow w-96 ">
				<h1 className="font-bold text-blue-500">Gender</h1>
				<h1 className="font-bold m-4 text-blue-400">{ gender.gender != null && (gender.gender.charAt(0).toUpperCase() + gender.gender.slice(1))} - { (gender.gender != null) && gender.probability}</h1>
			</div>
		</Fragment>
	)
};

export default Results;