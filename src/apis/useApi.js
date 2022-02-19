import axios from 'axios'

export const fetchData = async (getdata, good, bad) => {
    try {
        const { data } = await axios.get(getdata);
        good(data)
    } catch (e) {
        bad(e)
    }
}

