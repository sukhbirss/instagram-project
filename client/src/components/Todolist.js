import React,{useState} from 'react';
const Todolist = () => {
//............................................................................................
				//just time clock
	let time = new Date().toLocaleTimeString();
	const [ctime,setCtime] = useState(time);

	const updateTime = () =>{
		time = new Date().toLocaleTimeString();
		setCtime(time)
	};

	setInterval(updateTime,1000);
//....x..........x......x....................x.............x...........x.......x..............x........
	const[input,setInput] = useState("")
	const[item,setItem] = useState([])

	const add = (event) =>{
		setInput(event.target.value)
	}
	const addd = () =>{
	 setItem((pvs) =>{
	 		return [...pvs,input]
		})
	 	setInput("")
//........................................................................................
				//Just a greenish navbar that appears when we click the add button

		const hideAlert = () => {
		const el = document.querySelector('.msg');
		  if (el) el.parentElement.removeChild(el);
		};

		const showAlert = () => {
		  hideAlert();
		  const markup = `<div class="msg">${input} added</div>`;
		  document.querySelector(".card").insertAdjacentHTML('afterbegin', markup);
		  window.setTimeout(hideAlert, 2000);
		};

	showAlert()
//.......x.............x..............x........x................x...................x.........x....	
	}

	return (
		<>	
			<h3 className="time">{ctime}</h3>

			<h3 className="time">here we go</h3>

			<div className="card cl">
				
				<h2 className="text">to do</h2>
				<div className="todoform">
					<input type="text2" placeholder="add input" onChange={add} value={input} />
				
					<button className="btnn" onClick={addd}> + </button>
				</div>
				<ol>
					{item.map(el =>{return <li> {el} </li>})}
				</ol>
			</div>


		</>
		);
};

export default Todolist;