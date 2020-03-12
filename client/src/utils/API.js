import axios from "axios";

export default {
    getSearch: function(query) {
        return axios.get(`/api/books/:${query}`);
    }
}