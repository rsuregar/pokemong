import axios from 'axios'

export const fetchData = async (getdata, good, bad) => {
    try {
        const { data } = await axios.get(getdata);
        good(data)
    } catch (e) {
        bad(e)
    }
}

export const imgUrl = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

