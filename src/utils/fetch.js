import axios from 'axios';

const fetcher = {
	get: url => axios.get(url)
};

export default fetcher;
