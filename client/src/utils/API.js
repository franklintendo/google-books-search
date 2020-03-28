import axios from "axios";

export default {
    getSearch: function(query) {
        return axios.get(`/api/books/:${query}`);
    },
    saveBook: function(data) {
        return axios.post('/api/saved/', data);
    },
    getSaved: function() {
        return axios.get('/api/saved');
    },
    deleteSaved: function(id) {
        return axios.delete(`/api/saved/${id}`);
    }
}